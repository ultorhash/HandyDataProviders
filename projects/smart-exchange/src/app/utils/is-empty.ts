/**
 * Defines if object is empty or not.
 * @param obj Object to check.
 * @returns If object is empty then `true`, otherwise `false`.
 */
export const isEmpty = (obj: Object): boolean => {
  return Object.keys(obj).length === 0;
}
