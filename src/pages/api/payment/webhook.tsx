import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import stripe from '../../../utils/stripe';
import { CheckoutSession } from '@/types';
import clientPromise from "../../../../mongoDB/clientPromise";



// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET!;

export const config = {
    api: {
        bodyParser: false,
    },
};

const rawBodyBuffer = (req: NextApiRequest) => {
    return new Promise<Buffer>((resolve, reject) => {
        let buffer: Buffer[] = [];
        req.on('data', (chunk) => {
            buffer.push(chunk);
        });
        req.on('end', () => {
            resolve(Buffer.concat(buffer));
        });
        req.on('error', (error) => {
            reject(error);
        });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const sig = req.headers['stripe-signature'] as string;
    const body = await rawBodyBuffer(req);
    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    switch (event.type) {
        case 'checkout.session.async_payment_failed':
            const checkoutSessionAsyncPaymentFailed = event.data.object;
            console.log({ checkoutSessionAsyncPaymentFailed: checkoutSessionAsyncPaymentFailed })
            break;

        case 'checkout.session.async_payment_succeeded':
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            console.log({ checkoutSessionAsyncPaymentSucceeded: checkoutSessionAsyncPaymentSucceeded })
            break;

        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object as CheckoutSession;
            const studentIdAsObjectId = new ObjectId(checkoutSessionCompleted.client_reference_id);
            const successfulPayment = {
                paymentId: checkoutSessionCompleted.id,
                paymentStatus: checkoutSessionCompleted.payment_status,
                payeeName: checkoutSessionCompleted.customer_details.name,
                payeeEmail: checkoutSessionCompleted.customer_details.email,
                studentEmail: checkoutSessionCompleted.customer_email,
                studentId: studentIdAsObjectId,
                amountPaid: checkoutSessionCompleted.amount_total / 100,
                currency: checkoutSessionCompleted.currency,
                dateOfPurchase: new Date(checkoutSessionCompleted.created * 1000),
            };

            const client = await clientPromise;
            const db = client.db();
            db.collection('payments').insertOne(successfulPayment);
            const student = await db.collection("users").findOne({ _id: successfulPayment.studentId });
            const amountPaid = Number(successfulPayment.amountPaid)


            if (amountPaid === 1) {
                const boughtBooks = student?.boughtBooks || [];
                boughtBooks.push('b1');
                await db.collection("users").updateOne(
                    { _id: successfulPayment.studentId },
                    { $set: { boughtBooks: boughtBooks } }
                );
            } else {
                const addedLessons = amountPaid === 109 ? 5 :
                    amountPaid === 209 ? 10 :
                        amountPaid === 380 ? 20 : 0;
                const paidLessons = student?.paidLessons || 0;
                const previousTally = student?.lessonsTally || 0;

                const totalLessons = paidLessons + addedLessons;
                const updatedTally = previousTally + addedLessons;

                await db.collection("users").updateOne(
                    { _id: successfulPayment.studentId },
                    { $set: { paidLessons: totalLessons, lessonsTally: updatedTally } }
                );
            }

            console.log({ successfulPayment: successfulPayment });
            break;

        case 'checkout.session.expired':
            const checkoutSessionExpired = event.data.object;
            console.log({ checkoutSessionExpired: checkoutSessionExpired })


            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
};
