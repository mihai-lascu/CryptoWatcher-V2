import {Component, Inject, OnInit} from '@angular/core';
import {ICoin} from "../crypto/crypto.model";
import {CRYPTO_SERVICE, ICryptoService} from "../crypto/crypto.service";
import {ICryptoGeneralNews} from "./general-news.model";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  protected top20: Array<ICoin>;
  private number_format = new Intl.NumberFormat();
  protected generalNews: Array<ICryptoGeneralNews>;

  constructor(@Inject(CRYPTO_SERVICE) private cryptoService: ICryptoService) {
  }

  ngOnInit() {
    this.top20 = [];
    this.generalNews = [];
    this.getTOP20();
    this.getCryptoNews();
  }

  getCryptoNews() {
    let news: ICryptoGeneralNews = {};
    this.cryptoService.getCryptoGeneralNews().subscribe(data => data.Data.forEach(current => {
      news.body = current.body;
      news.imageURL = current.imageurl;
      news.title = current.title;
      news.source = current.source;
      news.url = current.url;
      this.generalNews.push(news);
      news = {};
    }))
  }

  getTOP20() {
    let coin: ICoin = {};
    const cryptos = ['btc', 'eth', 'xrp', 'ltc', 'bch', 'eos', 'bnb', 'xlm', 'ada', 'trx', 'bsv', 'dash', 'xmr', 'iota', 'neo', 'ont', 'mkr', 'xtz', 'xem', 'etc'];
    cryptos.forEach(current => this.cryptoService.getCryptoMetrics(current).subscribe(crypto => {

      coin.name = crypto.data.name;
      if (parseFloat(crypto.data.market_data.price_usd) > 1) {
        coin.price = crypto.data.market_data.price_usd.toFixed(2);
        coin.formattedPrice = this.number_format.format(crypto.data.market_data.price_usd.toFixed(2));
      } else {
        coin.price = crypto.data.market_data.price_usd.toFixed(4);
        coin.formattedPrice = this.number_format.format(crypto.data.market_data.price_usd.toFixed(4));
      }

      coin.change24Hr = crypto.data.market_data.percent_change_usd_last_24_hours.toFixed(2);
      coin.formattedChange24Hr = this.number_format.format(crypto.data.market_data.percent_change_usd_last_24_hours.toFixed(2));

      coin.volume = crypto.data.market_data.volume_last_24_hours.toFixed();
      coin.formattedVolume = this.number_format.format(crypto.data.market_data.volume_last_24_hours.toFixed());

      coin.marketCap = crypto.data.marketcap.current_marketcap_usd.toFixed();
      coin.formattedMarketCap = this.number_format.format(crypto.data.marketcap.current_marketcap_usd.toFixed());

      coin.supply = crypto.data.supply.circulating.toFixed();
      coin.formattedSupply = this.number_format.format(crypto.data.supply.circulating.toFixed());

      coin.symbol = crypto.data.symbol;

      this.top20.push(coin);
      this.top20.sort(function (a, b) {
        return parseInt(b.marketCap) - parseInt(a.marketCap);
      });
      coin = {};
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

}
