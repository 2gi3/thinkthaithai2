import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Image from "next/image";
import styles from '@/styles/aboutMe.module.scss';


export default function About() {
  const { t } = useTranslation("aboutme");


  return (
    <>
      <Head>
        <title>ThinkThaiThai</title>
        <meta name="google-site-verification" content="Gsh6SUTRHzoVK6K6CHNPp2eNiowwXRXE5zR14fimbGo" />
        <meta name="description" content="Learn more about teacher Nat and her teaching style" />
        <meta property="og:url" content="https://www.thikthaithai.com/aboutme" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="A private thai language tutor that offers free courses and tailored learning material" />
        <meta property="og:description" content="Guiding you through every step of your learning journey" />
        <meta property="og:image" content={"https://thinkthaithai.com/1.png"} />
        <link rel="icon" href="/logo.webp" />
      </Head>

      <div className={styles.container}>
        <header>
          <div>
            <h2>{t("I'm Natt")}</h2>
            <p>{t("Here to guide you")}</p>
            <h1>{t("Every Step of The Way!")}</h1>
            <p>{t("I have always been passionate...")}
            </p>
          </div>
          <div>
            <Image src='/aboutMe1.webp' alt="Teacher Natt" width={320} height={320} />
          </div>
        </header>

        <main>
          <div>
            <Image src='/aboutMe2.webp' alt="Teacher Natt" width={320} height={320} />
          </div>
          <div>
            <p>{t("I have experience working with students...")}</p>
            <p>{t("My goal is to help...")}</p>
            <p>{t("In my free time...")}</p>
            <p>{t("Thank you for taking the time...")}</p>
          </div>
        </main>

        <div className={styles.CTA}>
          <p>{t("Don't take my word for it!")}</p>
          <Link href='/feedbacks'> {t("See what my students say about me")}</Link>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "aboutme"])),
    },
  };
}