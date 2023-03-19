import { CoinDto } from "../../dtos";

export class UpdateCoins {
  static readonly type = '[COINS] Update';
  constructor(public payload: CoinDto[]) {}
}

export class SetSelectedCoin {
  static readonly type = '[COINS] Set Selected';
  constructor(public payload: string) {}
}
