import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";

export interface ICryptoService {
  getCryptoMetrics(crypto: string): Observable<any>

  getCryptoProfile(crypto: string): Observable<any>

  getCryptoGeneralNews(): Observable<any>

  getCryptoCoinNews(crypto: string): Observable<any>
}

export const CRYPTO_SERVICE = new InjectionToken<ICryptoService>('CRYPTO_SERVICE');
