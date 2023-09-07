import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getServerSession(req, res, authOptions)
        const isUserAuthorized = session?.user

        if (isUserAuthorized) {
            res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_BASIC_URL!);
            res.setHeader('Access-Control-Allow-Methods', 'GET');
            res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

            if (req.method === 'OPTIONS') {
                res.status(200).end();
                return;
            }

            const coinbaseResponse = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=USD');

            if (coinbaseResponse.ok) {
                const data = await coinbaseResponse.json();
                res.status(200).json(data);
            } else {
                res.status(coinbaseResponse.status).end(coinbaseResponse.statusText);
            }
        } else {
            res.status(403).json({ error: 'Unauthorized access' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
};

export default handler;
