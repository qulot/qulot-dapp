export function startsWith(str: string, value: string) {
  return String.prototype.startsWith.call(str || '', value)
}
