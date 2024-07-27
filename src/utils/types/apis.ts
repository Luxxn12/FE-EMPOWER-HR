export type Response<T = any> = {
  code: number;
  status: string;
  message: string;
  data: T;
};
