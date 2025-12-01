export function duplicateArray<T>(arr: T[], times: number): T[] {
  return Array.from({ length: times }, () => arr).flat();
}
