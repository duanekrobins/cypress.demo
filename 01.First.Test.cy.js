/// <reference types="Cypress" />

describe("Visiting Google", () => {
    // Using `beforeEach` to navigate to Google before each test ensures we're always starting from the same state.
    beforeEach(() => {
        cy.visit("https://google.com");
    });

    it("shows 'Google' as the page title", () => {
        // Direct assertion on the page title to verify it matches "Google"
        cy.title().should("equal", "Google");
    });

    it("has a valid UI", () => {
        // Verify the search input is visible, has a 'title' attribute of "Search", and is empty.
        cy.get("input[name=q]")
            .should("be.visible")
            .and("have.attr", "title", "Search")
            .and("have.value", "");

        // Check visibility of the second 'Google Search' button which is typically visible to the user.
        cy.get("[name=btnK]").eq(1).should("be.visible");

        // Using `find` to locate the 'Google Search' button within the autocomplete popup to verify it is not visible,
        // has a value of "Google Search", and its type is "submit".
        cy.get("[jsaction*=mouseout]").find("[name=btnK]")
            .should("not.be.visible")
            .and("have.value", "Google Search")
            .and("have.attr", "type", "submit");

        // Assert that the "I'm Feeling Lucky" button has the correct 'aria-label' attribute.
        cy.contains("I'm Feeling Lucky").should("have.attr", "aria-label", "I'm Feeling Lucky");
    });
});
