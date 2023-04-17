import Image from "next/image";
import styles from "./NavBar.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  changeCurrency,
  toggleCurrencySelector,
} from "@/redux/slices/currencySlice";
import CurrencyToggle from "../Currency/CurrencyToggle";
import LanguageSelector from "../Language/languageSetector";

const NavBar = () => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const currenciesSelectorIsOpen = useSelector(
    (state: RootState) => state.currency.selectorIsOpen
  );
  const dispatch = useDispatch();
  const handleCurrencyChange = (newCurrency: string) => {
    dispatch(changeCurrency(newCurrency));
    dispatch(toggleCurrencySelector());
  };
  const currencies = [
    { currency: "AUD", country: "Australia" },
    { currency: "CAD", country: "Canada" },
    { currency: "CNY", country: "China" },
    { currency: "EUR", country: "European Union" },
    { currency: "GBP", country: "United Kingdom" },
    { currency: "HKD", country: "Hong Kong" },
    { currency: "JPY", country: "Japan" },
    { currency: "KRW", country: "South Korea" },
    { currency: "NZD", country: "New Zealand" },
    { currency: "THB", country: "Thailand" },
    { currency: "TWD", country: "Taiwan" },
    { currency: "USD", country: "United States" },
    { currency: "INR", country: "India" },
    { currency: "RUB", country: "Russia" },
    { currency: "BRL", country: "Brazil" },
    { currency: "MXN", country: "Mexico" },
  ];

  return (
    <nav className={styles.container}>
      <div className={styles.brand}>
        <Link href="/">ThinkThaiThai</Link>
      </div>
      <div className={styles.navigation}>
        <ul className={styles.links}>
          <li>
            <Link href="/">About Me</Link>
          </li>
          <li>
            <Link href="/">Price</Link>
          </li>
          <li>
            <Link href="/">Feedbacks</Link>
          </li>
          <li>
            <Link href="/">Free Courses</Link>
          </li>
        </ul>
        <ul className={styles.buttons}>
          <li>
            {/* <button
              aria-label="Change currency"
              onClick={() => console.log("THB")}
            >
              <Image
                className={styles.flag}
                height={20}
                width={30}
                src="/images/FlagBritish.webp"
                alt="British flag"
              />
            </button> */}
            <LanguageSelector />
          </li>
          <li>
            <CurrencyToggle label={currency} />
          </li>
        </ul>
        <button className={styles.access}>Log&nbsp;In</button>
      </div>
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
    </nav>
  );
};

export default NavBar;
