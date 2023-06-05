import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../mongoDB/clientPromise";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
// import { dbConnect } from "../../../../mongoDB";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: `${process.env.NEXTAUTH_URL}/account`,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackUrl: `${process.env.NEXTAUTH_URL}/account`,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      callbackUrl: `${process.env.NEXTAUTH_URL}/account`,
    }),
  ],
  pages: {
    signOut: "/",
    // signIn: "/access",
    // newUser: "/account",
  },
  adapter: MongoDBAdapter(clientPromise),
  // secret: process.env.JWT_SECRET,
  secret: process.env.NEXTAUTH_SECRET,
  debug: true
});
