import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http.service';
import { AuthorItem } from '../store/author.store';
import { HttpResponseData } from '../models/http';

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

  displayedColumns: string[] = ['AuthorName', 'Count'];
  dataSource: any;

  ngOnInit(): void {
    this.getAuthorsData();
  }

  onClickGet($event: any): void{
    this.getAuthorsData();
  }

  getAuthorsData(): void{
    this.httpService.get<HttpResponseData<AuthorItem>>(null, '/author')
    .then(
      (response) => {
        this.param = response;
        this.dataSource = this.param.body;
        this.messageInfoList = this.param.messages;
        console.log(this.param);
      }
    )
    .catch(
      (error) => console.log(error)
    );
  }
}
