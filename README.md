Node version: 20.5.1.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### CI/CD  

- ####  [Production](https://thinkthaithai.com)

-  [Cypress E2E tests report](https://2gi3.github.io/thinkthaithai2/cypress/reports/html)

-  [FIGMA](https://www.figma.com/file/84tR9gfjrZJOAo8QUK1bQ8/ThinkThaiThai2.0?node-id=0-1&t=y6RD5RE6sgjC7YsD-0)


# Features and where to find them

## Publicly accessible features:

### Navigation bar
- Multy-Language.

- Live Multy-Currency exchange values.

### Price (page)

- Show trial lesson option only to new students, no need to log in, the fee for this lesson is paid on [Calendly](https://www.calendly.com). Every other purchase in the website is managed with [Stripe](https://stripe.com) and requires the student to be logged in.


- Update the number of available lessons after the student completes a successful purchase.

- The 'Most Popular' button changes style following the presence ( or lack there ) of the trial lesson button.

### Free Courses (page)

-  Display how much progress has the student achieved so far in any course.

-  Display which courses the student has already started.

-  #### Free Courses / course 

    -  Ask the student to log in to start a course.

    -  Display an array of bars, each representing a lesson, and each showing the lesson title when being hovered on, this is to help the students visualise their progress and help them navigate to any specific lesson in the course.

    - 'Lesson Completed' button becomes 'Start a new course' when the course is completed.


### Profile (page)

-  A list of all the courses that the student has started, which includes a progress bar to show the percentage of completed lessons.

- 'Remaining lessons', this element shows how many private lessons the student has left.

- 'Buy some lessons', this button appears when remaining lessons are 0.

- 'Book a lesson', this button will open a [Calendly](https://www.calendly.com) iframe and allow the student to book a lesson.

-  When a lesson is booked, the number of 'Remaining lessons' will decrease by one.

- 'Payment history', This button will appear after a student makes their first purchase ( not including the trial lesson ), and will show a list of all the payments the student has ever made on the website.

### Log In

- Log in with google without password.

- Log in by email, with confirmation link, no password.

- Student's account is created automatically the first time they log in.


 ## Authentication and Authorization-

  Create a project on the respective platforms and get credentials:
  - [Google](https://console.developers.google.com/apis/credentials)
  - [Facebook]()
  - [Email](https://next-auth.js.org/providers/email)
    - If double factor authentication is active to log in your email, then an app-specific password mustbe created in the email settings and that is the password to be used in in .env/EMAIL_SERVER
    - For gmail, the username is the part in your email addres before the '@' symbol

 ## Payments
 ### Simulate stripe webhook in local environment: 
#### CLI commsnds
 -  CD C:\Users\gippo\Downloads\stripe_1.17.2_windows_x86_64
 -  stripe login
 -  stripe listen --forward-to localhost:3000/api/payment/webhook



 ## Bookings:

 
  - create web-hooks subscription
    - example: [Useful example](https://ngrok.com/docs/integrations/calendly/webhooks/#setup-webhook)

    - Calendly [create webhook documentation](https://developer.calendly.com/api-docs/c1ddc06ce1f1b-create-webhook-subscription)

    - Instructions: 
      - Log in to Calendly and get a TOKEN from [this page](https://calendly.com/integrations/api_webhooks)
      - Make a post request as follows:
      ```
       $headers = @{
      "authorization" = "Bearer TOKEN"
      }

      $response = Invoke-RestMethod -Uri "https://api.calendly.com/      users/me" -Headers $headers

      $response | Format-List


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
       'user'        = 'https://api.calendly.com/users/XXXXXXX'
       'scope'       = 'user'
  
      $jsonData = $data | ConvertTo-Json
   
      $response = Invoke-RestMethod -Method Post -Uri 'https://api.calendly.com/webhook_subscriptions' -Headers $headers -Body $jsonData
   
      $response
      ```
      }



 ## Drag, Drop and Crop 
   There was a bug that caused the cropped image to not be precisely identical to the area inside the selected circle in the original image,

   This happened when the intrinsic width of the image was different than the rendered width.

   To solve the problem i have made the width attribute in the html dynamic, always having the same value as the intrinsic width of the image.

   And to render the image in that same size i had to give the original image a ```max-width: unset```
   in order to over-write the ```max-width:100%``` in node_modules/react-image-crop/src/ReactCrop.scss (line 50),

  
# Run this project locally

1. npm install
2. create the .env.local (see the environment section below)
3. npm run dev
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment
- .env.local = .env.example

- .cypress.env.json = {
   "GOOGLE_USER": ,
    "GOOGLE_PW": ",
    "COOKIE_NAME": "next-auth.session-token",
    "SITE_NAME": "http://localhost:3000"
}

On 'npm run dev', the environment variables will reference the .env.local file.

On 'npm start', the environment variables will reference the .env.production file.

# Testing
[Deployed Tests report](https://2gi3.github.io/thinkthaithai2/cypress/reports/html)

-  The project must be running on localhost:3000
-  The following commands must run in the Stripe CLI
    
   - ( on my computer)  C:\Users\gippo\Downloads\stripe_1.17.2_windows_x86_64 
   -  stripe login
   -  stripe listen --forward-to localhost:3000/api/payment/webhook

## Custom commands

 -  ```cy.loginByGoogleApi()```
 This command is based on the [Cypress documentation](https://docs.cypress.io/guides/end-to-end-testing/google-authentication), `cy.intercept('GET', '/api/auth/session', mockSession)` was added to fix a bug, it will log in and redirect the user to '/account'.

 -  ```cy.logOut``` This command will log you out and redirect you to the homepage.

 ## Tested features by file

 ### navBar.cy.js

 -  Navigation links.

 -  Multi language button and page translation.

 -  Currency exchange button and conversion rates.

 ### prices.cy.js

 - Payments ( includes stripe iframe and webhook)

 - The trial lesson 

 -  Private lessons packages
 


# Feedbacks

## [Rui Zhang](https://www.linkedin.com/in/ruizhang77/): 
- [figma](https://www.figma.com/file/Qwwly37PdqzOj2nIQSizOU/ThinkThaithai?type=design&node-id=0-1&mode=design&t=28ixwB28Q7UtsBTb-0)


## Katy Nguyen: 
- [figma](https://www.figma.com/file/4ioUGDhUqDLYur9PcvCFjQ/ThinkThaiThai's-feedback?type=design&node-id=1-2&t=utyGoHAh2Iswhlm5-0)

