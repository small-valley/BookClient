import { Component, OnInit } from "@angular/core";

import { environment } from "src/environments/environment";
import { HttpReqOptions, HttpResponseData } from "../models/http";
import { HttpService } from "../services/http.service";
import { AuthorItem } from "../stores/author.store";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.css"],
})
export class AuthorComponent implements OnInit {
  public param: any;

  public messageInfo: any = {
    id: null,
    message: null,
  };

  public messageInfoList: any = [this.messageInfo];

  constructor(private httpService: HttpService) {}

  displayedColumns: string[] = ["AuthorName", "Count"];
  dataSource: any;

  ngOnInit(): void {
    this.getAuthorsData();
  }

  onClickGet($event: any): void {
    this.getAuthorsData();
  }

  getAuthorsData(): void {
    const reqHttpOptions: HttpReqOptions<undefined> = {
      url: environment.apiUrl + "/author",
    };
    this.httpService
      .get<HttpResponseData<AuthorItem>>(reqHttpOptions)
      .subscribe(
        (response) => {
          this.param = response;
          this.dataSource = this.param;
          this.messageInfoList = this.param.messages;
          //console.log(response);
        },
        (error) => console.log(error)
      );
  }
}
