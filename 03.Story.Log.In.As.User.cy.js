/// <reference types="Cypress" />

describe("visiting app home page on localhost 8080", () => {
    beforeEach(() => {
        cy.visitFresh("http://localhost:8080");;
    });
    it('Login modal is loaded when the login hyperlink text is clicked in home page body', () => {
        cy.get(':nth-child(1) > .alert-link > span').click();
        cy.location('pathname').should('include', '/login')
    });
    it('Login modal username, password and sign-in buttons are visible when /login page loads', () => {
        cy.get(':nth-child(1) > .alert-link > span').click();
        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('.btn-primary > span').should('be.visible');
    });
    it('UAC 3.1.A - As a user I can sign in with those credentials anywhere the sign in modal is accessed (click on the login text within the page)', () => {
        cy.loginUsingHyperLinkText('user','user');
        cy.log('Verifying that the user is logged in as user user');
        cy.get('.alert').should('contain.text', 'You are logged in as user "user"');
        cy.logOut();
    });
    it('UAC 3.1.B - As a user I can sign in with those credentials anywhere the sign in modal is accessed (by using the nav menu at the top of the page)', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.log('Verifying that the user is logged in as user user');
        cy.get('.alert').should('contain.text', 'You are logged in as user "user"');
        cy.logOut();
    });
    
    it('UAC 3.2 - The following pages are only accessible when logged in ENTITIES (entities menu item does not exist when not logged in)', () => {
        cy.get('.collapse').should('not.contain.text', 'Entities');
    });
    it('UAC 3.2.A - The following pages are only accessible when logged in MOVIES ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.log('Verifying that when the movies like is clicked that no content is displayed if not logged in');
        cy.get('.jh-card').should('not.contain.text', 'Movies');
        cy.logOut();
    });
    it('UAC 3.2.C - The following pages are only accessible when logged in ACCOUNT SETTINGS (account settings menu item does not exist when not logged in)', () => {
        cy.get('#account-menu > .d-flex').should('not.contain.text','Settings')
    });
    it('UAC 3.2.4 - When logging in, the page remembers the context MOVIES ', () => {
        cy.get(':nth-child(2) > .d-flex').click();
        cy.get('#username').type('user');
        cy.get('#password').type('user');
        cy.get('.btn-primary > span').click();
        cy.get('.jh-card').should('contain.text', 'Movies');
        cy.location('pathname').should('include', '/movies');
        cy.logOut();
    });

    it('UAC 3.2.1 - After loggin in, all the pages requiring login can be accessed. MOVIES ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.get(':nth-child(2) > .d-flex').click();
        cy.get('.jh-card').should('contain.text', 'Movies');
        cy.location('pathname').should('include', '/movies');
        cy.logOut();
    });
 
    it('UAC 3.2.2 After loggin in, all the pages requiring login can be accessed. ITEMS', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.get('#entity-menu > .d-flex').click();
        cy.get('[href="/item"]').click();
        cy.location('pathname').should('include', '/item');
        cy.get('#item-heading > :nth-child(1)').should('contain.text', 'Items');
        cy.get('#jh-create-entity').should('exist');
        cy.logOut();
    });

    it('UAC 3.2.3 After loggin in, all the pages requiring login can be accessed. Production Companies', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.get('#entity-menu > .d-flex').click();
        cy.get('[href="/production-company"]').click();
        cy.location('pathname').should('include', '/production-company');       
        cy.get('.jh-card').should('contain.text','Production Companies');
        cy.get('#jh-create-entity').should('exist');
        cy.logOut();
    });

    it('UAC 3.2.4 After loggin in, all the pages requiring login can be accessed. PEOPLE', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.get('#entity-menu > .d-flex').click();
        cy.get('[href="/person"]').click();
        cy.get('#person-heading > :nth-child(1)').should('contain.text','People');
        cy.get('.info > span').should('contain.text','Showing 1 - 20');
        cy.get('#jh-create-entity').should('exist');
         cy.logOut();
    });

    it('UAC 3.2.5 After loggin in, all the pages requiring login can be accessed.  CREDITS', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.get('#entity-menu > .d-flex').click();
        cy.get('[href="/credit"]').click();
        cy.get('#credit-heading > :nth-child(1)').should('contain.text', 'Credits');
        cy.location('pathname').should('include', '/credit');
        cy.get('.info > span').should('contain.text', 'Showing 1 - 10');
        cy.get('#jh-create-entity').should('exist');
        cy.logOut();
    });

    it('UAC 3.2.6 After loggin in, all the pages requiring login can be accessed.  ACCOUNT SETTINGS', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.get('#account-menu > .d-flex').click();
        cy.get('[href="/account/settings"]').click();
        cy.get('#settings-title > span').should('contain.text', 'User settings for [user]');
        cy.get('.btn').should('exist');
        cy.logOut();
    });
    it('UAC 3.4 - As a user I can log out.', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.logOut();   
        cy.log('Logging out using the menu controls');
        cy.log('Verifying logout by parsing text');
        cy.get('h4').should('contain.text','Logged out successfully!');
    });
});