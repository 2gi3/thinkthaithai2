import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrency,
  toggleCurrencySelector,
} from "@/redux/slices/currencySlice";
import { RootState } from "@/redux/store";
import CurrencyToggle from "./CurrencyToggle";
import { currencies } from "@/data/currencies";
import styles from "./Currency.module.scss";


export const CurrencyList = () => {
  const dispatch = useDispatch();
  const currenciesSelectorIsOpen = useSelector(
    (state: RootState) => state.currency.selectorIsOpen
  );
  const handleCurrencyChange = (newCurrency: string) => {
    dispatch(changeCurrency(newCurrency));
    dispatch(toggleCurrencySelector());
  };
  return (
    <>
      {currenciesSelectorIsOpen ? (
        <div className={styles.currencyList}>
          <div className={styles.title}>
            <p>Select your currency</p>
            <CurrencyToggle label="X" />
          </div>
          <ul>
            {currencies.map(({ currency, country }) => (
              <li key={currency}>
                <button
                  aria-label={`Select ${currency} currency`}
                  onClick={() => handleCurrencyChange(currency)}
                >
                  <span>{currency} </span>
                  {country}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
