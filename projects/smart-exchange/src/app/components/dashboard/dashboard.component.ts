import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import {
  ISnackbarData,
  SnackbarService,
  SnackbarTypes
} from 'ui-core';
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
    flex: 200
  };

  constructor(
    private coingeckoService: CoingeckoService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    const config: ISnackbarData = {
      type: SnackbarTypes.Success,
      message: "Data loaded successfully",
      duration: 3000
    };
    this.snackbarService.open(config);
  }

  onPriceTableReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.fetchData$().subscribe();
  }

  fetchData$(): Observable<CoingeckoDto[]> {
    return this.coingeckoService.getCoinData().pipe(
      tap((res: CoingeckoDto[]) => {
        console.log(res);
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
