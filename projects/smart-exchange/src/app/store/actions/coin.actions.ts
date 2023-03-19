import { CoinDto } from "../../dtos";

export class Update {
  static readonly type = '[COINS] Update';
  constructor(public payload: CoinDto[]) {}
}

export class ChangeSelected {
  static readonly type = '[COINS] Change Selected';
  constructor(public payload: string) {}
}
