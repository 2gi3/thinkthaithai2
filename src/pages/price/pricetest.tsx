import styles from "./prices.module.scss";
import Price from "@/components/Currency/Price";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";

const products = {
  "5 lessons": 109,
  "10 lessons": 209,
  "20 Lessons": 380,
};

type OrderData = {
  amount: {
    value: string;
    currency_code: string;
  };
  description: string;
};

type PaymentData = {
  intent: "CAPTURE";
  payer: {
    name: {
      given_name: string;
    };
    email_address: string;
  };
  purchase_units: {
    amount: {
      value: string;
      currency_code: string;
    };
    description: string;
  }[];
};

type CapturedPaymentData = {
  id: string;
  amount: {
    value: string;
    currency_code: string;
  };
  status: string;
  payer: {
    name: {
      given_name: string;
    };
  };
};
export default function PriceTest() {
  const [amount, setAmount] = useState<number | undefined>();
  const [product, setProduct] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const initialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    components: "buttons",
    disableFunding: [FUNDING.CREDIT],
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const order = await actions.order.capture();
      const capturedPaymentData = await capturePayment(
        order.id,
        order.purchase_units[0].amount.value,
        order.purchase_units[0].description
      );
      setOrderId(capturedPaymentData.id);
      alert(
        "Transaction completed by " +
          capturedPaymentData.payer.name.given_name +
          "!"
      );
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "An error occurred while processing the payment. Please try again."
      );
    }
  };

  const capturePayment = async (
    orderId: string,
    amount: string,
    description: string
  ) => {
    const paymentData: PaymentData = {
      intent: "CAPTURE",
      payer: {
        name: {
          given_name: "Test",
        },
        email_address: "test@example.com",
      },
      purchase_units: [
        {
          amount: {
            value: amount,
            currency_code: "USD",
          },
          description: description,
        },
      ],
    };
    try {
      const response = await fetch("/api/paypal/capture-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          paymentData: paymentData,
        }),
      });
      const data = await response.json();
      return data as CapturedPaymentData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <div className={styles.container}>
      <header>
        <h1>Price Test</h1>
        <p>Regular lessons are 50 minutes</p>
        <p>Personalised homeworks and study material are always included</p>
      </header>
      <main>
        <button onClick={() => console.log("hello world")}>
          Trial lesson <Price USD={5} />
        </button>
        <button onClick={() => setProduct("5 lessons")}>
          5 lessons <Price USD={products["5 lessons"]} />
        </button>
        <button onClick={() => setProduct("10 lessons")}>
          10 lessons <Price USD={products["10 lessons"]} />
        </button>
        <button onClick={() => setProduct("20 Lessons")}>
          20 lessons <Price USD={products["20 Lessons"]} />
        </button>
      </main>
      {product && (
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            createOrder={() => {
              return fetch("/api/payment", {
                method: "POST",
                headers: {
                  "content-type": "application-json",
                },
                body: JSON.stringify({
                  product,
                }),
              }).then((res: any) => {
                if (res.ok) return res;
                return res
                  .json()
                  .then((json: any) => Promise.reject(json))
                  .then(({ id }: any) => {
                    return id;
                  })
                  .catch((e: any) => console.error(e.error));
              });
            }}
            onApprove={onApprove}
            onError={() =>
              setErrorMessage(
                "An error occurred while loading the PayPal button. Please refresh the page and try again."
              )
            }
            style={{ color: "blue", shape: "rect" }}
          />
        </PayPalScriptProvider>
      )}
      {orderId && (
        <div>
          <h2>Thank you for your purchase!</h2>
          <p>Your order ID is: {orderId}</p>
        </div>
      )}
    </div>
  );
}
