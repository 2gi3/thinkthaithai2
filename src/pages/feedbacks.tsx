import Feedback from "@/components/feedback";
import { DatabaseFeedback } from "@/types";
import styles from '@/styles/feedbacks.module.scss'
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";




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
      ...(await serverSideTranslations(locale, ["common", "homepage"])),
      feedbacks: feedbacks,
    },
    revalidate: 60,
  };
};
export default function About({ feedbacks }: { feedbacks: DatabaseFeedback[] }) {
  const { t } = useTranslation("common");

  return (
    <>
      <header className={styles.header}>
        <h1>{t('What My Students Say')}</h1>
      </header>
      <main className={styles.main}>
        {feedbacks.map((feedback: DatabaseFeedback, index: number) => {
          return (
            <Feedback feedback={feedback} key={`${index}`} />
          )
        })}
      </main>
    </>
  );
}

