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
          content={"https://thinkthaithai-draft.netlify.app/1.png"}
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
      <main className={styles.main}>
        <div className={styles.courses}>
          <div>
            <h2>{t("Speaking & Listening")}</h2>
            <p>
              {t(
                "Simulate real life situations\nWatch Thai drama\nlearn your favourite songs\nand listen to podcasts"
              )}
            </p>
          </div>
          <div>
            <h2>{t("Reading & Writing")}</h2>
            <p>
              {t(
                "Thai alphabet and grammar\nLearn & practice Thai tones\nUse primary school books\nQuick daily exercises "
              )}
            </p>
          </div>
          <div>
            <h2>
              <span>{t("Gain the ")}</span>
              {t("Confidence")}
            </h2>
            <p>
              {t(
                "to engage in daily conversations,\nexplore Thai social media, chats, news and literature"
              )}
            </p>
          </div>
        </div>
        <div className={styles.teacher}>
          <div className={styles.video}>
            <h2>{t("My name is Natt")}</h2>
            <iframe
              src="https://drive.google.com/file/d/18T5UaTOLQulNkiT2GNw-hCTa8HxAeise/preview"
              width="274"
              height="205"
              loading="lazy"
            ></iframe>
          </div>
          <div className={styles.introduction}>
            <p>
              {t(
                "In my 5 years of experience,\nI have guided hundreds of students\nFrom beginners to advanced, on the path to ,"
              )}
              <span>{t("Success")}</span>
            </p>
            <p>
              {t(
                "Whether you’re learning Thai\nfor Business, Holidays, Family reasons,\nor you want to enjoy some Thai Drama.\nI will adapt my lessons to your goals and learning style. \nFind out more about Me\nAnd feel free to Contact Me if you have any questions"
              )}
            </p>
            {/* <Link href="/aboutme">{t("About Me")}</Link> */}
            {/* <p>{t("And feel free to")}</p>
            <button>{t("Contact Me")}</button>
            <p>{t("if you have any questions")}</p> */}
          </div>
        </div>
        <div className={styles.price}>
          <h2>{t("Start Learning Now!")}</h2>
          <div>
            <p>
              {t("The trial lesson is")}&nbsp;
              <span>{t("Only")}</span>
            </p>
            <Price />
          </div>
          <Link href="/price">{t("More About Pricing")}</Link>
          <div className={styles.underText}>
            <p>
              {t("Learning materials, homeworks and exercices always included")}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Contacts from "@/components/Contacts/Contacts";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "homepage"])),
      // Will be passed to the page component as props
    },
  };
}
