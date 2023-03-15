import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  RowClickedEvent
} from 'ag-grid-community';
import { Select } from '@ngxs/store';
import { GridsterConfig } from 'angular-gridster2';
import { Observable, tap, first, filter } from 'rxjs';
import { CoinDto, OHLCPricesDto } from '../../dtos';
import { IPriceTable } from '../../interfaces';
import { CoingeckoService } from '../../services';
import {
  columnDefs,
  dashboard,
  defaultColDef,
  gridOptions,
  gridsterOptions
} from './dashboard.data';
import { Cards } from './dashboard.enum';
import { ExtendedGridsterItem } from './dashboard.interface';
import { BasicChartComponent } from '../shared';
import { CryptocurrencyLabel } from '../../types';
import { getChartLabel } from '../../utils';
import { CoinsState, CoinsStateModel } from '../../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BasicChartComponent {
  @Select(CoinsState) coins$!: Observable<CoinsStateModel>;

  private chart: Highcharts.Chart = {} as Highcharts.Chart;
  private gridApi: GridApi = {} as GridApi;

  public rowData: IPriceTable[] = [];
  public columnDefs: ColDef<IPriceTable>[] = columnDefs;
  public dashboard: ExtendedGridsterItem[] = dashboard;
  public defaultColDef: ColDef = defaultColDef;
  public gridOptions: GridOptions = gridOptions;
  public gridsterOptions: GridsterConfig = gridsterOptions;

  public cards: typeof Cards = Cards;

  constructor(private coingeckoService: CoingeckoService) {
    super();
  }

  updateTable$(): Observable<CoinsStateModel> {
    return this.coins$.pipe(
      tap((state: CoinsStateModel) => {
        const priceData = state.coins.reduce((acc: IPriceTable[], curr: CoinDto) => {
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

      this.updateChart({
        id: id,
        name: name,
        image: image
      });
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
      filter((res: CoinsStateModel) => res.coins.length > 0),
      first(),
      tap((res: CoinsStateModel) => {
        this.updateChart({
          id: res.coins[0].id,
          name: res.coins[0].name,
          image: res.coins[0].image
        });
      })
    )
    .subscribe();
  }

  updateChart(label: CryptocurrencyLabel): void {
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
    .subscribe();
  }
}
