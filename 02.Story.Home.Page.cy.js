/// <reference types="Cypress" />

describe("visiting app home page on localhost 8080", () => {
    beforeEach(() => {
        cy.visitFresh("http://localhost:8080");;
    });
    it("UAC #1 can navigate to homepage", () => {
        // Verify that page title is QaCert
        cy.title().should("equal", "QaCert");
    });
    it("UAC #2 Homepage has banner with Welcome, QA Engineers! ", () => {
        cy.get('.col-md-9')
            .should("be.visible")
            .should("contain.text", "Welcome, QA Engineers!");
    });
    it("UAC #3A Homepage body has the navigation control ", () => {
        cy.get('.bg-dark')
        //Verify that home page has the navigation bar control
            .should("have.class", "bg-dark navbar navbar-expand-sm navbar-dark fixed-top")
    });
    it("UAC #3B Homepage body navigation control is visible ", () => {
        cy.get('.collapse')
        //Verify that home page has the navigation bar control
            .should("be.visible")
    });
});