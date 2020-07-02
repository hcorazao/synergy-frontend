import { Page } from './page.model';

/**
 * An array of data with an associated page object used for paging
 */
export class PagedData<T> {
  data = new Array<T>();
  page = new Page();
}

export interface PaginationOptions {
  pageIndex: number;
  length: number;
  limit: number;
  pageSizeOptions: number[];
}
