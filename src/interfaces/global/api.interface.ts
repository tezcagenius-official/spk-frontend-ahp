export interface IBaseAPIResponse<T = undefined> {
  status: number;
  message: string | null;
  data?: T extends undefined ? never : T;
}
