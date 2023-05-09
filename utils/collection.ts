type KeySelector<T> = (item: T) => string
type ValueSelector<T, V> = (item: T) => V

/**
 * Convert array to object by key
 * @param array Array input
 * @param keySelector Key selector
 * @returns
 */
export function keyBy<T>(
  array: Iterable<T>,
  keySelector: KeySelector<T>
): Record<string, T> {
  return Array.from(array).reduce(
    (acc, item) => Object.assign(acc, { [keySelector(item)]: item }),
    {}
  )
}

/**
 * Convert array to object by key
 * @param array Array input
 * @param keySelector Key selector
 * @returns
 */
export function keyValueBy<T, V>(
  array: Iterable<T>,
  keySelector: KeySelector<T>,
  valueSelector: ValueSelector<T, V>
): Record<string, V> {
  return Array.from(array).reduce(
    (acc, item) =>
      Object.assign(acc, { [keySelector(item)]: valueSelector(item) }),
    {}
  )
}

/**
 * Group array by key
 * @param array
 * @param keySelector
 * @returns
 */
export function groupBy<T>(array: Iterable<T>, keySelector: KeySelector<T>) {
  return Array.from(array).reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = keySelector(curr)
    const group = prev[groupKey] || []
    group.push(curr)
    return { ...prev, [groupKey]: group }
  }, {})
}
