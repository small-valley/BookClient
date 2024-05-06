export interface IBookItem{
  autonumber: number, 
  dateTime: Date | string | null, 
  title: string,
  authorCd: number,
  author: string,
  publisherCd: number,
  publisher: string,
  classCd: number,
  class: string,
  publishYear: string,
  pageCount: number,
  recommendFlg: number | string
}

export class BookItem implements IBookItem {
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
    pageCount = 0;
    recommendFlg: number | string = 0;
}

export class BookItemCsv implements IBookItem {

  constructor(autonumber: number, 
    dateTime: Date | string | null, 
    title: string,
    authorCd: number,
    author: string,
    publisherCd: number,
    publisher: string,
    classCd: number,
    className: string,
    publishYear: string,
    pageCount: number,
    recommendFlg: number | string
    ){
    this.autonumber = autonumber;
    this.dateTime = dateTime;
    this.title = title;
    this.authorCd = authorCd;
    this.author = author;
    this.publisherCd = publisherCd;
    this.publisher = publisher;
    this.classCd = classCd;
    this.class = className;
    this.publishYear = publishYear;
    this.pageCount = pageCount;
    this.recommendFlg = recommendFlg;
  }

    autonumber: number;
    dateTime: Date | string | null;
    title: string;
    authorCd: number;
    author: string;
    publisherCd: number;
    publisher: string;
    classCd: number;
    class: string;
    publishYear: string;
    pageCount: number;
    recommendFlg: number | string;
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