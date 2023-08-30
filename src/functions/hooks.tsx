import { fallbackData } from "@/data/fallbackExchangeRates";
import { useEffect, useState } from "react";


export const useExchangeRate = (newRate: string, amount = 5) => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const URL = process.env.NEXT_PUBLIC_BASIC_URL!;
      console.log(URL);
      try {
        const raw = await fetch(`${URL}/api/forex`);
        const { data } = await raw.json();
        const newCurrencyValue = data.rates[newRate] * amount;
        setExchangeRate(Number(newCurrencyValue.toFixed(2)));
      } catch (error) {
        console.error(error);
        try {
          const raw = await fetch('https://api.exchangerate.host/latest?base=USD');
          const { rates } = await raw.json();
          const newCurrencyValue = rates[newRate] * amount;
          setExchangeRate(Number(newCurrencyValue.toFixed(2)));
        } catch (error) {
          console.error('Currencies updated to 30/08/2023');
          const rate = Number(fallbackData.data.rates[newRate]) * amount;
          setExchangeRate(Number(rate.toFixed(2)));
        }
      }
    };
    fetchExchangeRate();
  }, [newRate, amount]);

  return exchangeRate;
};


