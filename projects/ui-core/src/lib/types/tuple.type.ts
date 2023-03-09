type _Tuple<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _Tuple<T, N, [T, ...R]>;

/**
 * Generates tuple up to 50 type depth.
 */
export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _Tuple<T, N, []>
  : never;
