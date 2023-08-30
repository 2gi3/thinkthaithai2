import styles from "./Currency.module.scss";
import { useExchangeRate } from "@/functions/hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Spinner from "../Spinner";

const Price = ({ USD }: { USD: number }) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const exchangeRate = useExchangeRate(currency, USD);
  return (
    <div className={styles.container}>
      <p data-testid="currency_code">
        {currency}
        <span data-testid="currency_rate">
          {exchangeRate !== null ? exchangeRate : <Spinner diameter={16} />}
        </span>
      </p>
    </div>
  );
};
export default Price;
