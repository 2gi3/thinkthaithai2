import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Price from "@/components/Currency/Price";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t } = useTranslation("homepage");
  const { locale } = useRouter();
  const currency = useSelector((state: RootState) => state.currency.value);

  return (
    <>
      <Head>
        <title>ThinkThaiThai</title>
        <meta name="description" content="Achieve your Thai language Goals!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div>
          <h1>{t("title")}</h1>
          <ul>
            {t("Learn Thai Language With")}
            <li>{t("Customised Lessons")}</li>
            <li>{t("Study material")}</li>
            <li>{t("& Homeworks")}</li>
          </ul>
          <div>
            <button>{t("Start Now")}</button>
            <p>
              {t("The trial lesson is")}&nbsp;
              <span>{t("Only")}</span>
            </p>
            <Price />
          </div>
        </div>
      </header>
      <main className={styles.main}></main>
    </>
  );
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "homepage"])),
      // Will be passed to the page component as props
    },
  };
}
