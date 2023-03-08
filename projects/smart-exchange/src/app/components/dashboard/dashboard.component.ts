import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent
} from 'ag-grid-community';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Observable, tap } from 'rxjs';
import { CoingeckoDto } from '../../dtos';
import { IPriceTable } from '../../interfaces';
import { CoingeckoService } from '../../services';
import {
  columnDefs,
  dashboard,
  defaultColDef,
  gridOptions
} from './dashboard.data';
import { Cards } from './dashboard.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private gridApi: GridApi = {} as GridApi;

  public rowData: IPriceTable[] = [];
  public columnDefs: ColDef<IPriceTable>[] = columnDefs;
  public dashboard: GridsterItem[] = dashboard;
  public defaultColDef: ColDef = defaultColDef;
  public gridOptions: GridOptions = gridOptions;
  public options: GridsterConfig = {} as GridsterConfig;

  public cards: typeof Cards = Cards;

  constructor(
    private coingeckoService: CoingeckoService
  ) {}

  ngOnInit(): void {
    this.options = {
      resizable: {
        enabled: true
      },
      draggable: {
        enabled: true
      },
      gridType: "fit",
      displayGrid: "always"
    };
  }

  onPriceTableReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.fetchData$().subscribe();
  }

  fetchData$(): Observable<CoingeckoDto[]> {
    return this.coingeckoService.getCoinData().pipe(
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
}
