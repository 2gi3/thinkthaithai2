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
        <meta name="description" content="Learn thai test" />
        {/* <meta property="og:image" content="/1.png" /> */}
        <meta property="og:url" content="https://www.thikthaithai.com/" />
        <meta property="og:type" content="website" />

        <meta property="og:title" content="Achieve Your Thai Language Goals!" />

        <meta
          property="og:description"
          content="Teaching and guiding you through every step of your learning journey"
        />

        <meta
          property="og:image"
          content={"https://www.thikthaithai.com/1.png"}
        />

        <link rel="icon" href="/logo.webp" />
      </Head>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>{t("title")}</h1>
          <ul>
            {t("Learn Thai Language With")}
            <li>{t("Customised Lessons")}</li>
            <li>{t("Study material")}</li>
            <li>{t("& Homeworks")}</li>
          </ul>
          <div>
            <button>{t("Start Now")}</button>
            <div className={styles.underText}>
              <p>
                {t("The trial lesson is")}&nbsp;
                <span>{t("Only")}</span>
              </p>
              <Price />
            </div>
          </div>
        </div>
        <picture>
          <source
            media="(max-width: 568px)"
            srcSet="/fullMobile.webp 568w"
            sizes="100vw"
          />
          <source srcSet="/heroNoBG.webp 1280w" sizes="1280px" />
          <img loading="eager" src="/heroNoBG.webp" />
        </picture>
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
