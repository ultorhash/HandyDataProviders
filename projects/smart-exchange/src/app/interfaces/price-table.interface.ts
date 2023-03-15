import { CoinLabel } from "../types";

export interface IPriceTable extends CoinLabel {
  symbol: string;
  change: number;
  percentageChange: number;
  price: number;
}
