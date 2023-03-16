import { CoinDto } from "../dtos";

/**
 * Contains cryptocurrency statistics from `CoinDto`.
 */
export type CoinStats = Pick<CoinDto,
  'marketCapRank' |
  'circulatingSupply' |
  'marketCap' |
  'totalSupply' |
  'totalVolume'
>;
