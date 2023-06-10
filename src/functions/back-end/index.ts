import { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next"

const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];


export function handleOptions(res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end();

}

export async function isAdmin(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (
        session &&
        session.user?.email &&
        adminEmails.length > 0 &&
        adminEmails.includes(session.user?.email)) {
        return true
    } else {
        return false
    }



}