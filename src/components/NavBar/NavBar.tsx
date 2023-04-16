import Image from "next/image";
import styles from "./NavBar.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeCurrency } from "@/redux/slices/currencySlice";

const NavBar = () => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const dispatch = useDispatch();
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
            <button>
              <Image
                className={styles.flag}
                height={20}
                width={30}
                src="/images/FlagBritish.webp"
                alt="British flag"
              />
            </button>
          </li>
          <li>
            <button
              aria-label="Change currency"
              onClick={() => dispatch(changeCurrency("GBP"))}
            >
              {currency}
            </button>
          </li>
        </ul>
        <button className={styles.access}>Log In</button>
      </div>
    </nav>
  );
};

export default NavBar;
