import { Tuple } from "ui-core";

/**
 * Sequentially specifies time and prices for cryptocurrency.
 * `0` - date.
 * `1` - Price open.
 * `2` - Price high.
 * `3` - Price low.
 * `4` - Price close.
 */
export type OHLCPricesDto = Tuple<number, 5>;
