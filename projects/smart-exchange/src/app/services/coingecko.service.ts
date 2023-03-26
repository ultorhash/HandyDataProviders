import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toCamel } from 'snake-camel';
import { CoinDto, OHLCPricesDto } from '../dtos';
import { Recaps } from '../enums';
import {
  map,
  mergeMap,
  Observable,
  timer
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private readonly API_URL: string = "https://api.coingecko.com/api/v3/coins";

  constructor(private http: HttpClient) {}

  /**
   * Gets coin data specified in `CoingeckoDto`.
   * @param recap Price comparison to fiat currency. Default to `USD`.
   * @param quantity Number of coins. Default to first `50`.
   * @returns Collection of coins data
   */
  getCoinsData$(
    recap: Recaps = Recaps.USD,
    quantity: number = 250
  ): Observable<CoinDto[]> {
    return timer(0, 30000).pipe(
      mergeMap(() => {
        return this.http.get<CoinDto[]>(
          `${this.API_URL}/markets?vs_currency=${recap}` +
          `&order=market_cap_desc&per_page=${quantity}`
        );
      }),
      map((res: CoinDto[]) => res.map(toCamel) as CoinDto[])
    )
  }

  /**
   * Gets past `OHLC` prices for cryptocurrency.
   * `O` - Open.
   * `H` - High.
   * `L` - Low.
   * `C` - Close.
   * @param id Id of cryptocurrency in `lowercase` format.
   * @param days Number of passed days.
   * @param recap Price comparison to fiat currency. Default to `USD`.
   * @returns Array of tuples that contains day and `OHCL` prices for cryptocurrency.
   */
  getCoinOhlcPrices$(
    id: string,
    days: number,
    recap: Recaps = Recaps.USD
  ): Observable<OHLCPricesDto[]> {
    return this.http.get<OHLCPricesDto[]>(
      `${this.API_URL}/${id}/ohlc?vs_currency=${recap}&days=${days}`
    );
  }
}
