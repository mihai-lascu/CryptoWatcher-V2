import {InjectionToken} from '@angular/core';
import {Observable} from "rxjs";
import {IUser, IUserCrypto} from "./user.model";

export interface IUserService {
  getUser(token: string): Observable<IUser>

  getToken(email: string, password: string): Observable<any>

  createUser(email: string, password: string, name: string): Observable<any>

  getUserCoins(token: string): Observable<Array<IUserCrypto>>

  addUserCoin(token: string, symbol: string, amount: number, investment: number): Observable<any>
}

export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');
