import { CoinDto } from "../../dtos";

export class UpdateCoins {
  static readonly type = '[COINS] Update';
  constructor(public payload: CoinDto[]) {}
}

export class ChangeSelectedCoin {
  static readonly type = '[COINS] Change Selected';
  constructor(public payload: string) {}
}
