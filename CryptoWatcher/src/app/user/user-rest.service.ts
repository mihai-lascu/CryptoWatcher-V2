import {Injectable, Provider} from '@angular/core';
import {IUserService, USER_SERVICE} from "./user.service";
import {Observable} from "rxjs";
import {IUser, IUserCrypto} from "./user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class UserRestService implements IUserService {

  constructor(private http: HttpClient) {
  }

  getUser(token: string): Observable<IUser> {
    const url = 'http://localhost:8000/api/user/me/';
    return this.http.get<IUser>(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
  }

  getToken(email: string, password: string): Observable<any> {
    const url = 'http://localhost:8000/api/user/token/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data = {
      "email": email,
      "password": password
    };

    return this.http.post<any>(url, JSON.stringify(data), {headers: headers});
  }

  createUser(email: string, password: string, name: string): Observable<any> {
    const url = 'http://localhost:8000/api/user/create/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data = {
      "email": email,
      "password": password,
      "name": name
    };

    return this.http.post<any>(url, JSON.stringify(data), {headers: headers});
  }

  addUserCoin(token: string, symbol: string, amount: number, investment: number): Observable<any> {
    const url = 'http://localhost:8000/api/crypto/coins/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
    const data = {
      coin_symbol: symbol,
      coin_amount: amount,
      coin_investment: investment
    };
    return this.http.post<any>(url, JSON.stringify(data), {headers: headers});
  }

  getUserCoins(token: string): Observable<Array<IUserCrypto>> {
    const url = 'http://localhost:8000/api/crypto/coins/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });

    return this.http.get<Array<IUserCrypto>>(url, {headers: headers});
  }
}

export const UserServiceProvider: Provider = {
  provide: USER_SERVICE,
  useClass: UserRestService
};
