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
      headers: { Authorization: `Bearer ${this.getAccessToken()}` },
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
        headers: { Authorization: `Bearer ${this.getAccessToken()}` },
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
        headers: { Authorization: `Bearer ${this.getAccessToken()}` },
        withCredentials: true,
      })
      .pipe(map((res) => this.CreateSuccessResult<T>(ret, res)));
  }

  delete<T>(
    config: HttpReqOptions<undefined>
  ): Observable<HttpResponseData<T>> {
    const ret = new HttpResponseData<T>();
    return this.http
      .delete<T>(config.url, {
        ...config.httpOptions,
        headers: { Authorization: `Bearer ${this.getAccessToken()}` },
        withCredentials: true,
      })
      .pipe(map((res) => this.CreateSuccessResult<T>(ret, res)));
  }

  private CreateSuccessResult<T>(
    ret: HttpResponseData<T>,
    res: any
  ): HttpResponseData<T> {
    return res;
  }

  private getAccessToken(): string {
    const nameEQ = "access_token" + "=";
    const ca = document.cookie.split(";");
    console.log(document.cookie, ca);
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const token = c.substring(nameEQ.length, c.length);
        console.log(token);
        return c.substring(nameEQ.length, c.length);
      }
    }
    return "";
  }
}
