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

  get<T>(config: HttpReqOptions<undefined>): Observable<T> {
    // const ret = new HttpResponseData<T>();
    // ret.isOnline = window.navigator.onLine;
    return this.http.get<T>(config.url, {
      ...config.httpOptions,
      withCredentials: true,
    });
    // .pipe(
    //   map((res) => {
    //     console.log(ret, res);
    //     return this.CreateSuccessResult<T>(ret, res);
    //   })
    // );
  }

  post<T, K>(config: HttpReqOptions<K>): Observable<HttpResponseData<T>> {
    const ret = new HttpResponseData<T>();
    ret.isOnline = window.navigator.onLine;
    return this.http
      .post<T>(config.url, config.body, {
        ...config.httpOptions,
        withCredentials: true,
      })
      .pipe(map((res) => this.CreateSuccessResult<T>(ret, res)));
  }

  put<T, K>(config: HttpReqOptions<K>): Observable<HttpResponseData<T>> {
    const ret = new HttpResponseData<T>();
    ret.isOnline = window.navigator.onLine;
    return this.http
      .put<T>(config.url, config.body, {
        ...config.httpOptions,
        withCredentials: true,
      })
      .pipe(map((res) => this.CreateSuccessResult<T>(ret, res)));
  }

  delete<T>(
    config: HttpReqOptions<undefined>
  ): Observable<HttpResponseData<T>> {
    const ret = new HttpResponseData<T>();
    return this.http
      .delete<T>(config.url, { ...config.httpOptions, withCredentials: true })
      .pipe(map((res) => this.CreateSuccessResult<T>(ret, res)));
  }

  private CreateSuccessResult<T>(
    ret: HttpResponseData<T>,
    res: any
  ): HttpResponseData<T> {
    return res;
  }
}
