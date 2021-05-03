import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http.service';
import { NewHttpService } from '../services/http.service.new';
import { BookItem, BookItemSearchKey } from '../store/book.store';
import { HttpResponseData } from '../models/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: BookItem[] = [];

  bookItemSearchKey = new BookItemSearchKey();

  bookItem = new BookItem();

  public param: any;

  public messageInfo: any = {
    id: null,
    message: null
  };

  public messageInfoList: any = [this.messageInfo];

  constructor(private httpService: HttpService
    ,private NewHttpService: NewHttpService
    ) { }

  ngOnInit(): void {
    //this.getBooksData();
  }

  onClickGet($event: any): void{
    this.getBooksData();
  }

  onClickPost($event: any): void{
    this.httpService.post<HttpResponseData<number>>(this.bookItem, '/book')
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
    this.getBooksData();
  }

  onClickPut($event: any): void{
    this.httpService.put<HttpResponseData<number>>(this.bookItem, '/book')
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
        this.messageInfoList = this.param.messages;
        //console.log(response);
      }
    )
    .catch(
      (error) => console.log(error)
    );
    this.books = this.param.body;
  }
}
