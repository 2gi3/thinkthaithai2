## CI/CD deploy: https://thinkthaithai-draft.netlify.app

## FIGMA: https://www.figma.com/file/84tR9gfjrZJOAo8QUK1bQ8/ThinkThaiThai2.0?node-id=0-1&t=y6RD5RE6sgjC7YsD-0

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run this project locally

1: npm install
2: create the .env.local (see the environment section of this document)
3: npm run dev
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Dependencies documentation

Google calendar API: [youtube tutorial](https://www.youtube.com/watch?v=zrLf4KMs71E&t=1338s)

## Environment
On 'npm run dev', the environment variables will reference the .env.local file.

On 'npm start', the environment variables will reference the .env.production file.

What follows is a list of all the necessary environment variables:

    NEXT_PUBLIC_CURRENCY_EXCHANGE_URL=

    OAUTH_REFRESH_TOKEN=

    MONGODB_URI=

    CLOUDINARY_URL=

    GOOGLE_CLIENT_ID=

    GOOGLE_CLIENT_SECRET=

    NEXTAUTH_URL=http:

    FACEBOOK_CLIENT_ID=

    FACEBOOK_CLIENT_SECRET=

    JWT_secret=

    NEXT_PUBLIC_PAYPAL_CLIENT_ID=

    NEXT_PUBLIC_CLIENT_SECRET=

    PAYPAL_CLIENT_ID=

    PAYPAL_CLIENT_SECRET=
    
    EMAIL_SERVER_USER=apikey
    EMAIL_SERVER_PASSWORD=
    EMAIL_SERVER_HOST=smtp.sendgrid.net
    EMAIL_SERVER_PORT=587
    EMAIL_FROM= Your email, 

## Payments

The paypal order is created in the server, see the PDF in the documentation directory to find a diagram of the logic.

[Payment flow](https://lucid.app/lucidchart/4b5a8ddb-e13c-45a9-b0a5-b99c8daa633d/edit?viewport_loc=-616%2C671%2C2585%2C964%2C0_0&invitationId=inv_fae12b37-73ff-4859-a6cf-e65c5e02d586)




