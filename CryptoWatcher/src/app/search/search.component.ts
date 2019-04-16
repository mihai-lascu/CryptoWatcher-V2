import {Component, Inject, OnInit} from '@angular/core';
import {INavigationService, NAVIGATION_SERVICE} from "../commons/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {CRYPTO_SERVICE, ICryptoService} from "../crypto/crypto.service";
import {ICryptoMetrics, ICryptoNews, ICryptoProfile, ISearchData} from "./search.model";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private searchData: ISearchData;
  private number_format = new Intl.NumberFormat();

  constructor(@Inject(CRYPTO_SERVICE) private cryptoService: ICryptoService,
              @Inject(NAVIGATION_SERVICE) private navigationService: INavigationService, private activatedRoute: ActivatedRoute) {
    this.searchData = {};
    this.searchData.cryptoNews = [];
  }

  ngOnInit() {
    this.cryptoService.getCryptoProfile(this.navigationService.getParam(this.activatedRoute, 'symbol').toLowerCase()).subscribe(data => {
      let profile: ICryptoProfile = {};
      profile.tagLine = data.data.tagline;
      profile.overview = data.data.overview;
      profile.background = data.data.background;
      profile.technology = data.data.technology;
      profile.whitePaper = data.data.relevant_resources[0].url;

      this.searchData.cryptoProfile = profile;
    });

    this.cryptoService.getCryptoMetrics(this.navigationService.getParam(this.activatedRoute, 'symbol').toLowerCase()).subscribe(data => {
      let metrics: ICryptoMetrics = {};
      metrics.name = data.data.name;
      metrics.symbol = data.data.symbol;
      metrics.marketCap = this.number_format.format(data.data.marketcap.current_marketcap_usd.toFixed());
      metrics.percentChange24Hr = this.number_format.format(data.data.market_data.percent_change_usd_last_24_hours.toFixed(2));
      metrics.percentChange1Week = this.number_format.format(data.data.roi_data.percent_change_last_1_week.toFixed(2));
      metrics.percentChange1Month = this.number_format.format(data.data.roi_data.percent_change_last_1_month.toFixed(2));
      if (parseFloat(data.data.market_data.price_usd) > 1) {
        metrics.priceUsd = this.number_format.format(data.data.market_data.price_usd.toFixed(2));
      } else {
        metrics.priceUsd = data.data.market_data.price_usd.toFixed(4);
      }

      this.searchData.cryptoMetrics = metrics;
    });

    this.cryptoService.getCryptoCoinNews(this.navigationService.getParam(this.activatedRoute, 'symbol').toLowerCase()).subscribe(data => data.data.forEach(current => {
      let news: ICryptoNews = {};
      news.title = current.tittle;
      news.content = current.content;
      news.url = current.references[0].url;
      news.author = current.author.name;

      this.searchData.cryptoNews.push(news);
    }));
  }

}
