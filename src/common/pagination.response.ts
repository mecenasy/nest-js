export class Pagination {
  total?: number;
  limit?: number;
  offset?: number;
}

export class PaginationResponse<T> {
  data: T[];
  pagination: Pagination;
}
