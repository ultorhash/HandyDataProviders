import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable, tap } from 'rxjs';
import { ISnackbarData, SnackbarService, SnackbarTypes } from 'ui-core';
import { CoingeckoDto } from '../../dtos';
import { CoingeckoService } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chart = new Chart({
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        type: 'column',
        data: [1, 2, 3, 5, 7, 8, 5, 3, 6, 10, 5, 4, 3, 10, 12, 13, 2, 4, 5, 8, 7]
      }
    ]
  });

  constructor(
    private coingeckoService: CoingeckoService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.fetchData$().subscribe();

    const config: ISnackbarData = {
      type: SnackbarTypes.Success,
      message: "Data loaded successfully",
      duration: 3000
    };
    this.snackbarService.open(config);
  }

  fetchData$(): Observable<CoingeckoDto[]> {
    return this.coingeckoService.getCoinData().pipe(
      tap((res) => console.log(res))
    );
  }
}
