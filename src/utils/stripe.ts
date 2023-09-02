

import Stripe from 'stripe';

const stripe = new Stripe('sk_test_your_stripe_secret_key', {
    apiVersion: '2023-08-16',
});

export default stripe;
