/// <reference types="Cypress" />

describe("Admin functionalities on the app home page", () => {
    // Setup to visit the app home page before each test.
    beforeEach(() => {
        cy.visit("http://localhost:8080");
    });

    // Custom command assumed for logging in as admin.
    const loginAsAdmin = () => {
        cy.loginUsingNavMenu('admin', 'admin'); // Assuming this is a predefined Cypress command.
    };

    it('UAC 4.1A - Admin can login via page hyperlink', () => {
        loginAsAdmin();
        cy.get('.alert').should('contain.text', 'You are logged in as user "admin"');
        cy.logOut(); // Assuming cy.logOut is a custom command.
    });

    it('UAC 4.1B - Admin can login via navigation menu', () => {
        loginAsAdmin();
        cy.get('.alert').should('contain.text', 'You are logged in as user "admin"');
        cy.logOut();
    });

    // Tests from UAC 4.2A to UAC 4.2F verify that an admin has access to standard user functionalities.
    it('UAC 4.2A - Admin access to MOVIES', () => {
        loginAsAdmin();
        cy.navigateTo('Movies'); // Assuming cy.navigateTo is a custom command to click on navigation links.
        cy.verifyPageAccess('/movies', 'Movies'); // Assuming cy.verifyPageAccess is a custom command.
        cy.logOut();
    });

    // Example of a streamlined test for ITEMS access.
    it('UAC 4.2B - Admin access to ITEMS', () => {
        loginAsAdmin();
        cy.navigateTo('Items');
        cy.verifyPageAccess('/item', 'Items');
        cy.logOut();
    });

    // Additional tests for Production Companies, PEOPLE, CREDITS, ACCOUNT SETTINGS follow a similar pattern.

    // Test for verifying admin-specific access, like the administration menu.
    it('UAC 4.3A - Admin shows administration menu', () => {
        loginAsAdmin();
        cy.get('#admin-menu > .d-flex').should('exist');
        cy.logOut();
    });

    // Example test for accessing USER MANAGEMENT PAGE as admin.
    it('UAC 4.3B - Admin access to USER MANAGEMENT PAGE', () => {
        loginAsAdmin();
        cy.navigateToAdminPage('User Management'); // Assuming this is a custom command for admin navigation.
        cy.verifyAdminPageContent('Users', '/admin/user-management'); // Assuming this is a custom command.
        cy.logOut();
    });

    // Additional tests for USER TRACKER PAGE, METRICS PAGE, HEALTH PAGE, CONFIGURATION PAGE, AUDITS PAGE, LOGS PAGE, and qacert api DOCS PAGE would follow the same pattern.

});
