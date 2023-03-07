import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { toCamel } from 'snake-camel';
import { CoingeckoDto } from '../dtos';
import { Recaps } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private readonly API_URL: string = "https://api.coingecko.com/api/v3/coins/markets";

  constructor(private http: HttpClient) {}

  /**
   * Gets coin data specified in `CoingeckoDto`.
   * @param recap Price comparison to fiat currency. Default to `USD`.
   * @param quantity Number of coins. Default to first `50`.
   * @returns Collection of coins data
   */
  getCoinData(
    recap: Recaps = Recaps.USD,
    quantity: number = 50
  ): Observable<CoingeckoDto[]> {
    return this.http
      .get<CoingeckoDto[]>(`${this.API_URL}?vs_currency=${recap}&order=market_cap_desc&per_page=${quantity}`)
      .pipe(
        map((res: CoingeckoDto[]) => res.map(toCamel) as CoingeckoDto[])
      );
  }
}
