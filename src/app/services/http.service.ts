import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpReqOptions, HttpResponseData } from "../models/http";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(config: HttpReqOptions): Observable<T> {
    // const ret = new HttpResponseData<T>();
    // ret.isOnline = window.navigator.onLine;
    return this.http.get<T>(config.url, config.httpOptions);
    // .pipe(
    //   map((res) => {
    //     console.log(ret, res);
    //     return this.CreateSuccessResult<T>(ret, res);
    //   })
    // );
  }

  post<T>(config: HttpReqOptions): Observable<HttpResponseData<T>> {
    const ret = new HttpResponseData<T>();
    ret.isOnline = window.navigator.onLine;
    return this.http
      .post<T>(config.url, config.body, config.httpOptions)
      .pipe(map((res) => this.CreateSuccessResult<T>(ret, res)));
  }

  put<T>(config: HttpReqOptions): Observable<HttpResponseData<T>> {
    const ret = new HttpResponseData<T>();
    ret.isOnline = window.navigator.onLine;
    return this.http
      .put<T>(config.url, config.body, config.httpOptions)
      .pipe(map((res) => this.CreateSuccessResult<T>(ret, res)));
  }

  delete<T>(config: HttpReqOptions): Observable<HttpResponseData<T>> {
    const ret = new HttpResponseData<T>();
    return this.http
      .delete<T>(config.url, config.httpOptions)
      .pipe(map((res) => this.CreateSuccessResult<T>(ret, res)));
  }

  private CreateSuccessResult<T>(
    ret: HttpResponseData<T>,
    res: any
  ): HttpResponseData<T> {
    return res;
  }
}
