import { Component, OnInit } from '@angular/core';
import { HttpReqOptions } from '../models/http';

import { HttpService } from '../services/http.service';
import { NewHttpService } from '../services/http.service.new';
import { Book } from '../store/book.store';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: Book[] = [];

  bookItem = new Book();

  public param: any = {};

  public messageInfo: any = {
    id: null,
    message: null
  };

  public messageInfoList: any = [this.messageInfo];

  constructor(private httpService: HttpService
    ,private NewHttpService: NewHttpService
    ) { }

  ngOnInit(): void {
    this.httpService.get()
    .then(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      }
    )
    .catch(
      (error) => console.log(error)
    );
    this.books = this.param;
  }

  onClickGet($event: any): void{
    this.httpService.get()
    .then(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      }
    )
    .catch(
      (error) => console.log(error)
    );
    this.books = this.param;
  }

  onClickPost($event: any): void{
    this.httpService.post<Book>(this.bookItem)
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
    //this.login();
  }

  onClickPut($event: any): void{
    this.httpService.put<Book>(this.bookItem)
    .then(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      }
    )
    .catch(
      (error) => console.log(error)
    );
  }

  login() {
    const httpConfig: HttpReqOptions = {
      url: environment.apiurl + "/api/book",
      body: {
        data: this.bookItem
      },
      httpOptions: {
        observe: "response",
      },
    };
    return this.NewHttpService.post<Book>(httpConfig);
  }

  onClickTable(i: number): void{
    this.bookItem.autonumber = this.books[i].autonumber;
    this.bookItem.date = this.books[i].date;
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
}
