export function extractEnumFromNumber<
  T extends Record<string, number | string>
>(enumObj: T, value: number): T[keyof T] | undefined {
  const objArr = Object.entries(enumObj);
  for (let index = 0; index < objArr.length; index++) {
    const [key, val] = objArr[index];
    if (
      val === value ||
      val.toString() === value.toString() ||
      value === index
    ) {
      return key as unknown as T[keyof T];
    }
  }
  return undefined;
}
