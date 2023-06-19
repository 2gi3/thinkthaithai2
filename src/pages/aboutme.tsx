import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/aboutMe.module.scss'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function About() {
  const { t } = useTranslation("aboutme");
  const { locale } = useRouter();


  return (
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
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "aboutme"])),
    },
  };
}