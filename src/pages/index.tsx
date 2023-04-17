import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Price from "@/components/Currency/Price";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer>
      <p>{t("about me")}</p>
    </footer>
  );
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <main className={styles.main}>
        <div>
          <Footer />
          <h1>{locale}</h1>
        </div>
        <Price />
      </main>
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
