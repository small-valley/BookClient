export class BookItem {
    autonumber = 0;
    dateTime: Date | string | null = null;
    title = '';
    authorCd = 0;
    author = '';
    publisherCd = 0;
    publisher = '';
    classCd = 0;
    class = '';
    publishYear = '';
    pageCount: number = 0;
    recommendFlg: number = 0;
  }

export class BookItemSearchKey {
  from: string | null = '';
  to: string | null = '';
  title: string = '';
  author: string = '';
  publisher: string = '';
  class: string = '';
  publishYear: string = '';
  recommendFlg: number = 0;
}