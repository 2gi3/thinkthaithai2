import { useDispatch } from "react-redux";
import { toggleCurrencySelector } from "@/redux/slices/currencySlice";
import styles from "./Currency.module.scss";

const CurrencyToggle = ({ label }: { label: string }) => {
  const dispatch = useDispatch();
  return (
    <button
      className={styles.currencyToggle}
      aria-label={`Toggle available currencies`}
      onClick={() => dispatch(toggleCurrencySelector())}
    >
      {label}
    </button>
  );
};
export default CurrencyToggle;
