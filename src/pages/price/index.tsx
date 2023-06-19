import styles from "./prices.module.scss";
import Price from "@/components/Currency/Price";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import Calendar from "@/components/calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Prices() {
  const { t } = useTranslation("price");

  // const [{ isPending }] = usePayPalScriptReducer();can be used if the script provider wraps the _app
  const { data } = useSession();
  const student = data?.user;
  console.log(student);
  const paidLessons = useSelector((state: RootState) => state.student.paidLessons);


  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [orderId, setOrderId] = useState<string>();
  const [product, setProduct] = useState<string | null>(null);

  const products = {
    "5 lessons": 109,
    "10 lessons": 209,
    "20 Lessons": 380,
  };

  const initialOptions = {
    "client-id": clientId!,
    currency: "USD",
  };

  const onApprove = async (data: any, actions: any) => {
    // When the order is created in the server with the status of CREATED and the order ID is returned by the createOrder prop in the PaypalButtons,
    // this function takes the order id and approves the order automatically, then sends the order details to the server to update the database
    try {
      const details = await actions.order.capture();
      setOrderId(details.id);
      fetch("/api/payment", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          orderId: details.id,
          studentEmail: student?.email,
          studentName: student?.name,
        }),
      });
      console.log("onApprove details:" + JSON.stringify(details));
      // alert("Transaction completed by " + details.payer.name.given_name + "!");
    } catch (error) {
      console.log(error);
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
        {/* <button onClick={() => console.log("hello world")}>
          Trial lesson <Price USD={5} />
        </button> */}
        {paidLessons === undefined && (
          <div className={styles.trial}>
            <Calendar label={('Trial Lesson')} eventURL='https://calendly.com/thinkthaithai/trial-lesson?hide_event_type_details=1' />
          </div>
        )}



        <button onClick={() => setProduct("5 lessons")}>
          5 {t('lessons')} <Price USD={products["5 lessons"]} />
        </button>
        <div className={styles.mostPopular}>
          <h3>{t('Most Popular')}</h3>
          <button onClick={() => setProduct("10 lessons")}>
            10 {t('lessons')}
          </button>
          <Price USD={products["10 lessons"]} />
        </div>

        <button onClick={() => setProduct("20 Lessons")}>
          20 {t('lessons')} <Price USD={products["20 Lessons"]} />
        </button>
        <PayPalScriptProvider options={initialOptions}>
          {product && (
            <div key={product}>
              <PayPalButtons
                createOrder={async () => {
                  // The order is created in the server for safety reasons
                  const response = await fetch("/api/payment", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify({
                      product,
                    }),
                  });
                  const { id: orderId } = await response.json();
                  setOrderId(orderId);
                  return orderId;
                }}
                onApprove={onApprove}
              />
            </div>
          )}
        </PayPalScriptProvider>
        {orderId && (
          <div>
            <h2>{t('Thank you for your purchase!')}</h2>
            <p>{t('Your order ID is')}: {orderId}</p>
          </div>
        )}
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