/// <reference types="Cypress" />

describe("Visiting app home page on localhost 8080", () => {
    // Visits the home page before each test to ensure a fresh start.
    beforeEach(() => {
        cy.visit("http://localhost:8080");
    });

    it('Login modal is loaded when the login hyperlink text is clicked in home page body', () => {
        // Clicks on the login link and verifies the redirection to the login page.
        cy.get(':nth-child(1) > .alert-link > span').click();
        cy.location('pathname').should('include', '/login');
    });

    it('Login modal username, password, and sign-in buttons are visible when /login page loads', () => {
        // Navigates directly to the login page to improve test efficiency.
        cy.visit("http://localhost:8080/login");
        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('.btn-primary > span').should('be.visible');
    });

    it('UAC 3.1.A - User can sign in using the login hyperlink text', () => {
        // Assuming cy.loginUsingHyperLinkText is a custom command for logging in.
        // This test demonstrates logging in and verifying the login success message.
        cy.loginUsingHyperLinkText('user', 'user');
        cy.get('.alert').should('contain.text', 'You are logged in as user "user"');
    });

    it('UAC 3.1.B - User can sign in using the navigation menu', () => {
        // Similar to the previous test but using a different login method for variety.
        cy.loginUsingNavMenu('user', 'user');
        cy.get('.alert').should('contain.text', 'You are logged in as user "user"');
    });

    // Similar structure for tests UAC 3.2 to UAC 3.2.6 with actions and verifications
    // following the login. Each tests the accessibility of pages post-login.

    it('UAC 3.4 - User can log out.', () => {
        // Demonstrates logging out and verifying the logout success message.
        cy.loginUsingNavMenu('user', 'user');
        cy.logOut(); // Assuming cy.logOut is a custom command for logging out.
        cy.get('h4').should('contain.text', 'Logged out successfully!');
    });
});
