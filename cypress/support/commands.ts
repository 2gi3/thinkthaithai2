import '@testing-library/cypress/add-commands'
import { mockDatabaseStudent } from 'cypress/mock_data/mockDatabaseStudent';
import { mockSession } from 'cypress/mock_data/mockSession';

// @ts-ignore
Cypress.Commands.add('loginByGoogleApi', () => {

    cy.intercept('GET', '/api/auth/session', mockSession).as('getSessionRequest');

    cy.intercept('GET', 'http://localhost:3000/api/students?searchBy=email&value=gippolito@hotmail.co.uk', mockDatabaseStudent).as('getSessionRequest');

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
            const userItem = {
                token: id_token,
                user: {
                    googleId: body.sub,
                    email: body.email,
                    name: `${body.given_name} ${body.family_name}`,
                    image: body.picture,
                },
            }

            // window.localStorage.setItem('databaseStudent', JSON.stringify(userItem))
            cy.visit('/account')
            cy.wait(3000)
            cy.log('Logged in')

        })
    })
})

// @ts-ignore
Cypress.Commands.add('logOut', () => {
    cy.get('.NavBar_logOutButton__XSmpu').click({ force: true })

    cy.intercept('GET', '/api/auth/session', {

    }).as('getSessionRequest');
    cy.window().then((win) => {
        win.localStorage.clear();
    });
    cy.log('Logged out')

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

