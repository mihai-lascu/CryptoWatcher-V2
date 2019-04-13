import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";

export interface ICryptoService {
  getCryptoData(crypto: string): Observable<any>

  getCryptoGeneralNews(): Observable<any>

  getCryptoCoinNews(crypto: string): Observable<any>
}

export const CRYPTO_SERVICE = new InjectionToken<ICryptoService>('CRYPTO_SERVICE');
