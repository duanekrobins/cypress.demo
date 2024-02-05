/// <reference types="Cypress" />

describe("Visiting app home page on localhost 8080", () => {
    // Ensures the home page is visited before each test run.
    beforeEach(() => {
        cy.visit("http://localhost:8080");
    });

    it("UAC #1 can navigate to homepage", () => {
        // Direct assertion to verify the page title matches "QaCert".
        cy.title().should("equal", "QaCert");
    });

    it("UAC #2 Homepage has banner with 'Welcome, QA Engineers!'", () => {
        // Asserts the welcome banner text is visible to confirm user greeting presence.
        cy.get('.col-md-9')
            .should("be.visible")
            .and("contain.text", "Welcome, QA Engineers!");
    });

    it("UAC #3A Homepage body has the navigation control with specific classes", () => {
        // Verifies the navigation bar has the expected classes indicating it's visible and styled correctly.
        cy.get('.bg-dark')
            .should("have.class", "navbar")
            .and("have.class", "navbar-expand-sm")
            .and("have.class", "navbar-dark")
            .and("have.class", "fixed-top");
    });

    it("UAC #3B Homepage body navigation control is visible", () => {
        // Checks for the visibility of the navigation bar's collapse component.
        cy.get('.collapse').should("be.visible");
    });
});
