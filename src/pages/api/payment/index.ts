import { handleOptions, isAdmin } from "@/functions/back-end";
import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import clientPromise from "../../../../mongoDB/clientPromise";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from 'mongodb';




interface Products {
  [key: string]: number;
}

const products: Products = {
  '5 lessons': 109,
  '10 lessons': 209,
  '20 Lessons': 380
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

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
        customer_email: req.body.studentEmail,
        client_reference_id: req.body.studentID,
      })

      res.status(200).json({ url: payment.url })



    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  } else if (req.method === "GET") {
    // Get one payments by email: /api/payment?searchBy=email&value=<EMAIL>
    // Get one payments by id: /api/payment?searchBy=id&value=<ID>
    // Get all payments: /api/payment
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (!session) {
      return res.status(401).json({
        "error": "Unauthorized",
        "message": "Access denied. Please provide valid credentials."
      }
      );
    } else {
      try {
        const { searchBy, value } = req.query;
        console.log(searchBy)
        console.log(value)
        let payments
        //@ts-ignore
        const client = await clientPromise;
        const db = client.db();

        if (searchBy && value) {

          if (searchBy === 'email') {
            payments = await db.collection('payments').find({ "studentEmail": value }).toArray();
          } else if (searchBy === 'id') {
            const studentIdAsObjectId = new ObjectId(value as string)
            payments = await db.collection('payments').find({ "studentId": studentIdAsObjectId }).toArray();
          } else {
            res.status(401).json({ message: 'Invalid searchBy parameter or authorization' });

          }

        } else if (await isAdmin(req, res)) {
          payments = await db.collection('payments').find().toArray();
        } else {
          payments = null
        }
        if (payments) {
          res.status(200).json({ payments });
        }
        else {
          res.status(401).json({ message: 'Invalid  authorization' });

        }

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving paypents' });
      }
    }


  }


}


