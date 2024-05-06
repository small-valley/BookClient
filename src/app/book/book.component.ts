import { Component, OnInit, ViewChild } from "@angular/core";

import { MatTableDataSource } from "@angular/material/table";
import { environment } from "src/environments/environment";
import { HttpReqOptions } from "../models/http";
import { RightBarComponent } from "../parts/right-bar/right-bar.component";
import { HttpService } from "../services/http.service";
import { BookItem, BookItemSearchKey, IBookItem } from "../stores/book.store";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
})
export class BookComponent implements OnInit {
  @ViewChild(RightBarComponent)
  books: IBookItem[] = [];

  dataSource = new MatTableDataSource<IBookItem>(this.books);

  bookItemSearchKey = new BookItemSearchKey();

  bookItems: IBookItem[] = [];

  bookItem = new BookItem();

  columns = [
    {
      columnDef: "date",
      header: "Date",
      cell: (element: IBookItem) => `${element.date}`,
    },
    {
      columnDef: "title",
      header: "Title",
      cell: (element: IBookItem) => `${element.title}`,
    },
    {
      columnDef: "author",
      header: "Author",
      cell: (element: IBookItem) => `${element.author}`,
    },
    {
      columnDef: "publisher",
      header: "Publisher",
      cell: (element: IBookItem) => `${element.publisher}`,
    },
    {
      columnDef: "class",
      header: "Class",
      cell: (element: IBookItem) => `${element.class}`,
    },
    {
      columnDef: "pageCount",
      header: "Page",
      cell: (element: IBookItem) => `${element.pageCount}`,
    },
    {
      columnDef: "isRecommend",
      header: "Recommend",
      cell: (element: IBookItem) => `${element.isRecommend}`,
    },
    {
      columnDef: "delete",
      header: "",
      cell: () => "",
    },
  ];

  displayedColumns = this.columns.map((c) => c.columnDef);

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
        this.messageInfoList = response.errMessages;
      },
      (error) => console.log(error)
    );
    //window.alert(this.messageInfoList);
    this.getBooksData();
  }

  onClickDelete($event: any): void {
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book",
      httpOptions: {
        params: {
          id: $event.id,
        },
      },
    };
    this.httpService.delete<number>(reqHttpOptions).subscribe(
      (response) => {
        this.messageInfoList = response.errMessages;
      },
      (error) => console.log(error)
    );
    //window.alert(this.messageInfoList);
    this.getBooksData();
  }

  onClickTable(i: number): void {
    console.log(this.dataSource.data, i);
    this.bookItem.id = this.dataSource.data[i].id;
    this.bookItem.date = this.dataSource.data[i].date;
    this.bookItem.title = this.dataSource.data[i].title;
    this.bookItem.authorId = this.dataSource.data[i].authorId;
    this.bookItem.author = this.dataSource.data[i].author;
    this.bookItem.publisherId = this.dataSource.data[i].publisherId;
    this.bookItem.publisher = this.dataSource.data[i].publisher;
    this.bookItem.classId = this.dataSource.data[i].classId;
    this.bookItem.class = this.dataSource.data[i].class;
    this.bookItem.pageCount = this.dataSource.data[i].pageCount;
    this.bookItem.publishYear = this.dataSource.data[i].publishYear;
    this.bookItem.isRecommend = this.dataSource.data[i].isRecommend;
    //alert(this.dataSource.data[i].autonumber);
  }

  getBooksData(): void {
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book",
      httpOptions: {
        params: this.bookItemSearchKey,
      },
    };
    this.httpService.get<IBookItem[]>(reqHttpOptions).subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<IBookItem>(response ?? []);
        this.messageInfoList = response;
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  postBooksDate(data: any): void {
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book",
      body: data,
    };
    this.httpService.post<number>(reqHttpOptions).subscribe(
      (response) => {
        this.messageInfoList = response.errMessages;
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

  public bookItemArray: IBookItem[] = [];

  parseCsv(data: string): void {
    this.bookItemArray = [];
    let csvToRowArray = data.split("\n");
    for (let index = 1; index < csvToRowArray.length; index++) {
      let row = csvToRowArray[index].split(",");
      if (row[0] == "") continue;
      this.bookItemArray.push({
        id: "", //id
        date: row[0], //date
        title: row[1], //title
        authorId: "", //authorId
        author: row[2], //author
        publisherId: "", //publisherId
        publisher: row[3], //publisher
        classId: "", //classId
        class: row[6], //class
        publishYear: row[4], //publishYear
        pageCount: parseInt(row[5], 10), //pageCount
        isRecommend: row[7] === "0", //isRecommend
      });
    }
    console.log(this.bookItemArray);
    this.postBooksDate(this.bookItemArray);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }
}
