import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "./prices.module.scss";
import Price from "@/components/Currency/Price";
import Calendar from "@/components/calendar";
import Alert from "@/components/Alert/Alert";
import { FaTimes } from "react-icons/fa";
import Head from "next/head";


export default function Prices() {
  const { t } = useTranslation("price");
  const router = useRouter();


  const { data } = useSession();
  const student = useSelector(
    (state: RootState) => state.student
  );
  const paidLessons = student.paidLessons


  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [warningOn, setWarningOn] = useState<boolean>(false)
  const [displaySafetyInfo, setDisplaySafetyInfo] = useState<boolean>(false)

  const products: { [key: string]: number } = {
    "5 lessons": 109,
    "10 lessons": 209,
    "20 Lessons": 380,
  };

  const makePayment = async (product: string) => {
    // alert('Card payments are momentarely unavailable, please contact the teacher for more informations and alternative payment methods')
    if (!data) {
      setWarningOn(true)

    } else {
      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            product,
            studentEmail: student?.email,
            studentID: student._id
          }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || "Payment failed");
        }

        const { url } = await response.json();
        console.log(`The response from the API is: ${url}`)
        router.push(url);
      } catch (error) {
        console.error("Payment error:", error);
      } finally {
      }
    }
  };


  return (
    <>
      <Head>
        <title>Thai language course prices</title>
        <meta name="google-site-verification" content="Gsh6SUTRHzoVK6K6CHNPp2eNiowwXRXE5zR14fimbGo" />
        <meta name="description" content="With free courses and tailored study material, you get so much more than just a simple private lesson" />
        <meta property="og:url" content="https://www.thikthaithai.com/price" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The best value for your money!" />
        <meta property="og:description" content="Guiding you through every step of your learning journey" />
        <meta property="og:image" content={"https://thinkthaithai.com/1.png"} />
        <link rel="icon" href="/logo.webp" />
      </Head>

      <div className={styles.container}>
        <header>
          <h1>{t('Invest in Yourself')}</h1>
          <p>{t('50 minutes regular lessons')} {t('Personalised homeworks')}</p>
          {/* <p>{t('Personalised homeworks')}</p> */}
          <p>{t('and study material')} {t('are always included')}</p>
          {/* <p>{t('are always included')}</p> */}
        </header>

        <main>
          {paidLessons === undefined && (
            <div className={styles.trialContainer}>
              <div className={styles.mostPopular}>
                <h3>No Commitment</h3>
                <Calendar
                  className="primaryButton"
                  email={student?.email || ''}
                  name={student?.name || ''} label={('Trial Lesson')}
                  eventURL='https://calendly.com/thinkthaithai/trial-lesson?hide_event_type_details=1'
                />
                <p>{t("Only")}</p>
                {/* <Price USD={5} /> */}
              </div>
            </div>
          )}

          <div className={styles.mostPopular}>
            <h3>Try</h3>

            <button
              style={{ border: 'none' }}
              className='secondaryButton'
              onClick={() => makePayment("5 lessons")}>
              5 {t('lessons')}
            </button>
            <Price USD={products["5 lessons"]} />
          </div>
          <div className={styles.mostPopular}>
            <h3>{t('Most Popular')}</h3>
            <button
              style={{ border: 'none' }}
              className={paidLessons === undefined ? 'secondaryButton' : "primaryButton"}
              onClick={() => makePayment("10 lessons")}
            >
              10 {t('lessons')}
            </button>
            <Price USD={products["10 lessons"]} />
          </div>
          <div className={styles.mostPopular}>
            <h3>Commit</h3>

            <button
              style={{ border: 'none' }}
              className='secondaryButton'
              onClick={() => makePayment("20 Lessons")}>
              20 {t('lessons')}
            </button>
            <Price USD={products["20 Lessons"]} />
          </div>

          {warningOn && (

            <Alert
              heading="Please Log In first"
              message={`It takes a few seconds and it's free`}
              onClose={() => {
                setWarningOn(false);
                router.push('/access');
              }}
            />

          )}
        </main>

        <div className={styles.safetyInfo}>
          {!displaySafetyInfo && <button className="secondaryButton"
            onClick={() => setDisplaySafetyInfo(!displaySafetyInfo)}
          >
            Learn about Payment Safety
          </button>}
          {displaySafetyInfo && (
            <div className={styles.safetyInfoBody}>
              <button onClick={() => setDisplaySafetyInfo(!displaySafetyInfo)} className={styles.toggle}> <FaTimes /></button>
              <h3>When you click &apos;Buy&apos;</h3>
              <p>You&apos;ll be taken to a secure website with this link: <span>https://checkout.stripe.com/your-order-ID</span></p>
              <p>On this website, a company called &apos;Stripe&apos; helps you make the payment, and then they send the money to us.</p>
              <a href='https://stripe.com' target='_blank' className={styles.stripeLink}>Learn more about Stripe</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "price"])),
    },
  };
}