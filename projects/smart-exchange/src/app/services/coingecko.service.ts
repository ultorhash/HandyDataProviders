import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toCamel } from 'snake-camel';
import { CoingeckoDto, HistoricDataDto } from '../dtos';
import { Intervals, Recaps } from '../enums';
import { TimePrice } from '../types';
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
    quantity: number = 50
  ): Observable<CoingeckoDto[]> {
    return timer(0, 10000).pipe(
      mergeMap(() => {
        return this.http.get<CoingeckoDto[]>(
          `${this.API_URL}/markets?vs_currency=${recap}` +
          `&order=market_cap_desc&per_page=${quantity}`
        );
      }),
      map((res: CoingeckoDto[]) => res.map(toCamel) as CoingeckoDto[])
    )
  }

  /**
   * Gets past prices for cryptocurrency.
   * @param name Name of cryptocurrency.
   * @param days Number of passed days.
   * @param interval Data interval for prices. Default to `DAILY`.
   * @param recap Price comparison to fiat currency. Default to `USD`.
   * @returns Array of tuples that contains day and price for cryptocurrency.
   */
  getCoinHistoricPrices$(
    name: string,
    days: number,
    interval: Intervals = Intervals.DAILY,
    recap: Recaps = Recaps.USD
  ): Observable<TimePrice[]> {
    return this.http.get<HistoricDataDto>(
      `${this.API_URL}/${name}/market_chart?vs_currency=` +
      `${recap}&days=${days}&interval=${interval}`
    ).pipe(
      map((res: HistoricDataDto) => (toCamel(res) as HistoricDataDto).prices)
    )
  }
}
