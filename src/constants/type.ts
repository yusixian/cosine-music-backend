export interface PaginatedData<T> {
  list: Array<T>; // 当前记录
  total: number; // 记录总数
  totalPages: number; // 总页数
  pageNum: number; // 当前页码
  pageSize: number; // 每页记录数
}
export type Order = 'asc' | 'desc';
