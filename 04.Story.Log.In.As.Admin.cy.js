/// <reference types="Cypress" />

describe("visiting app home page on localhost 8080", () => {
    beforeEach(() => {
        cy.visitFresh("http://localhost:8080");
    });

    it('UAC 4.1A - As a admin I can login (by clicking on the login text within the page)', () => {
        cy.loginUsingHyperLinkText('admin', 'admin');
        cy.log('Verifying that the user is logged in as user user');
        //Login verified by parsing text after login
        cy.get('.alert').should('contain.text', 'You are logged in as user "admin"');
        cy.logOut();
    });
    it('UAC 4.1B - As a admin I can login (by using the nav menu at the top of the page)', () => {
        cy.loginUsingNavMenu('admin', 'admin');
        cy.log('Verifying that the user is logged in as user user');
        //Login verified by parsing text after login
        cy.get('.alert').should('contain.text', 'You are logged in as user "admin"');
        cy.logOut();
    });
 
     it('UAC 4.2A - As an admin I have access to everything a standard user has access to after login. MOVIES ', () => {
        // Click on the movies link using the nav control at the top of the page, loads login.
        cy.loginUsingNavMenu('admin', 'admin');
        cy.get(':nth-child(2) > .d-flex').click();
        cy.get('.jh-card').should('contain.text', 'Movies');
        cy.location('pathname').should('include', '/movies');
        //Logout
        cy.logOut();
    });

     it('UAC 4.2B -As an admin I have access to everything a standard user has access to after login. ITEMS', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
        //Verify Items page can be accessed when logged in
        cy.get('#entity-menu > .d-flex').click();
        cy.get('[href="/item"]').click();
        cy.location('pathname').should('include', '/item');
        cy.get('#item-heading > :nth-child(1)').should('contain.text', 'Items');
        cy.get('#jh-create-entity').should('exist');
        //Log out
        cy.logOut();
    });

    it('UAC 4.2C - As an admin I have access to everything a standard user has access to after login. Production Companies', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
        //Verify Production Company page loads when logged in
        cy.get('#entity-menu > .d-flex').click();
        cy.get('[href="/production-company"]').click();
        cy.location('pathname').should('include', '/production-company');       
        cy.get('.jh-card').should('contain.text','Production Companies');
        cy.get('#jh-create-entity').should('exist');
        //Log out
        cy.logOut();
    });

    it('UAC 4.2D -As an admin I have access to everything a standard user has access to after login. PEOPLE', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
        //Verify that Person page loads when logged in
        cy.get('#entity-menu > .d-flex').click();
        cy.get('[href="/person"]').click();
        cy.get('#person-heading > :nth-child(1)').should('contain.text','People');
        cy.get('.info > span').should('contain.text','Showing 1 - 20');
        cy.get('#jh-create-entity').should('exist');
        //Log out
        cy.logOut();
    });

    it('UAC 4.2E - As an admin I have access to everything a standard user has access to after login.  CREDITS', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
        //Verify Credits page can be accessed when logged in
        cy.get('#entity-menu > .d-flex').click();
        cy.get('[href="/credit"]').click();
        cy.get('#credit-heading > :nth-child(1)').should('contain.text', 'Credits');
        cy.location('pathname').should('include', '/credit');
        cy.get('.info > span').should('contain.text', 'Showing 1 - 10');
        cy.get('#jh-create-entity').should('exist');
        //Log out
        cy.logOut();
    });

    it('UAC 4.2F As an admin I have access to everything a standard user has access to after login.  ACCOUNT SETTINGS', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
         //Navigate to the account settings page using the nav bar at the top of the screen
        cy.get('#account-menu > .d-flex').click();
        cy.get('[href="/account/settings"]').click();
        cy.get('#settings-title > span').should('contain.text', 'User settings for [admin]');
        cy.get('.btn').should('exist');
         //Log out
        cy.logOut();
    });

    it('UAC 4.3A As an Admin, when logged in, I also show the administration menu.', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
         //Verify that after logging in as admin that the parent user administration menu exists.
        cy.get('#admin-menu > .d-flex').should('exist');
         //Log out
        cy.logOut();
    });

    it('UAC 4.3B As an Admin, I also show the administration menu, and can access each of the pages listed above. USER MANAGEMENT PAGE', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
         //Verify that after logging in as admin that the administration -> User Management page can be loaded.
        cy.get('#admin-menu > .d-flex').click();
        cy.l('Verifying User Management Page loads');
        cy.get('[href="/admin/user-management"]').click();
        cy.get('#user-management-page-heading > :nth-child(1)').should('contain.text', 'Users');
        cy.get('.info > span').should('contain.text','Showing 1 -')
        cy.get('#user-management-page-heading > .btn').should('be.visible');
         //Log out
        cy.logOut();
    });


    it('UAC 4.3C As an Admin, I also show the administration menu, and can access each of the pages listed above. USER TRACKER PAGE', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
         //Verify that after logging in as admin that the administration -> User Tracker page can be loaded.
        cy.l('Verifying User Tracker Page loads');
        cy.get('#admin-menu > .d-flex').click();
        cy.get('[href="/admin/tracker"]').click();
        cy.location('pathname').should('include', '/admin/tracker');
        cy.get('h2 > span').should('contain.text','Real-time user activities');
        cy.get('tbody > tr > :nth-child(1)').should('contain.text','admin')
         //Log out
        cy.logOut();
    });

    it('UAC 4.3D As an Admin, I also show the administration menu, and can access each of the pages listed above. METRICS PAGE', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
         //Verify that after logging in as admin that the administration -> Metrics page can be loaded.
        cy.get('#admin-menu > .d-flex').click();
        cy.get('[href="/admin/metrics"]').click();
        //Verify metrics page loaded
        cy.l('************Verifying metrics page loaded**************');
        cy.location('pathname').should('include', '/admin/metrics');
        //Verifying metrics page content
        cy.l('************Verifying metrics page content**************');
        cy.get('#metrics-page-heading').should('contain.text','Application Metrics');
        cy.get(':nth-child(2) > .btn').should('be.visible');
        cy.get(':nth-child(9) > .col-sm-12 > div > h3').should('contain.text','DataSource statistics (time in millisecond)')
         //Log out
        cy.logOut();
    });

    it('UAC 4.3E As an Admin, I also show the administration menu, and can access each of the pages listed above. HEALTH PAGE', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
         //Verify that after logging in as admin that the administration -> health page can be loaded.
        cy.get('#admin-menu > .d-flex').click();
        cy.get('[href="/admin/health"]').click();
        //Verify health page loaded
        cy.l('************Verifying health page loaded**************');
        cy.location('pathname').should('include', '/admin/health');
        //Verifying health page content
        cy.l('************Verifying health page content**************');
        cy.get('#health-page-heading').should('contain.text','Health Checks');
        cy.get('.btn').should('be.visible');
         //Log out
        cy.logOut();
    });

    it('UAC 4.3F As an Admin, I also show the administration menu, and can access each of the pages listed above. CONFIGURATION PAGE', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
         //Verify that after logging in as admin that the administration -> Configuration page can be loaded.
        cy.get('#admin-menu > .d-flex').click();
        cy.get('[href="/admin/configuration"]').click();
        //Verify configuration page loaded
        cy.l('************Verifying configuration page loaded**************');
        cy.location('pathname').should('include', '/admin/configuration');
        //Verifying configuration page content
        cy.l('************Verifying configuration page content**************');
        cy.get('#configuration-page-heading > span').should('contain.text','Configuration');

         //Log out
        cy.logOut();
    });

    it('UAC 4.3G As an Admin, I also show the administration menu, and can access each of the pages listed above. AUDITS PAGE', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
         //Verify that after logging in as admin that the administration -> audit page can be loaded.
        cy.get('#admin-menu > .d-flex').click();
        cy.get('[href="/admin/audits"]').click();
        //Verify audit page loaded
        cy.l('************Verifying audit page loaded**************');
        cy.location('pathname').should('include', '/admin/audits');
        //Verifying audit page content
        cy.l('************Verifying audit page content**************');
        cy.get('#audits-page-heading').should('contain.text','Audits');
        cy.get('.info > span').should('contain.text','Showing 1 - 20')
         //Log out
        cy.logOut();
    });

    it('UAC 4.3H As an Admin, I also show the administration menu, and can access each of the pages listed above. LOGS PAGE', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
         //Verify that after logging in as admin that the administration -> logs page can be loaded.
        cy.get('#admin-menu > .d-flex').click();
        cy.get('[href="/admin/logs"]').click();
        //Verify audit page loaded
        cy.l('************Verifying logs page loaded**************');
        cy.location('pathname').should('include', '/admin/logs');
        //Verifying logs page content
        cy.l('************Verifying logs page content**************');
        cy.get('#logs-page-heading > span').should('contain.text','Logs');
        cy.get('p > span').should('contain.text','There are');
        cy.get('p > span').should('contain.text','loggers');
         //Log out
        cy.logOut();
    });

    it('UAC 4.3I As an Admin, I also show the administration menu, and can access each of the pages listed above. qacert api DOCS PAGE', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin', 'admin');
         //Verify that after logging in as admin that the administration -> api docs page can be loaded.
        cy.get('#admin-menu > .d-flex').click();
        cy.get('[href="/admin/docs"]').click();
        //Verify audit page loaded
        cy.l('************Verifying api page loaded**************');
        cy.location('pathname').should('include', '/admin/docs');
        cy.get('.jh-card').should('be.visible');
        cy.get('iframe').should('be.visible');
        //Log out
        cy.logOut();
    });
});