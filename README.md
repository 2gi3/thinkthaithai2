This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### CI/CD deploy: https://thinkthaithai-draft.netlify.app

### FIGMA: https://www.figma.com/file/84tR9gfjrZJOAo8QUK1bQ8/ThinkThaiThai2.0?node-id=0-1&t=y6RD5RE6sgjC7YsD-0


# Features documentation

- ## Payments

The paypal order is created in the server, see the following Chart to understand the logic.

Payment flow:
- [PDF](https://github.com/2gi3/thinkthaithai2/blob/main/documentation/Payment_flow.pdf)

- [lucidChart link](https://lucid.app/lucidchart/4b5a8ddb-e13c-45a9-b0a5-b99c8daa633d/edit?viewport_loc=-616%2C671%2C2585%2C964%2C0_0&invitationId=inv_fae12b37-73ff-4859-a6cf-e65c5e02d586)

- ## Bookings:

 
  - create web-hooks subscription
    - example: [Useful example](https://ngrok.com/docs/integrations/calendly/webhooks/#setup-webhook)

    - Calendly [create webhook documentation](https://developer.calendly.com/api-docs/c1ddc06ce1f1b-create-webhook-subscription)

    - Instructions: 
      - Log in Calendly and a TOKEN from [this page](https://calendly.com/integrations/api_webhooks)
      - Make a post request as follows:
      ```
       $headers = @{
       "authorization" = "Bearer TOKEN"
       }

      Invoke-RestMethod -Method GET -Uri "https://api.calendly.com/users/me" -Headers $headers

      ```
      - Use the informations received in the response to make a POST request as follows: 
      ```
       $headers = @{
            'Authorization' = 'Bearer TOKEN'
           'Content-Type'  = 'application/json'
        }

      $data = @{
       'url'         = 'API endpoint that receives the POST request'
       'events'      = @('invitee.created', 'invitee.canceled')
       'organization'= 'https://api.calendly.com/organizations/XXXXXXX'
       'user'        = 'https://api.calendly.com/users/XXXXXXX'
       'scope'       = 'user'
  
      $jsonData = $data | ConvertTo-Json
   
      $response = Invoke-RestMethod -Method Post -Uri 'https://api.calendly.com/webhook_subscriptions' -Headers $headers -Body $jsonData
   
      $response
      ```
      



# Run this project locally

1. npm install
2. create the .env.local (see the environment section below)
3. npm run dev
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment
All .env files are ignored by Git.

On 'npm run dev', the environment variables will reference the .env.local file.

On 'npm start', the environment variables will reference the .env.production file.

What follows is a list of all the necessary environment variables:

   - NEXT_PUBLIC_CURRENCY_EXCHANGE_URL=

   - OAUTH_REFRESH_TOKEN=

   - MONGODB_URI=

   - CLOUDINARY_URL=

   - GOOGLE_CLIENT_ID=

   - GOOGLE_CLIENT_SECRET=

   - NEXTAUTH_URL=http:

   - FACEBOOK_CLIENT_ID=

   - FACEBOOK_CLIENT_SECRET=

   - JWT_secret=

   - NEXT_PUBLIC_PAYPAL_CLIENT_ID=

   - NEXT_PUBLIC_CLIENT_SECRET=

   - PAYPAL_CLIENT_ID=

   - PAYPAL_CLIENT_SECRET=
    
   - EMAIL_SERVER_USER=apikey
   - EMAIL_SERVER_PASSWORD=
   - EMAIL_SERVER_HOST=smtp.sendgrid.net
   - EMAIL_SERVER_PORT=587
   - EMAIL_FROM= Your email, 

