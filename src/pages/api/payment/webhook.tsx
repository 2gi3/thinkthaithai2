// pages/api/webhook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '../../../utils/stripe'; // Import your Stripe secret key from a separate file
import { Readable } from 'stream';

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = 'whsec_f88529e843d235ebe2fbb713b71663aece02b6392866e8d3b8a31688ce3fb725';

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

    // Handle the event
    switch (event.type) {
        case 'checkout.session.async_payment_failed':
            const checkoutSessionAsyncPaymentFailed = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            break;
        case 'checkout.session.async_payment_succeeded':
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
            break;
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            // Then define and call a function to handle the event checkout.session.completed
            break;
        case 'checkout.session.expired':
            const checkoutSessionExpired = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
};
