type ValueOf<T> = T[keyof T];
type NonEmptyArray<T> = [T, ...T[]]
type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never;

/**
 * Converts union type to array.
 * @returns Array of strings.
 */
export const unionToArray = <T>() => {
  return <U extends NonEmptyArray<T>>(...elements: MustInclude<T, U>) => elements as string[];
}
