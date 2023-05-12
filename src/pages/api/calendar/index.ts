import {google} from 'googleapis'

const {OAuth2} = google.auth 

const OAuthClient = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)