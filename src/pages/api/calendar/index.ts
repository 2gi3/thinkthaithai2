// https://developers.google.com/calendar/api/v3/reference/events/insert#node.js

import {google} from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'

const {OAuth2} = google.auth 
// const calendarId = 'primary';

const OAuthClient = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

OAuthClient.setCredentials({refresh_token: process.env.OAUTH_REFRESH_TOKEN})

const calendar = google.calendar({version:'v3', auth: OAuthClient})

const eventStartTime = new Date()

eventStartTime.setDate(eventStartTime.getDate() +2)

const eventEndTime = new Date()

eventEndTime.setDate(eventEndTime.getDate() + 2 )
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
  summary: 'Test event node',
  location: 'zoom',
  description: 'testing creating an event on google calendar with node.js',
  start: {
    dateTime: eventStartTime,
    timezone: 'Europe/London',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'Europe/London'
    // Asia/Bangkok
  },
  colorId: 1
}

// calendar.events.insert({calendarId: 'primary',
// resource: event,}, (err:any) =>{ if(err){
//   console.log(err)
// }else{
//   console.log('event created')
// }}) 

//  Freebusy documentation: 
// https://developers.google.com/calendar/api/v3/reference/freebusy/query

// const query: google.calendar_v3.Params$Resource$Freebusy$Query = {
//   resource: {
//     timeMin: eventStartTime.toISOString(),
//     timeMax: eventEndTime.toISOString(),
//     timeZone: 'Europe/London',
//     groupExpansionMax: 1,
//     calendarExpansionMax: 1,
//     items: [{ id: 'kjhlj' }],
//   },
// };

// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: 'Europe,London'
//     }

// },
//  (err, res)=>{
//   if(err){console.log(err)
//   }else{
  // eventsArr = res.data.calendars.primary.busy
  // if(eventsArr.lenght ===0){
    // calendar.event.insert({calendarId: 'primary', resource: event}, err =>{ if(err){
      // console.log(err)
    // }else{
      // console.log('event created')
    // }}) 
  // }
//     console.log(res)
//   }
// }
//  )



// console.log(JSON.stringify(calendar))

// 18:00

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
// let cal 
//     calendar.calendars.get({ calendarId }, (err, res) => {
//       if (err) {
//         console.error('Error fetching calendar metadata:', err);
//         return;
//       }
//       cal=res?.data
//       // console.log('Calendar metadata:', res.data);
//     });
    
    
    
    res.send(JSON.stringify(calendar.events))}