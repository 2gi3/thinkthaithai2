import Image from "next/image";
import Contacts from "../Contacts/Contacts";
import { useTranslation } from "next-i18next";
import styles from "./Footer.module.scss";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className={styles.footer}>
      <div className={styles.contactsContainer}>
        <Contacts />
      </div>
      <a href='https://github.com/2gi3' target="blank" className={styles.credits}>
        <div className={styles.image}>
          <Image
            alt="Giuseppe Ippolito"
            src="/popOutProfile2.webp"
            width={104}
            height={119}
          />
        </div>
        <div className={styles.info}>
          <p>{t("Website by")}</p>
          <h3>{t("Giuseppe Ippolito")}</h3>
          <p >
            © 2023 All rights reserved
          </p>
          {/* <p>{t("Web-Developer")}</p>
          <p>{t("London")}</p> */}
        </div>
      </a>

    </footer>
  );
};

export default Footer;
