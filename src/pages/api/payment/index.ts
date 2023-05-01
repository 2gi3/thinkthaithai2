import { NextApiRequest, NextApiResponse } from "next";
import paypal from "paypal-rest-sdk";

interface Products {
  [key: string]: number;
}

const products: Products = {
  '5 lessons': 109,
  '10 lessons': 209,
  '20 Lessons': 380
}

interface PaymentRequest {
  product: string;
}

// Configure the PayPal SDK
paypal.configure({
  mode: "sandbox", // Change to "live" for production
  client_id: process.env.PAYPAL_CLIENT_ID!,
  client_secret: process.env.PAYPAL_CLIENT_SECRET!,
});

// API endpoint handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Get the payment details from the client
      const { product }: PaymentRequest = req.body;
      const price = products[product];



      // Create the PayPal payment request
      const createPaymentJson = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:3000/success",
          cancel_url: "http://localhost:3000/cancel",
        },
        transactions: [
          {
            amount: {
              total: price.toString(),
              currency: "USD",
            },
            description: "Lesson Payment",
          },
        ],
      };

      // Send the payment request to PayPal
      const response = await new Promise((resolve, reject) => {
        paypal.payment.create(createPaymentJson, (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        });
      });

      // Return the payment ID to the client
      // @ts-ignore
      res.status(200).json({ paymentId: response.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
