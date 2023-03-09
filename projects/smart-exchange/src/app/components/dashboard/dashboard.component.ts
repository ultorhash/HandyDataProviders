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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private chartRef: Highcharts.Chart = {} as Highcharts.Chart;
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
        type: 'x',
      }
    },
    accessibility: {
      enabled: false
    },
    title: {
      text: 'USD to EUR exchange rate over time',
      align: 'left'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
        align: 'left'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Exchange rate'
        }
    },
    legend: {
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
                    [0, "#000000"],
                    [1, "#FF0000"]
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
        type: 'area',
        data: [
          [
            1167609600000,
            0.7537
          ],
          [
            1167696000000,
            0.7537
          ],
          [
            1167782400000,
            0.7559
          ],
          [
            1167868800000,
            0.7631
          ],
          [
            1167955200000,
            0.7644
          ],
          [
            1168214400000,
            0.769
          ],
          [
            1168300800000,
            0.7683
          ],
          [
            1168387200000,
            0.77
          ],
          [
            1168473600000,
            0.7703
          ],
          [
            1168560000000,
            0.7757
          ],
          [
            1168819200000,
            0.7728
          ]
        ]
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
      this.chartRef.reflow();
    }
  }

  onPriceTableReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.fetchData$().subscribe();
    this.coingeckoService.getCoinHistoricPrices$('bitcoin', 30).pipe(
      tap((res) => console.log(res))
    )
    .subscribe();
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chart): void => {
    this.chartRef = chart;
  }
}
