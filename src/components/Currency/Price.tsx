import styles from "./Currency.module.scss";
import { changeCurrency } from "@/redux/slices/currencySlice";
import { useExchangeRate } from "@/functions/hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Price = () => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const dispatch = useDispatch();
  const exchangeRate = useExchangeRate(currency);
  return (
    <div className={styles.container}>
      <p>
        {currency}
        <span>{exchangeRate !== null ? exchangeRate : "Loading..."}</span>
      </p>
    </div>
  );
};
export default Price;
