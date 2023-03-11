/**
 * Provides additional data for object. By default
 * all properties are set to `string` type.
 */
export type BasicEntity<T = string, K = string> = {
  id: T;
  name: K;
}
