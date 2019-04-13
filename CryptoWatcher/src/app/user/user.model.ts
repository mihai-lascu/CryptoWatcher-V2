export interface IUser {
  email: string,
  name: string,
  portfolios?: Array<IUserPortfolio>
}

export interface IUserCrypto {
  coin_symbol: string,
  coin_amount: number,
  coin_investment: number
}

export interface IUserPortfolio {
  name?: string,
  coins?: Array<IUserCrypto>
}

