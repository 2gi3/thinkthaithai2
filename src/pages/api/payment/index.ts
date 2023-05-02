import { handleOptions } from "@/functions/back-end";
import { NextApiRequest, NextApiResponse } from "next";
// import paypal from "paypal-rest-sdk";
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
     if(req.method === 'OPTIONS'){
       handleOptions(res)
     } else if(req.method === "POST") {
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
        console.log(order.result.id)
        res.status(200).json({id: order.result.id})


      }catch (e:any) {
        console.log(e)
        res.status(500).json({error: e.message})
      }
    }


  }




























// interface PaymentRequest {
//   product: string;
// }

// // Configure the PayPal SDK
// paypal.configure({
//   mode: "sandbox", // Change to "live" for production
//   client_id: process.env.PAYPAL_CLIENT_ID!,
//   client_secret: process.env.PAYPAL_CLIENT_SECRET!,
// });

// // API endpoint handler
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       // Get the payment details from the client
//       const { product }: PaymentRequest = req.body;
//       const price = products[product];



//       // Create the PayPal payment request
//       const createPaymentJson = {
//         intent: "sale",
//         payer: {
//           payment_method: "paypal",
//         },
//         redirect_urls: {
//           return_url: "http://localhost:3000/success",
//           cancel_url: "http://localhost:3000/cancel",
//         },
//         transactions: [
//           {
//             amount: {
//               total: price.toString(),
//               currency: "USD",
//             },
//             description: "Lesson Payment",
//           },
//         ],
//       };

//       // Send the payment request to PayPal
//       const response = await new Promise((resolve, reject) => {
//         paypal.payment.create(createPaymentJson, (error, payment) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(payment);
//           }
//         });
//       });

//       // Return the payment ID to the client
//       // @ts-ignore
//       res.status(200).json({ paymentId: response.id });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
