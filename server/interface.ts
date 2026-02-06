export interface IResponse<T = any> {
  success: boolean;
  data?: T;
  error: string;
}

export interface MetaPaginate {
  total_page: number;
  current_page: number;
  limit: number;
  pages?: number;  
}

export interface IResponsePaginate<T = any> extends IResponse<T> {
  meta?: MetaPaginate;
}