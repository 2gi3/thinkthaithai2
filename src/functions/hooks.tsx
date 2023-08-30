import { updateStudent } from "@/redux/slices/studentSlice";
import { FetcherArgs, databaseStudent } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";



export const useExchangeRate = (newRate: string, amount = 5) => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const URL = process.env.NEXT_PUBLIC_BASIC_URL!;
      console.log(URL);
      try {
        const raw = await fetch(`${URL}/api/forex`);
        const { data } = await raw.json();

        console.log('b4')
        console.log(data)
        console.log('af')
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

