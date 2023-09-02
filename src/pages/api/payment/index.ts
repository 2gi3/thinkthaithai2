import { handleOptions } from "@/functions/back-end";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react'
// @ts-ignore
import clientPromise from "../../../../mongoDB/clientPromise";
import Stripe from "stripe";



interface Products {
  [key: string]: number;
}

const products: Products = {
  '5 lessons': 1,
  '10 lessons': 209,
  '20 Lessons': 380
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getSession({ req })

  if (req.method === 'OPTIONS') {
    handleOptions(res)
  } else if (req.method === "POST") {
    //This receives the product from the client, uses the product name to create a paypal order with the status of created, 
    // and sends the order ID to the client for confirmation ( the client will automatically confirm and then do a patch request to this endpoint)


    const priceInCents = products[req.body.product] * 100;


    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Content-Type", "application/json");

      const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
        apiVersion: "2023-08-16",
        // appInfo: { // For sample support and debugging, not required for production:
        //   name: "stripe-samples/accept-a-payment",
        //   url: `${process.env.NEXT_PUBLIC_BASIC_URL}/payment`,
        //   version: "0.0.2",
        // },
        typescript: true,
      });

      const payment = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'USD',
            product_data: {
              name: req.body.product,
            },
            unit_amount: priceInCents
          },
          quantity: 1
        }],
        success_url: `${process.env.NEXT_PUBLIC_BASIC_URL}/account`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASIC_URL}/cancelled-payment`,
        customer_email: req.body.email,
        client_reference_id: req.body.name,
      })

      res.status(200).json({ url: payment.url })



    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  }


}


