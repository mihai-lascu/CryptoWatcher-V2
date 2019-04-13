import {Injectable, Provider} from "@angular/core";
import {CRYPTO_SERVICE, ICryptoService} from "./crypto.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class CryptoRestService implements ICryptoService {

  constructor(private http: HttpClient) {
  }

  getCryptoData(crypto: string): Observable<any> {
    return this.http.get<any>(`https://data.messari.io/api/v1/assets/${crypto}/metrics`);
  }

  getCryptoGeneralNews(): Observable<any> {
    return this.http.get<any>('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
  }

  getCryptoCoinNews(crypto: string): Observable<any> {
    return this.http.get<any>(`https://data.messari.io/api/v1/news/${crypto}`);
  }
}

export const CryptoServiceProvider: Provider = {
  provide: CRYPTO_SERVICE,
  useClass: CryptoRestService
};
