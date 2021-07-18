import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

import { HttpService } from '../services/http.service';
import { NewHttpService } from '../services/http.service.new';
import { BookItemCsv, BookItem, BookItemSearchKey } from '../store/book.store';
import { HttpResponseData } from '../models/http';
import { RightBarComponent } from '../right-bar/right-bar.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  @ViewChild(RightBarComponent)

  books: BookItem[] = [];

  bookItemSearchKey = new BookItemSearchKey();

  bookItems: BookItem[] = [];

  bookItem = new BookItem();

  displayedColumns: string[] = ['DateTime', 'Title', 'Author', 'Publisher', 'Class', 'PageCount', 'PublishYear', 'RecommendFlg'];

  public param: any;

  public messageInfo: any = {
    id: null,
    message: null
  };

  public messageInfoList: any = [this.messageInfo];

  public allowedFormats = [ 
    BarcodeFormat.QR_CODE, 
    BarcodeFormat.EAN_13, 
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.UPC_EAN_EXTENSION,
    BarcodeFormat.ITF,
    BarcodeFormat.RSS_14,
    BarcodeFormat.MAXICODE,
  ];

  public qrResultString: string = '';

  constructor(private httpService: HttpService
    ,private NewHttpService: NewHttpService
    ) { }

  ngOnInit(): void {
    this.getBooksData();
  }

  getChildComponent(child: RightBarComponent): BookItemSearchKey{
    return child.bookItemSearchKey
  }

  onClickGet($event: any): void{
    this.getBooksData();
  }

  onClickPost($event: any): void{
    this.bookItems[0] = this.bookItem;
    this.putBooksDate(this.bookItems);
    this.getBooksData();
  }

  onClickPut($event: any): void{
    this.bookItems[0] = this.bookItem;
    this.httpService.put<HttpResponseData<number>>(this.bookItems, '/book')
    .then(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      }
    )
    .catch(
      (error) => console.log(error)
    );
    //window.alert(this.messageInfoList);
    this.getBooksData();
  }

  onClickDelete($event: any): void{
    this.httpService.delete<HttpResponseData<number>>(this.bookItem.autonumber, '/book')
    .then(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      }
    )
    .catch(
      (error) => console.log(error)
    );
    //window.alert(this.messageInfoList);
    this.getBooksData();
  }

  onClickTable(i: number): void{
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

  getBooksData(): void{
    this.httpService.get<HttpResponseData<BookItem>>(this.bookItemSearchKey, '/book')
    .then(
      (response) => {
        this.param = response;
        this.books = this.param.body;
        this.messageInfoList = this.param.messages;
        //console.log(response);
      }
    )
    .catch(
      (error) => console.log(error)
    );
    //this.books = this.param.body;
  }

  putBooksDate(data: any): void{
    this.httpService.post<HttpResponseData<number>>(data, '/book')
    .then(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      }
    )
    .catch(
      (error) => console.log(error)
    );
    //window.alert(this.param.body);
  }

  onClickCsvDataPost($event: any) {
    const file = $event.target.files[0];
    this.fileToText(file)
      .then(text => {
        console.log(text);
        this.parseCsv(text);
      })
      .catch(err => console.log(err));
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

  parseCsv(data: string): void{
    this.bookItemArray = [];
    let csvToRowArray = data.split("\n");
    for (let index = 1; index < csvToRowArray.length; index++) {
      let row = csvToRowArray[index].split(",");
      if(row[0] == '') continue;
      this.bookItemArray.push(
        new BookItemCsv(
          0, //autonumber
          new Date(row[0].toString()), //datetime
          row[1], //title
          0, //authorcd
          row[2], //author
          0, //publishercd
          row[3], //publisher
          0, //classcd
          row[6], //classname
          row[4], //publishyear
          parseInt(row[5] ?? 0, 10), //pagecount
          row[7], //recommendflg
        ));
    }
    console.log(this.bookItemArray);
    this.putBooksDate(this.bookItemArray);
   }

   onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }
}