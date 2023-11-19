export function fromStructToObject<T extends object>(struct: [] & T): T {
  struct = { ...struct }
  const keysNumber = Object.keys(struct).length
  for (let i = 0; i < keysNumber / 2; i++) {
    delete struct[i]
  }

  return struct
}
