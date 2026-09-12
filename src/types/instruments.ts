export type MarketInstrument = {
    symbol: string;
    name: string;
    price: number;
    changeType: string;
}

export const marketInstruments: MarketInstrument[] = [
  {
    symbol: "AAPL",
    name: "Apple",
    price: 228.50,
    changeType: "N/A"
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 505.25,
    changeType: "N/A"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: 181.75,
    changeType: "N/A"
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: 342.10,
    changeType: "N/A"
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    price: 231.40,
    changeType: "N/A"
  }
];
