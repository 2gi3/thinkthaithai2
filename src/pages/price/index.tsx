import styles from "./prices.module.scss";
import Price from "@/components/Currency/Price";
import Link from "next/link";
import { useEffect, useState } from "react";
import paypal from "paypal-rest-sdk";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// 5lessons: 109USD,
// 10 lessons: 209USD,
// 20 Lessons: 380USD

export default function Prices() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const [amount, setAmount] = useState<number>();
  const [orderId, setOrderId] = useState<string>();

  const initialOptions = {
    "client-id": clientId!,
    currency: "USD",
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      setOrderId(details.id);
      alert("Transaction completed by " + details.payer.name.given_name + "!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Invest in Yourself</h1>
        <p>Regular lessons are 50 minutes</p>
        <p> Personalised homeworks and study material are always included</p>
      </header>
      <main>
        <button>
          Trial lesson <Price USD={5} />{" "}
        </button>
        <button onClick={() => setAmount(109)}>
          5 lessons <Price USD={109} />{" "}
        </button>
        <button onClick={() => setAmount(209)}>
          10 lessons <Price USD={209} />{" "}
        </button>
        <button onClick={() => setAmount(380)}>
          20 lessons <Price USD={380} />{" "}
        </button>
        <PayPalScriptProvider options={initialOptions}>
          {amount && (
            <div key={amount}>
              <PayPalButtons
                createOrder={(data: any, actions: any) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: `${amount}`,
                        },
                      },
                    ],
                  });
                }}
                onApprove={onApprove}
              />
            </div>
          )}
        </PayPalScriptProvider>
        {orderId && (
          <div>
            <h2>Thank you for your purchase!</h2>
            <p>Your order ID is: {orderId}</p>
          </div>
        )}
      </main>
    </div>
  );
}
