import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

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
    // ボディ情報
    body: null
  };

  public get(): Promise<any>{
    return this.http.get( environment.apiurl + '/book', this.httpOptions)
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

  /**
   * メッセージ登録
   *
   * @param {*} body リクエストボディ
   * @returns {Promise<any[]>} バックエンドからのレスポンス
   * @memberof HttpClientService
   */
    public post<T>(body: T): Promise<any[]> {
      return this.http.post<T>( environment.apiurl + '/book', body, this.httpOptions)
      .toPromise()
      .then((res) => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
    }

    public put<T>(body: T): Promise<any[]> {
      return this.http.put<T>( environment.apiurl + '/book', body, this.httpOptions)
      .toPromise()
      .then((res) => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
    }

  private errorHandler(err: any) {
    console.log('Error occured.', err);
    return Promise.reject(err.message || err);
  }
}
