import { CoinDto } from "../dtos";

/**
 * Extracts cryptocurrency description from `CoinDto`.
 */
export type CoinLabel = Pick<CoinDto,
  'id' |
  'name' |
  'image'
>;
