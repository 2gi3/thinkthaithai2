// @ts-ignore
Cypress.Commands.add('loginByGoogleApi', () => {
    cy.log('Logging in to Google')
    cy.request({
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token',
        body: {
            grant_type: 'refresh_token',
            client_id: Cypress.env("GOOGLE_CLIENT_ID"),
            client_secret: Cypress.env('GOOGLE_CLIENT_SECRET'),
            refresh_token: Cypress.env('GOOGLE_REFRESH_TOKEN'),
        },
    }).then(({ body }) => {
        const { access_token, id_token } = body

        cy.request({
            method: 'GET',
            url: 'https://www.googleapis.com/oauth2/v3/userinfo',
            headers: { Authorization: `Bearer ${access_token}` },
        }).then(({ body }) => {
            cy.log(body)
            const userItem = {
                token: id_token,
                user: {
                    googleId: body.sub,
                    email: body.email,
                    name: `${body.given_name} ${body.family_name}`,
                    // givenName: body.given_name,
                    // familyName: body.family_name,
                    image: body.picture,
                },
            }

            window.localStorage.setItem('databaseStudent', JSON.stringify(userItem))
            cy.visit('/')
        })
    })
})

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import '@testing-library/cypress/add-commands'