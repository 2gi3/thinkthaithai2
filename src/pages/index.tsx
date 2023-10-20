import React, { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { FaArrowRight } from "react-icons/fa";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Price from "@/components/Currency/Price";
import Contacts from "@/components/Contacts/Contacts";
import Feedback from "@/components/feedback";
import { DatabaseFeedback } from "@/types";
import FeedbackCard from "@/components/feedback/feedbackCard";





export default function Home({ feedbacks }: { feedbacks: DatabaseFeedback[] }) {
  const { t } = useTranslation("homepage");
  const [showContacts, setShowContacts] = useState(false);


  return (
    <>
      <Head>
        <title>ThinkThaiThai</title>
        <meta name="google-site-verification" content="Gsh6SUTRHzoVK6K6CHNPp2eNiowwXRXE5zR14fimbGo" />
        <meta name="description" content="Learn Thai language with free courses and one-on-one lessons" />
        <meta property="og:url" content="https://www.thikthaithai.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Achieve Your Thai Language Goals!" />
        <meta property="og:description" content="Guiding you through every step of your learning journey" />
        <meta property="og:image" content={"https://thinkthaithai.com/1.png"} />
        <link rel="icon" href="/logo.webp" />
      </Head>

      <header className={styles.header}>
        <div className={styles.title}>
          <h1>{t("Reach Your Goals!")}</h1>
          <p>{t("Learn Thai Language With")} {t("Customised Lessons")}, {t("Study material")} {t("& Homeworks")}</p>
          <div className={styles.CTA}>
            <Link href="/price">{t("Start Now")}</Link>
            <div className={styles.underText}>
              <p>
                {t("The trial lesson is")}&nbsp;
                <span>{t("Only")}</span>
              </p>
              {/* <Price USD={5} /> */}
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
          <img loading="eager" src="/heroNoBG.webp" alt="Teacher" />
        </picture>
      </header>

      <main className={styles.main}>
        <section className={styles.courses}>
          <div className={styles.course}>
            <div className={styles.imageContainer}>
              <Image src="/conversation.jpg"
                width={320}
                height={320}
                alt="A tourist asking for directions"
              />
            </div>
            <div className={styles.bodyContainer}>
              <h2>{t("Speaking & Listening")}</h2>
              <p>
                {t(
                  "Simulate real life situations\nWatch Thai drama\nlearn your favourite songs\nand listen to podcasts"
                )}
              </p>
            </div>
          </div>
          <div className={styles.course}>
            <div className={styles.imageContainer}>
              <Image src="/studying.jpg"
                width={320}
                height={320}
                alt="A tourist asking for directions"
              />
            </div>
            <div className={styles.bodyContainer}>
              <h2>{t("Reading & Writing")}</h2>
              <p>
                {t(
                  "Thai alphabet and grammar\nLearn & practice Thai tones\nUse primary school books\nQuick daily exercises "
                )}
              </p>
            </div>
          </div>
          <div className={styles.course}>
            <div className={styles.imageContainer}>
              <Image className={styles.beach} src="/videocall.jpg"
                width={320}
                height={320}
                alt="A tourist asking for directions"
              />
            </div>
            <div className={styles.bodyContainer}>
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
        </section>
        <h2 className={styles.teacherHeader}>{t("My name is Natt")}</h2>

        <section className={styles.teacher}>
          <div className={styles.video}>
            <iframe
              src="https://drive.google.com/file/d/18T5UaTOLQulNkiT2GNw-hCTa8HxAeise/preview"
              width="274"
              height="205"
              loading="lazy"
              title="Teacher introduction"
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
                "Whether you’re learning Thai\nfor Business, Holidays, Family reasons,\nor you want to enjoy some Thai Drama.\nI will adapt my lessons to your goals and learning style. \nFind out more"
              )}
              <Link href="/aboutme">{t("About Me")}</Link>
            </p>
            <div>
              {t("And feel free to")}{" "}
              <button
                onClick={() => setShowContacts(!showContacts)}
                className={styles.contactsToggle}
              >
                {t("Contact Me")}
              </button>
            </div>
            <p>{t("if you have any questions")}</p>
            {showContacts ? (
              <div className={styles.homepageContacts}>
                <button onClick={() => setShowContacts(!showContacts)}>
                  X
                </button>
                <Contacts />
              </div>
            ) : (
              <></>
            )}
          </div>
        </section>
        {/* <div className={styles.feedbacksContainer}> */}
        <section className={styles.feedbacks}>
          <h2 className={styles.teacherHeader}>{t("My students say")}</h2>

          {feedbacks.map((feedback: DatabaseFeedback, index: number) => {
            return (
              index < 3 && <FeedbackCard feedback={feedback} key={`${index}`} />
            )
          })}
          <Link href='/feedbacks'> <p>{t("all feedbacks")} <FaArrowRight /></p></Link>

        </section>
        {/* </div> */}
        <section className={styles.price}>
          <h2>{t("Start Learning Now!")}</h2>
          <div>
            <p>
              {t("The trial lesson is")}&nbsp;
              <span>{t("Only")}</span>
            </p>
            <Price USD={5} />
          </div>
          <Link href="/price">{t("More About Pricing")}</Link>
          <div className={styles.underText}>
            <p>
              {t("Learning materials, homeworks and exercices always included")}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}



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
    // revalidate: 60,
  };
};