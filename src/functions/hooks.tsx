import { updateStudent } from "@/redux/slices/studentSlice";
import { FetcherArgs, databaseStudent } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";



export const useExchangeRate = (newRate: string, amount = 5) => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  // const fetchExchangeRate = async () => {
  //   const URL = process.env.NEXT_PUBLIC_CURRENCY_EXCHANGE_URL;
  //   console.log(URL);
  //   try {
  //     const raw = await fetch(URL!);
  //     const { data } = await raw.json();
  //     const newCurrencyValue = data.rates[newRate] * amount;
  //     setExchangeRate(Number(newCurrencyValue.toFixed(2)));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const URL = process.env.NEXT_PUBLIC_CURRENCY_EXCHANGE_URL;
      console.log(URL);
      try {
        const raw = await fetch(URL!);
        const { data } = await raw.json();
        const newCurrencyValue = data.rates[newRate] * amount;
        setExchangeRate(Number(newCurrencyValue.toFixed(2)));
      } catch (error) {
        console.error(error);
      }
    };
    fetchExchangeRate();
  }, [newRate, amount]);

  return exchangeRate;
};

