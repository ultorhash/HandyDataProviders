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
import { columnDefs } from './dashboard.data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private gridApi: GridApi = {} as GridApi;

  public rowData: IPriceTable[] = [];
  public columnDefs: ColDef<IPriceTable>[] = columnDefs;
  public defaultColDef: ColDef = {
    sortable: true,
    flex: 100
  };
  public gridOptions: GridOptions = {
    rowHeight: 30
  };

  options: GridsterConfig = {} as GridsterConfig;
  dashboard: Array<GridsterItem> = {} as Array<GridsterItem>;
  style: object = {};

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

    this.dashboard = [
      { id: 1, cols: 10, rows: 1, y: 0, x: 0, dragEnabled: false, resizeEnabled: false },
      { id: 2, cols: 7, rows: 10, y: 0, x: 0 },
      { id: "price-table", cols: 3, rows: 10, y: 0, x: 0 }
    ];
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
