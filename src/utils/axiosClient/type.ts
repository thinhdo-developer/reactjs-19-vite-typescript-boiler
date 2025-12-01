export type IAxiosPromise<T> = {
  data: T;
  url?: string;
  method?: string;
  status: number;
};
