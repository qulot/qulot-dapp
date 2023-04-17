export function startsWith(str: string, value: string) {
  return String.prototype.startsWith.call(str || '', value)
}

export function isString(str: any) {
  return str != null && typeof str === 'string'
}

export function isEmpty(str?: string) {
  return typeof str === 'string' && str.trim().length === 0
}
