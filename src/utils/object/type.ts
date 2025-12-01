export interface CityOption {
  readonly value: string;
  readonly label: string;
}

export interface CityGroupedOption {
  readonly label: string;
  readonly options: readonly CityOption[];
}
