export interface ISearchData {
  cryptoNews?: Array<ICryptoNews>,
  cryptoProfile?: ICryptoProfile,
  cryptoMetrics?: ICryptoMetrics
}

export interface ICryptoProfile {
  tagLine?: string,
  overview?: string,
  background?: string,
  technology?: string,
  whitePaper?: string
}

export interface ICryptoMetrics {
  symbol?: string,
  name?: string,
  priceUsd?: string,
  marketCap?: string,
  percentChange24Hr?: string,
  percentChange1Week?: string,
  percentChange1Month?: string
}

export interface ICryptoNews {
  title?: string,
  content?: string,
  url?: string,
  author?: string
}
