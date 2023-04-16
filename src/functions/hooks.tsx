import { useEffect, useState } from "react";

export const useExchangeRate = (
  newRate: string,
  baseCurrency = "USD",
  amount = 5
) => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const raw = await fetch(
          `https://api.coinbase.com/v2/exchange-rates?currency=${baseCurrency}`
        );
        const { data } = await raw.json();
        const newCurrencyValue = data.rates[newRate] * amount;
        setExchangeRate(newCurrencyValue);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExchangeRate();
  }, [newRate, baseCurrency, amount]);

  return exchangeRate;
};
