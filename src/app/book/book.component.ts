import { Component, OnInit, ViewChild } from "@angular/core";

import { MatTableDataSource } from "@angular/material/table";
import { environment } from "src/environments/environment";
import { HttpReqOptions } from "../models/http";
import { RightBarComponent } from "../parts/right-bar/right-bar.component";
import { HttpService } from "../services/http.service";
import {
  BookItem,
  BookItemCsv,
  BookItemSearchKey,
  IBookItem,
} from "../stores/book.store";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
})
export class BookComponent implements OnInit {
  @ViewChild(RightBarComponent)
  books: BookItem[] = [];

  dataSource = new MatTableDataSource<BookItem>(this.books);

  bookItemSearchKey = new BookItemSearchKey();

  bookItems: BookItem[] = [];

  bookItem = new BookItem();

  columns = [
    {
      columnDef: "autonumber",
      header: "No",
      cell: (element: IBookItem) => `${element.autonumber}`,
    },
    {
      columnDef: "dateTime",
      header: "日付",
      cell: (element: IBookItem) => `${element.dateTime}`,
    },
    {
      columnDef: "title",
      header: "タイトル",
      cell: (element: IBookItem) => `${element.title}`,
    },
    {
      columnDef: "author",
      header: "著者",
      cell: (element: IBookItem) => `${element.author}`,
    },
    {
      columnDef: "publisher",
      header: "出版社",
      cell: (element: IBookItem) => `${element.publisher}`,
    },
    {
      columnDef: "class",
      header: "分類",
      cell: (element: IBookItem) => `${element.class}`,
    },
    {
      columnDef: "pageCount",
      header: "ページ数",
      cell: (element: IBookItem) => `${element.pageCount}`,
    },
    {
      columnDef: "recommendFlg",
      header: "おすすめ",
      cell: (element: IBookItem) => `${element.recommendFlg}`,
    },
  ];

  displayedColumns = this.columns.map((c) => c.columnDef);

  public param: any;

  public messageInfo: any = {
    id: null,
    message: null,
  };

  public messageInfoList: any = [this.messageInfo];

  public qrResultString: string = "";

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  getChildComponent(child: RightBarComponent): BookItemSearchKey {
    return child.bookItemSearchKey;
  }

  onClickGet($event: any): void {
    this.getBooksData();
  }

  onClickPost($event: any): void {
    this.bookItems[0] = this.bookItem;
    this.postBooksDate(this.bookItems);
    this.getBooksData();
  }

  onClickPut($event: any): void {
    this.bookItems[0] = this.bookItem;
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book",
      body: this.bookItems,
    };
    this.httpService.put<number>(reqHttpOptions).subscribe(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      },
      (error) => console.log(error)
    );
    //window.alert(this.messageInfoList);
    this.getBooksData();
  }

  onClickDelete($event: any): void {
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book/" + this.bookItem.autonumber,
      httpOptions: {
        params: {
          autoNumber: this.bookItem.autonumber,
        },
      },
    };
    this.httpService.delete<number>(reqHttpOptions).subscribe(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      },
      (error) => console.log(error)
    );
    //window.alert(this.messageInfoList);
    this.getBooksData();
  }

  onClickTable(i: number): void {
    this.bookItem.autonumber = this.books[i].autonumber;
    this.bookItem.dateTime = this.books[i].dateTime;
    this.bookItem.title = this.books[i].title;
    this.bookItem.authorCd = this.books[i].authorCd;
    this.bookItem.author = this.books[i].author;
    this.bookItem.publisherCd = this.books[i].publisherCd;
    this.bookItem.publisher = this.books[i].publisher;
    this.bookItem.classCd = this.books[i].classCd;
    this.bookItem.class = this.books[i].class;
    this.bookItem.pageCount = this.books[i].pageCount;
    this.bookItem.publishYear = this.books[i].publishYear;
    this.bookItem.recommendFlg = this.books[i].recommendFlg;
    //alert(this.books[i].autonumber);
  }

  getBooksData(): void {
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book",
      httpOptions: {
        params: this.bookItemSearchKey,
      },
    };
    this.httpService.get<BookItem[]>(reqHttpOptions).subscribe(
      (response) => {
        this.param = response;
        this.books = this.param;
        this.messageInfoList = this.param.messages;
        console.log(response);
      },
      (error) => console.log(error)
    );
    //this.books = this.param.body;
  }

  postBooksDate(data: any): void {
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book",
      body: data,
    };
    this.httpService.post<number>(reqHttpOptions).subscribe(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      },
      (error) => console.log(error)
    );
    //window.alert(this.param.body);
  }

  onClickCsvDataPost($event: any) {
    const file = $event.target.files[0];
    this.fileToText(file)
      .then((text) => {
        console.log(text);
        this.parseCsv(text);
      })
      .catch((err) => console.log(err));
    //this.uploadListener(file);
  }

  fileToText(file: any): Promise<string> {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result?.toString()!);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }

  public bookItemArray: BookItem[] = [];

  parseCsv(data: string): void {
    this.bookItemArray = [];
    let csvToRowArray = data.split("\n");
    for (let index = 1; index < csvToRowArray.length; index++) {
      let row = csvToRowArray[index].split(",");
      if (row[0] == "") continue;
      this.bookItemArray.push(
        new BookItemCsv(
          0, //autonumber
          row[0], //dateTime
          row[1], //title
          0, //author
          row[2], //author
          0, //publisherCd
          row[3], //publisher
          0, //classCd
          row[6], //className
          row[4], //publishYear
          parseInt(row[5], 10), //pageCount
          row[7] //recommendFlg
        )
      );
    }
    console.log(this.bookItemArray);
    this.postBooksDate(this.bookItemArray);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }
}
