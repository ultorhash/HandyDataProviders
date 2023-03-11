import { CryptocurrencyLabel } from "../types";

export interface IPriceTable extends CryptocurrencyLabel {
  symbol: string;
  change: number;
  percentageChange: number;
  price: number;
}
