import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent
} from 'ag-grid-community';
import { GridsterConfig } from 'angular-gridster2';
import { Observable, tap } from 'rxjs';
import { CoingeckoDto } from '../../dtos';
import { Intervals } from '../../enums';
import { IPriceTable } from '../../interfaces';
import { CoingeckoService } from '../../services';
import {
  columnDefs,
  dashboard,
  defaultColDef,
  gridOptions,
  gridsterOptions
} from './dashboard.data';
import { Cards, Colors } from './dashboard.enum';
import { ExtendedGridsterItem } from './dashboard.interface';
import { BasicChartComponent } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BasicChartComponent {
  private chart: Highcharts.Chart = {} as Highcharts.Chart;
  private gridApi: GridApi = {} as GridApi;

  public rowData: IPriceTable[] = [];
  public columnDefs: ColDef<IPriceTable>[] = columnDefs;
  public dashboard: ExtendedGridsterItem[] = dashboard;
  public defaultColDef: ColDef = defaultColDef;
  public gridOptions: GridOptions = gridOptions;
  public gridsterOptions: GridsterConfig = gridsterOptions;
  public options: Highcharts.Options = {
    rangeSelector: {
      selected: 1
    },
    navigator: {
      series: {
        color: 'red'
      }
    },
    series: [
      {
        type: "hollowcandlestick",
        data: [
          [1521466200000, 177.32, 177.47, 173.66, 175.3],
          [1521552600000, 175.24, 176.8, 174.94, 175.24],
          [1521639000000, 175.04, 175.09, 171.26, 171.27],
          [1521725400000, 170, 172.68, 168.6, 168.85]
        ]
      },
    ]
  }

  public cards: typeof Cards = Cards;

  constructor(private coingeckoService: CoingeckoService) {
    super();
    this.chartOptions = this.options;
  }

  fetchData$(): Observable<CoingeckoDto[]> {
    return this.coingeckoService.getCoinsData$().pipe(
      tap((res: CoingeckoDto[]) => {
        const priceData = res.reduce((acc: IPriceTable[], curr: CoingeckoDto) => {
          return [
            ...acc, {
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
    this.fetchData$().subscribe();
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chart): void => {
    this.chart = chart;

    this.coingeckoService.getCoinHistoricPrices$('bitcoin', 30, Intervals.HOURLY).pipe(
      tap((res) => {
        // for (let i = 0; i < res.length; i++) {
        //   this.chart.series[0].addPoint(res[i], false);
        // }

        // this.chart.redraw();
      })
    )
    .subscribe();
  }
}
