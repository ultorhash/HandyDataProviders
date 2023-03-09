import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent
} from 'ag-grid-community';
import { GridsterConfig } from 'angular-gridster2';
import * as Highcharts from 'highcharts';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private chart: Highcharts.Chart = {} as Highcharts.Chart;
  private gridApi: GridApi = {} as GridApi;

  public rowData: IPriceTable[] = [];
  public columnDefs: ColDef<IPriceTable>[] = columnDefs;
  public dashboard: ExtendedGridsterItem[] = dashboard;
  public defaultColDef: ColDef = defaultColDef;
  public gridOptions: GridOptions = gridOptions;
  public gridsterOptions: GridsterConfig = gridsterOptions;
  public chartOptions: Highcharts.Options = {
    chart: {
      zooming: {
        type: 'xy',
      },
      backgroundColor: Colors.GRAY800
    },
    accessibility: {
      enabled: false
    },
    title: {
      text: undefined
    },
    xAxis: {
      type: 'datetime',
      minorGridLineWidth: 0
    },
    yAxis: {
      title: undefined,
      gridLineColor: Colors.TRANSPARENT
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Colors.BLUE800],
            [1, Colors.GRAY800]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    series: [
      {
        type: 'area'
      }
    ]
  }

  public cards: typeof Cards = Cards;
  public Highcharts: typeof Highcharts = Highcharts;

  constructor(private coingeckoService: CoingeckoService) {}

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
        for (let i = 0; i < res.length; i++) {
          this.chart.series[0].addPoint(res[i], false);
        }

        this.chart.redraw();
      })
    )
    .subscribe();
  }
}
