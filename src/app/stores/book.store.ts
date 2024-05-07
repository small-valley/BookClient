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

export class BookItemSearchKey {
  from: string | null = "";
  to: string | null = "";
  title: string = "";
  author: string = "";
  publisher: string = "";
  class: string = "";
  publishYear: string = "";
  isRecommend: boolean = true;
}
