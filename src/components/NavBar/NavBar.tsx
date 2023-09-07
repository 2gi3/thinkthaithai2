import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./NavBar.module.scss";
import CurrencyToggle from "../Currency/CurrencyToggle";
import LanguageSelector from "../Language/languageSetector";
import { CurrencyList } from "../Currency/CurrencyList";
import { RootState } from "@/redux/store";

const NavBar = () => {
  const { t } = useTranslation("common");
  const [toggleIsOpen, setToggleIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const currency = useSelector((state: RootState) => state.currency.value);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {

    setToggleIsOpen(false);

  }, [pathname, currency]);

  const handleLogOut = async () => {
    localStorage.removeItem('databaseStudent');
    const data = await signOut({ redirect: true, callbackUrl: "/" });
  };

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
            <Link href="/aboutme" id={pathname === "/aboutme" ? styles.selected : ''}>{t("About Me")}</Link>
          </li>
          <li>
            <Link href="/price" id={pathname === "/price" ? styles.selected : ''}>{t("Price")}</Link>
          </li>
          <li>
            <Link href="/feedbacks" id={pathname === "/feedbacks" ? styles.selected : ''}>{t("Feedbacks")}</Link>
          </li>
          <li>
            <Link href="/courses" id={pathname === "/courses" ? styles.selected : ''}>{t("Free Courses")}</Link>
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
        {status === "authenticated" && session ? (<>
          <button className={styles.logOutButton} onClick={() => handleLogOut()}>Log&nbsp;out</button>
          <Link href="/account" className={styles.account} id={pathname === "/account" ? styles.selected : ''}>
            {session?.user?.image ?
              <Image width={36} height={36} src={session.user.image} alt="profile picture" />
              : <p>Profile</p>} </Link>
        </>
        ) : (
          <Link href="/access" id={pathname === "/access" ? styles.selected : ''} className={styles.access}>
            {t("Log In")}
          </Link>
        )}
      </div>
      <CurrencyList />
    </nav>
  );
};

export default NavBar;
