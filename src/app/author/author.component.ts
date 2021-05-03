import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http.service';
import { AuthorItem } from '../store/author.store';
import { HttpResponseData } from '../models/http';

export interface PeriodicElement {
  authorCd: number;
  authorName: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {authorCd: 1, authorName: 'Hydrogen'},
  {authorCd: 2, authorName: 'Helium'},
  {authorCd: 3, authorName: 'Lithium'},
  {authorCd: 4, authorName: 'Beryllium'},
  {authorCd: 5, authorName: 'Boron'},
  {authorCd: 6, authorName: 'Carbon'},
  {authorCd: 7, authorName: 'Nitrogen'},
  {authorCd: 8, authorName: 'Oxygen'},
  {authorCd: 9, authorName: 'Fluorine'},
  {authorCd: 10, authorName: 'Neon'},
];


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  public param: any;

  public messageInfo: any = {
    id: null,
    message: null
  };

  public messageInfoList: any = [this.messageInfo];

  constructor(private httpService: HttpService) { }

  displayedColumns: string[] = ['AuthorCd', 'AuthorName'];
  dataSource: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    //this.getAuthorsData();
  }

  onClickGet($event: any): void{
    this.getAuthorsData();
  }

  getAuthorsData(): void{
    this.httpService.get<HttpResponseData<AuthorItem>>(null, '/author')
    .then(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
        console.log(this.param);
      }
    )
    .catch(
      (error) => console.log(error)
    );
    this.dataSource = this.param.body;
  }
}
