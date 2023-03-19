import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { CoinDto } from './dtos';
import { CoingeckoService } from './services';
import { Update } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private translateService: TranslateService,
    private coingeckoService: CoingeckoService
  ) {}

  ngOnInit(): void {
    this.fetchCoins$().subscribe();
  }

  fetchCoins$(): Observable<CoinDto[]> {
    return this.coingeckoService.getCoinsData$().pipe(
      tap((res: CoinDto[]) => {
        this.store.dispatch(new Update(res));
      })
    );
  }
}
