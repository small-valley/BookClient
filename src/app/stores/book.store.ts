export interface IBookItem {
  id: string;
  date: string | null;
  title: string;
  authorId: string;
  author: string;
  publisherId: string;
  publisher: string;
  classId: string;
  class: string;
  publishYear: string;
  pageCount: number;
  isRecommend: boolean;
}

export interface IBookItemPostModel {
  date: string | null;
  title: string;
  author: string;
  publisher: string;
  class: string;
  publishYear: string;
  pageCount: number;
  isRecommend: boolean;
}

export interface IBookItemSearchKey {
  from: string | null;
  to: string | null;
  title: string;
  author: string;
  publisher: string;
  class: string;
  publishYear: string;
  isRecommend?: boolean;
  [key: string]: string | boolean | null | undefined;
}

export class BookItemSearchKey implements IBookItemSearchKey {
  from: string | null = "";
  to: string | null = "";
  title: string = "";
  author: string = "";
  publisher: string = "";
  class: string = "";
  publishYear: string = "";
  [key: string]: string | boolean | null | undefined;
}
