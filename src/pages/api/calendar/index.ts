import {google} from 'googleapis'

const {OAuth2} = google.auth 

const OAuthClient = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

OAuthClient.setCredentials({refresh_token: process.env.OAUTH_REFRESH_TOKEN})

const calendar = google.calendar({version:'v3', auth: OAuthClient})

// 18:00