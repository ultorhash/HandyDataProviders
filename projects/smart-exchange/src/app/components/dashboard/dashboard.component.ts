import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  RowClickedEvent
} from 'ag-grid-community';
import { GridsterConfig } from 'angular-gridster2';
import { Observable, tap, first } from 'rxjs';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BasicChartComponent {
  private readonly DEFAULT_CRYPTOCURRENCY: CryptocurrencyLabel = {
    id: 'bitcoin',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
  };

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

  fetchTableData$(): Observable<CoinDto[]> {
    return this.coingeckoService.getCoinsData$().pipe(
      tap((res: CoinDto[]) => {
        const priceData = res.reduce((acc: IPriceTable[], curr: CoinDto) => {
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
    this.fetchTableData$().subscribe();
  }

  onRowClick(row: RowClickedEvent<IPriceTable>): void {
    if (row.data) {
      const { id, name, image } = row.data;

      this.updateChartData({
        id: id,
        name: name,
        image: image
      });
    }
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chart): void => {
    const { id, name, image } = this.DEFAULT_CRYPTOCURRENCY;
    this.chart = chart;

    this.updateChartData({
      id: id,
      name: name,
      image: image
    });
  }

  updateChartData(label: CryptocurrencyLabel): void {
    const { id, name, image } = label;

    this.coingeckoService.getCoinOhlcPrices$(id, 30).pipe(
      first(),
      tap((res: OHLCPricesDto[]) => {
        this.chart.series[0].setData(res, true);
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
