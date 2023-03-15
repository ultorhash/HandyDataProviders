import { CoinDto } from "../dtos";

/**
 * Extracts cryptocurrency statistics from `CoinDto`.
 */
export type CoinKeyStats = Pick<CoinDto,
  'marketCapRank' |
  'circulatingSupply' |
  'marketCap' |
  'totalSupply' |
  'totalVolume'
>;
