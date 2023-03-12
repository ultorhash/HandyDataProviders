import { CoinDto } from "../../dtos";

export class UpdateCoins {
  static readonly type = '[COINS] Update';

  constructor(public payload: CoinDto[]) {}
}
