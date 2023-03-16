/**
 * Ensures that the searched value is definitely present in the set.
 * @param element Element to find.
 * @returns Searched element otherwise throws an error.
 */
export const ensure = <T>(element: T | undefined | null): T => {
  if (element === undefined || element === null) {
    throw new TypeError('Ensured element does not exists.');
  }

  return element;
}
