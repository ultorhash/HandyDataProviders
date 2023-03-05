import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CoingeckoDto } from '../../dtos';
import { CoingeckoService } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private coingeckoService: CoingeckoService) {}

  ngOnInit(): void {
    this.fetchData$().subscribe();
  }

  fetchData$(): Observable<CoingeckoDto[]> {
    return this.coingeckoService.getCoinData().pipe(
      tap((res) => console.log(res))
    );
  }
}
