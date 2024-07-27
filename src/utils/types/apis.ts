export interface Meta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// export interface IPagination<T = any> {
//   currentPage: number;
//   data: T;
//   totalItems: number;
//   totalPages: number;
//   itemsPerPage: number;
// }

export interface Response<T = any> {
  code: number;
  status: string;
  message: string;
  data: T;
  meta: Meta[];
}
