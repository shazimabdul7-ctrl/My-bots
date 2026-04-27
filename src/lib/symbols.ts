export type DerivSymbol = {
  symbol: string;
  label: string;
  pip: number;
};

export const SYNTHETIC_SYMBOLS: DerivSymbol[] = [
  { symbol: "R_10", label: "Volatility 10 Index", pip: 3 },
  { symbol: "R_25", label: "Volatility 25 Index", pip: 3 },
  { symbol: "R_50", label: "Volatility 50 Index", pip: 4 },
  { symbol: "R_75", label: "Volatility 75 Index", pip: 4 },
  { symbol: "R_100", label: "Volatility 100 Index", pip: 2 },
  { symbol: "1HZ10V", label: "Volatility 10 (1s) Index", pip: 3 },
  { symbol: "1HZ25V", label: "Volatility 25 (1s) Index", pip: 3 },
  { symbol: "1HZ50V", label: "Volatility 50 (1s) Index", pip: 4 },
  { symbol: "1HZ75V", label: "Volatility 75 (1s) Index", pip: 4 },
  { symbol: "1HZ100V", label: "Volatility 100 (1s) Index", pip: 2 },
];

export const DEFAULT_SYMBOL = "R_75";

export function getSymbolMeta(symbol: string): DerivSymbol {
  return (
    SYNTHETIC_SYMBOLS.find((s) => s.symbol === symbol) ?? {
      symbol,
      label: symbol,
      pip: 2,
    }
  );
}
