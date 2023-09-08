/// <reference types="Cypress" />

describe("visiting google", () => {
    beforeEach(() => {
        cy.visit("https://google.com");
    });
    it("shows 'Google' as the page title", () => {
        // I'm simplifying here, since the chained assertion is easiest
        // for most situations.
        cy.title().should("equal", "Google");
    });
    it("has a valid UI", () => {
        cy.visit("https://google.com");
        cy.get("input[name=q]")
            .should("be.visible")
            // should assertions yield the subject of their assertion
            // to the next method, so we can keep chaining.
            .should("have.attr", "title", "Search")
            .should("have.value", "");
        // There are TWO input buttons with the name "btnK"
        // cy.get("[name=btnK]") will yield both
        // the `.eq(0)` method picks the first from the results
        // just like in jQuery.
        // The first is hidden on the autocomplete popup, but
        // the second, at index 1, is visible right away.
        cy.get("[name=btnK]").eq(1).should("be.visible");
        // We could also chain a .find() off of a .get() to sort of
        // "search within" a previous element or elements. Here I
        // will get the autocomplete popout, and find the Google Search
        // button within it.
        cy.get("[jsaction*=mouseout]")
            .find("[name=btnK]")
            .should("not.be.visible")
            .should("have.value", "Google Search")
            .should("have.attr", "type", "submit");
        // cy.contains(someText) will search the whole page, or chain
        // off of a previous .get() or .find()
        cy.contains("I'm Feeling Lucky").should(
            "have.attr",
            "aria-label",
            "I'm Feeling Lucky"
        );
    });
});