import Feedback from "@/components/feedback";
import { DatabaseFeedback } from "@/types";
import styles from '@/styles/feedbacks.module.scss'
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Head from "next/head";




// export const getStaticProps = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/feedbacks`, {
//     method: "GET",
//   });
//   const feedbacks: DatabaseFeedback[] = await res.json();

//   return { props: { feedbacks }, revalidate: 60 };
// };

export const getStaticProps = async ({ locale }: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/feedbacks`, {
    method: "GET",
  });
  const feedbacks: DatabaseFeedback[] = await res.json();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      feedbacks: feedbacks,
    },
    // revalidate: 60,
  };
};
export default function About({ feedbacks }: { feedbacks: DatabaseFeedback[] }) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>ThinkThaiThai</title>
        <meta name="google-site-verification" content="Gsh6SUTRHzoVK6K6CHNPp2eNiowwXRXE5zR14fimbGo" />
        <meta name="description" content="Thai language student's opinion of Teacher Nat's classes" />
        <meta property="og:url" content="https://www.thikthaithai.com/feedbacks" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Don't take my word for it!" />
        <meta property="og:description" content="Guiding you through every step of your learning journey" />
        <meta property="og:image" content={"https://thinkthaithai.com/1.png"} />
        <link rel="icon" href="/logo.webp" />
      </Head>

      <header className={styles.header}>
        <h1>{t('What My Students Say')}</h1>
      </header>

      <main className={styles.main}>
        {feedbacks.map((feedback: DatabaseFeedback, index: number) => {
          return (
            <Feedback feedback={feedback} key={`${index}`} />
          )
        })}
        <div className={styles.CTA}>
          <Link href="/courses">Start a FREE course now</Link>
        </div>
      </main>
    </>
  );
}

