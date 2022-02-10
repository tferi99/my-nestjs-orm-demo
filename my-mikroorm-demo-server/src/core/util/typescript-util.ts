/**
 * Because WebStorm doesn't support ??= (nullish coalescing)...
 *
 * @param origVal
 * @param newVal
 */
export function assignIfNullish<T extends any>(origVal: T, newVal: any): T {
  if (origVal == undefined || origVal == null) {
    return newVal;
  }
  return origVal;
}
