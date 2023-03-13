import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { CoinDto } from './dtos';
import { CoingeckoService } from './services';
import { UpdateCoins } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private coingeckoService: CoingeckoService
  ) {}

  ngOnInit(): void {
    this.fetchCoins$().subscribe();
  }

  fetchCoins$(): Observable<CoinDto[]> {
    return this.coingeckoService.getCoinsData$().pipe(
      tap((res: CoinDto[]) => {
        this.store.dispatch(new UpdateCoins(res));
      })
    );
  }
}
