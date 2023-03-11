import { BasicEntity } from "../types";

export interface IPriceTable extends BasicEntity {
  image: string;
  symbol: string;
  change: number;
  percentageChange: number;
  price: number;
}
