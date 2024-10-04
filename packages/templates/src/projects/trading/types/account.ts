export interface Balance {
  balanceTo: string;
  total: number;
  free: number;
  otherCoinsCount: number;
  otherCoinsPrice: number;
  coins: Array<Coins>;
}

export interface Coins {
  coinName: string;
  coins: number;
  freeCoins: number;
  freePrice: number;
  price: number;
}
