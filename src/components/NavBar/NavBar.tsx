import styles from "./NavBar.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import CurrencyToggle from "../Currency/CurrencyToggle";
import LanguageSelector from "../Language/languageSetector";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

import { useTranslation } from "next-i18next";
import { CurrencyList } from "../Currency/CurrencyList";

const NavBar = () => {
  const { t } = useTranslation("common");
  const [toggleIsOpen, setToggleIsOpen] = useState(false);

  const currency = useSelector((state: RootState) => state.currency.value);

  return (
    <nav className={styles.container}>
      <button
        className={styles.toggle}
        onClick={() => setToggleIsOpen(!toggleIsOpen)}
      >
        {toggleIsOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={styles.brand}>
        <Link href="/">ThinkThaiThai</Link>
      </div>
      <div className={toggleIsOpen ? styles.navigation : styles.hide}>
        <ul className={styles.links}>
          <li>
            <Link href="/aboutme">{t("about me")}</Link>
          </li>
          <li>
            <Link href="/price">{t("price")}</Link>
          </li>
          <li>
            <Link href="/feedbacks">{t("feedbacks")}</Link>
          </li>
          <li>
            <Link href="/courses">{t("free courses")}</Link>
          </li>
        </ul>
        <ul className={styles.buttons}>
          <li>
            <LanguageSelector />
          </li>
          <li>
            <CurrencyToggle label={currency} />
          </li>
        </ul>
        <Link href="/access" className={styles.access}>
          {t("log in")}
        </Link>
      </div>
      <CurrencyList />
    </nav>
  );
};

export default NavBar;
