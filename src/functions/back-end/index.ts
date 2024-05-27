import { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next"

const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const virtualNumber = process.env.TWILIO_NUMBER;
const phoneNumber = process.env.MOBILE_NUMBER;
const twilioClient = require("twilio")(accountSid, authToken);


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

export async function sendTwilioMessage(messageBody: string) {
    //Sends a message to phoneNumber, Created for the web developer to be notified when the Calendly webhook receives an error
    try {
        const message = await twilioClient.messages.create({
            body: messageBody,
            from: virtualNumber,
            to: phoneNumber
        });
        console.log(`Message sent with Twilio SID: ${message.sid}`);
    } catch (error) {
        console.error(`Failed to send Twilio message: ${error}`);
    }
}