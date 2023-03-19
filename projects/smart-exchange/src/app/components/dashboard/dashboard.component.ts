import { Component } from '@angular/core';
import { Observable, tap, first, filter } from 'rxjs';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  RowClickedEvent
} from 'ag-grid-community';
import { Select, Store } from '@ngxs/store';
import { GridsterConfig } from 'angular-gridster2';
import { CoinDto, OHLCPricesDto } from '../../dtos';
import {
  coinStatsNames,
  columnDefs,
  dashboard,
  defaultColDef,
  gridOptions,
  gridsterOptions
} from './dashboard.data';
import { Cards } from './dashboard.enum';
import { ExtendedGridsterItem } from './dashboard.interface';
import { ensure, getChartLabel } from '../../utils';
import { IPriceTable } from '../../interfaces';
import { CoingeckoService } from '../../services';
import { BasicChartComponent } from '../shared';
import { CoinLabel } from '../../types';
import { ChangeSelectedCoin, CoinsState } from '../../store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BasicChartComponent {
  @Select(CoinsState.getCoins) coins$!: Observable<CoinDto[]>;
  @Select(CoinsState.getSelected) selected$!: Observable<CoinLabel>;

  private chart: Highcharts.Chart = {} as Highcharts.Chart;
  private gridApi: GridApi = {} as GridApi;

  public rowData: IPriceTable[] = [];
  public columnDefs: ColDef<IPriceTable>[] = columnDefs;
  public dashboard: ExtendedGridsterItem[] = dashboard;
  public coinStatsNames: string[] = coinStatsNames;
  public defaultColDef: ColDef = defaultColDef;
  public gridOptions: GridOptions = gridOptions;
  public gridsterOptions: GridsterConfig = gridsterOptions;
  public coinStats: Map<string, number> = new Map<string, number>();

  public cards: typeof Cards = Cards;

  constructor(
    private store: Store,
    private translateService: TranslateService,
    private coingeckoService: CoingeckoService
  ) {
    super();
  }

  updateTable$(): Observable<CoinDto[]> {
    return this.coins$.pipe(
      tap((coins: CoinDto[]) => {
        const priceData = coins.reduce((acc: IPriceTable[], curr: CoinDto) => {
          return [
            ...acc, {
              id: curr.id,
              name: curr.name,
              image: curr.image,
              symbol: curr.symbol.toUpperCase(),
              change: curr.priceChange24h,
              percentageChange: curr.priceChangePercentage24h,
              price: curr.currentPrice
            }
          ];
        }, [] as IPriceTable[]);

        this.gridApi.setRowData(priceData);
      })
    );
  }

  onResize(item: ExtendedGridsterItem): void {
    if (item.id === Cards.Chart) {
      this.chart.reflow();
    }
  }

  onPriceTableReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.updateTable$().subscribe();
  }

  onRowClick(row: RowClickedEvent<IPriceTable>): void {
    if (row.data) {
      const { id, name, image } = row.data;

      this.updateCoinData({
        id: id,
        name: name,
        image: image
      });

      this.store.dispatch(new ChangeSelectedCoin(id));
    }
  }

  onPin(item: ExtendedGridsterItem): void {
    item.dragEnabled = !item.dragEnabled;

    if (this.gridsterOptions.api && this.gridsterOptions.api.optionsChanged) {
      this.gridsterOptions.api.optionsChanged();
    }
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chart): void => {
    this.chart = chart;

    this.coins$.pipe(
      filter((coins: CoinDto[]) => coins.length > 0),
      first(),
      tap((coins: CoinDto[]) => {
        const label: CoinLabel = {
          id: coins[0].id,
          name: coins[0].name,
          image: coins[0].image,
        };

        this.updateCoinData(label);
      })
    )
    .subscribe();
  }

  updateCoinData(label: CoinLabel): void {
    const { id, name, image } = label;

    this.coingeckoService.getCoinOhlcPrices$(id, 30).pipe(
      first(),
      tap((res: OHLCPricesDto[]) => {
        this.chart.series[0].setData(res, true);
        this.chart.series[0].name = name;
        this.chart.update({
          title: {
            text: getChartLabel({
              id: id,
              name: name,
              image: image
            })
          }
        })
      })
    )
    //.subscribe();

    this.coins$.pipe(
      tap((coins: CoinDto[]) => {
        const selected = ensure<CoinDto>(coins.find((c: CoinDto) => c.id === id));
        coinStatsNames.forEach((name: string) => {
          this.coinStats.set(name, selected[name as keyof CoinDto] as number);
        });
      })
    ).subscribe();
  }
}
