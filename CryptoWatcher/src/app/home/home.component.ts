import {Component, Inject, OnInit} from '@angular/core';
import {ICoin} from "../crypto/crypto.model";
import {CRYPTO_SERVICE, ICryptoService} from "../crypto/crypto.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private top20: Array<ICoin>;
  private coin: ICoin;
  private number_format = new Intl.NumberFormat();
  private generalNews: any;

  constructor(@Inject(CRYPTO_SERVICE) private cryptoService: ICryptoService) {
    this.coin = {};
    this.top20 = [];
    this.generalNews = {};
    this.getTOP20();
    this.getGeneralNews();
  }

  getGeneralNews() {
    this.cryptoService.getCryptoGeneralNews().subscribe(data => {
      this.generalNews = data;
      console.log(this.generalNews);
    });
  }

  getTOP20() {

    const cryptos = ['btc', 'eth', 'xrp', 'ltc', 'bch', 'eos', 'bnb', 'xlm', 'ada', 'trx', 'bsv', 'dash', 'xmr', 'iota', 'neo', 'ont', 'mkr', 'xtz', 'xem', 'etc'];
    cryptos.forEach(current => this.cryptoService.getCryptoData(current).subscribe(crypto => {

      this.coin.name = crypto.data.name;
      if (parseFloat(crypto.data.market_data.price_usd) > 1) {
        this.coin.price = crypto.data.market_data.price_usd.toFixed(2);
      } else {
        this.coin.price = crypto.data.market_data.price_usd.toFixed(4);
      }
      this.coin.change24Hr = crypto.data.market_data.percent_change_usd_last_24_hours.toFixed(2);
      this.coin.volume = crypto.data.market_data.volume_last_24_hours.toFixed();
      this.coin.marketCap = crypto.data.marketcap.current_marketcap_usd.toFixed();
      this.coin.supply = crypto.data.supply.circulating.toFixed();
      this.coin.symbol = crypto.data.symbol;

      this.top20.push(this.coin);
      this.top20.sort(function (a, b) {
        return parseInt(b.marketCap) - parseInt(a.marketCap);
      });
      this.coin = {};
    }));
  }

  sortTOP20(category: string) {
    switch (category) {
      case 'marketCap': {
        this.top20.sort(function (a, b) {
          return parseInt(b.marketCap) - parseInt(a.marketCap);
        });
        break;
      }
      case 'volume': {
        this.top20.sort(function (a, b) {
          return parseInt(b.volume) - parseInt(a.volume);
        });
        break;
      }
      case 'supply': {
        this.top20.sort(function (a, b) {
          return parseInt(b.supply) - parseInt(a.supply);
        });
        break;
      }
      case 'name': {
        this.top20.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
        break;
      }
      case 'price': {
        this.top20.sort(function (a, b) {
          return parseInt(b.price) - parseInt(a.price);
        });
        break;
      }
      case '24h': {
        this.top20.sort(function (a, b) {
          return parseInt(b.change24Hr) - parseInt(a.change24Hr);
        });
        break;
      }
    }
  }

  ngOnInit() {
  }

}
