export interface IBaseAPIResponse<T = undefined> {
  status: number;
  message: string | null;
  data?: T extends undefined ? never : T;
  meta?: IMetaAPIResponse;
}

export interface IMetaAPIResponse {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: string;
  next: string;
}

export interface IGlobalPaginationParams {
  page: string;
  perPage: string;
}
