import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { HttpResponseData, HttpReqOptions } from '../models/http';
import { BookItem, BookItemSearchKey } from '../store/book.store';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
    // `Authorization` に `Bearer トークン` をセットする
    //this.setAuthorization('my-auth-token');
  }
  
  private httpOptions: any = {
    // ヘッダ情報
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams(
        {}
    ),
    // ボディ情報
    body: null
  };

  public get<T>(params: any): Promise<T[]>{
    const _httpReqOptions: HttpReqOptions = {
      url: environment.apiurl + '/book',
      httpOptions: {
        params: params,
        observe: "response",
      },
    };
    return this.http.get<T[]>(environment.apiurl + '/book', _httpReqOptions.httpOptions)
    .toPromise()
    .then((res) => {
      // response の型は any ではなく class で型を定義した方が良いが
      // ここでは簡便さから any としておく

      // @angular/http では json() でパースする必要があったが､ @angular/common/http では不要となった
      //const response: any = res.json();
      const response: T[] = res;
      console.log(response);
      return response;
    })
    .catch(this.errorHandler);
  }

  /**
   * メッセージ登録
   *
   * @param {*} body リクエストボディ
   * @returns {Promise<any[]>} バックエンドからのレスポンス
   * @memberof HttpClientService
   */
    public post<T>(body: any): Promise<T> {
      return this.http.post<T>( environment.apiurl + '/book', body, this.httpOptions)
      .toPromise()
      .then((res) => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
    }

    public put<T>(body: any): Promise<T> {
      return this.http.put<T>( environment.apiurl + '/book', body, this.httpOptions)
      .toPromise()
      .then((res) => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
    }

    public delete<T>(id: number): Promise<T>{
      const params = new HttpParams().append('autonumber', id.toString());
      const options = { params: params };
      return this.http.delete<T>( environment.apiurl + '/book', options)
      .toPromise()
      .then((res) => {
        // response の型は any ではなく class で型を定義した方が良いが
        // ここでは簡便さから any としておく
  
        // @angular/http では json() でパースする必要があったが､ @angular/common/http では不要となった
        //const response: any = res.json();
        const response: any = res;
        console.log(response);
        return response;
      })
      .catch(this.errorHandler);
    }

  private errorHandler(err: any) {
    console.log('Error occured.', err);
    return Promise.reject(err.message || err);
  }
}
