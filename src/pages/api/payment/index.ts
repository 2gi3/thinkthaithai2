import { handleOptions } from "@/functions/back-end";
import { NextApiRequest, NextApiResponse } from "next";
import {getSession} from 'next-auth/react'
// @ts-ignore
import clientPromise from "../../../../mongoDB/clientPromise";

const paypal = require('@paypal/checkout-server-sdk')

interface Products {
  [key: string]: number;
}

const products: Products = {
  '5 lessons': 109,
  '10 lessons': 209,
  '20 Lessons': 380
}
  const client_id= process.env.PAYPAL_CLIENT_ID!
  const client_secret= process.env.PAYPAL_CLIENT_SECRET!
const Environment = 
process.env.NODE_ENV === 'production'
? paypal.core.LiveEnvironment
: paypal.core.SandboxEnvironment
const paypalClient =new paypal.core.PayPalHttpClient( new Environment(
  client_id,
  client_secret
))

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const session = await getSession({req})

   if(req.method === 'OPTIONS'){
       handleOptions(res)
     } else if(req.method === "POST") {
      //This receives the product from the client, uses the product name to create a paypal order with the status of created, 
      // and sends the order ID to the client for confirmation ( the client will automatically confirm and then do a patch request to this endpoint)


      const price = products[req.body.product]      
      const request = new paypal.orders.OrdersCreateRequest()    
      request.prefer('return=representation')
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount:{
              currency_code: 'USD',
              value: price,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: price
                }
              }
            },
            items: [
              {
                name: req.body.product,
                unit_amount: {
                  currency_code: 'USD',
                  value: price.toString()
                },
                quantity: '1'
              }
            ],
            quantity: 1
          }
        ]

      })


      try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Content-Type", "application/json");
        const order =await paypalClient.execute(request)
        res.status(200).json({id: order.result.id})


      }catch (e:any) {
        console.log(e)
        res.status(500).json({error: e.message})
      }
    } else if(req.method === "PATCH"){
      // This receives the order ID from the client, checks with paypal that the order has been approved and paid,
      //then updates the number of lessons left in the student's account in the database.
      
      const request = new paypal.orders.OrdersGetRequest(req.body.orderId);
      const response = await paypalClient.execute(request);
      // const payment = {
      //   studentName: req.body.studentName,
      //   studentEmail: req.body.studentEmail,
      //   transactionID: response.result.id,
      //   paymentEmail: response.result.payment_source.paypal.email_address,
      //   paymentName: response.result.payment_source.paypal.name.given_name,
      //   paymentSurname: response.result.payment_source.paypal.name.surname,
      //   amountPaid: response.result.purchase_units[0].amount.value,
      //   currency: response.result.purchase_units[0].amount.currency_code,
      //   dateOfPurchase: response.result.create_time,
      // }
      // @ts-ignore
      const client= await clientPromise;
      const db = client.db();
     const student = await db.collection("users").findOne({ email: req.body.studentEmail });
  
  if (student) {
    const amountPaid = Number(response.result.purchase_units[0].amount.value)
    const addedLessons = amountPaid === 109.00 ? 5 : 
                     amountPaid === 209.00 ? 10 : 
                     amountPaid === 380.00 ? 20 : 0;


    const paidLessons = student.paidLessons || 0;
    console.log( amountPaid)
    console.log( addedLessons)
    const totalLessons = paidLessons + addedLessons
    await db.collection("users").updateOne({ _id: student._id }, { $set: { paidLessons: totalLessons } });

    res.status(200).json({ message: "Payment successful." });
  } else {
    res.status(404).json({ message: "User not found." });
  }

    }


  }


