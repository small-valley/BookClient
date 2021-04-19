// export class BookItem {
//     autonumber = 0;
//     dateTime: Date | string | null = null;
//     title = '';
//     author = '';
//     publisher = '';
//     class = '';
//     publishYear = '';
//     pageCount: number = 0;
//     recommendFlg: number = 0;
//   }

  export class Book {
    autonumber = 0;
    date: Date | string | null = null;
    title = '';
    authorCd = 0;
    author = '';
    publisherCd = 0;
    publisher = '';
    classCd = 0;
    class = '';
    publishYear = '';
    pageCount = 0;
    recommendFlg: number = 0;
    deleteFlg = '';
  }