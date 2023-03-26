import { Component } from '@angular/core';
import { Observable, tap, filter, switchMap, map } from 'rxjs';
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
import { getChartLabel, isEmpty } from '../../utils';
import { IPriceTable } from '../../interfaces';
import { CoingeckoService } from '../../services';
import { BasicChartComponent } from '../shared';
import { SetSelectedCoin, CoinsState } from '../../store';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BasicChartComponent {
  @Select(CoinsState.getCoins) coins$!: Observable<CoinDto[]>;
  @Select(CoinsState.getSelected) selected$!: Observable<CoinDto>;

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

  updateData$(): Observable<OHLCPricesDto[]> {
    return this.selected$.pipe(
      filter((coin: CoinDto) => !isEmpty(coin)),
      tap((coin: CoinDto) => {
        this.chart.series[0].name = coin.name;
        this.chart.update({
          title: {
            text: getChartLabel({
              id: coin.id,
              name: coin.name,
              image: coin.image
            })
          }
        });

        coinStatsNames.forEach((name: string) => {
          this.coinStats.set(name, coin[name as keyof CoinDto] as number);
        });
      }),
      map((coin: CoinDto) => coin.id),
      switchMap((id: string) => {
        return this.coingeckoService.getCoinOhlcPrices$(id, 30)
      }),
      tap((res: OHLCPricesDto[]) => {
        this.chart.series[0].setData(res, true);
      })
    )
  }

  onResize(item: ExtendedGridsterItem): void {
    if (item.id === Cards.Chart) {
      this.chart.reflow();
    }
  }

  onTableReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.updateTable$().subscribe();
    this.updateData$().subscribe();
  }

  onRowClick(row: RowClickedEvent<IPriceTable>): void {
    if (row.data) {
      this.store.dispatch(new SetSelectedCoin(row.data.id));
    }
  }

  onPin(item: ExtendedGridsterItem): void {
    item.dragEnabled = !item.dragEnabled;

    if (this.gridsterOptions.api && this.gridsterOptions.api.optionsChanged) {
      this.gridsterOptions.api.optionsChanged();
    }
  }

  onSearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.gridApi.setQuickFilter(searchValue);
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chart): void => {
    this.chart = chart;
  }
}
