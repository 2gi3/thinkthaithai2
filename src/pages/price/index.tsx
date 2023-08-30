import styles from "./prices.module.scss";
import Price from "@/components/Currency/Price";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Calendar from "@/components/calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import Alert from "@/components/Alert/Alert";
import Contacts from "@/components/Contacts/Contacts";

export default function Prices() {
  const { t } = useTranslation("price");
  const router = useRouter();


  // const [{ isPending }] = usePayPalScriptReducer();can be used if the script provider wraps the _app
  const { data } = useSession();
  const student = data?.user;
  // console.log(student);
  const paidLessons = useSelector((state: RootState) => state.student.paidLessons);


  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [orderId, setOrderId] = useState<string>();
  const [product, setProduct] = useState<string | null>(null);
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false)

  const products: { [key: string]: number } = {
    "5 lessons": 109,
    "10 lessons": 209,
    "20 Lessons": 380,
  };

  const initialOptions = {
    "client-id": clientId!,
    currency: "USD",
  };

  const makePayment = async (product: string) => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          product,
          studentEmail: student?.email,
          studentName: student?.name,
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
  };


  return (
    <div className={styles.container}>
      <header>
        <h1>{t('Invest in Yourself')}</h1>
        <p>{t('50 minutes regular lessons')}</p>
        <p>{t('Personalised homeworks')}</p>
        <p>{t('and study material')}</p>
        <p>{t('are always included')}</p>
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
              <Price USD={5} />
            </div>
          </div>
        )}

        <div className={styles.mostPopular}>
          <h3> Try</h3>

          <button onClick={() => makePayment("5 lessons")}>
            5 {t('lessons')}
          </button>
          <Price USD={products["5 lessons"]} />
        </div>
        <div className={styles.mostPopular}>
          <h3>{t('Most Popular')}</h3>
          <button className={paidLessons === undefined ? 'secondaryButton' : "primaryButton"} onClick={() => makePayment("10 lessons")}>
            10 {t('lessons')}
          </button>
          <Price USD={products["10 lessons"]} />
        </div>
        <div className={styles.mostPopular}>
          <h3> Commit </h3>

          <button onClick={() => makePayment("20 Lessons")}>
            20 {t('lessons')}
          </button>
          <Price USD={products["20 Lessons"]} />
        </div>
        {/* {product && <div className={styles.paymentOptions}>
          <button onClick={() => setProduct(null)}><FaTimes /></button>
          <Price USD={products[product]} />
          <h4>Please contact me to buy some lessons</h4>
          <Contacts />

        </div>} */}
        {/* {product && (

          <Alert
            heading="Thank you for your purchase!"
            message={`${t('Your order ID is')}: ${product}`}
            onClose={() => {
              setOrderCompleted(false);
              router.push('/account');
            }}
          />

        )} */}
      </main>
    </div>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "price"])),
    },
  };
}