import { CoinDto } from "../dtos";

/**
 * Extracts cryptocurrency description from `CoinDto`.
 */
export type CryptocurrencyLabel = Pick<CoinDto,
  'id' |
  'name' |
  'image'
>;
