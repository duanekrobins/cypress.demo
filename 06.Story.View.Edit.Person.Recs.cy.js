import homePage from '../support/pageObjects/homePage';
import personPage from '../support/pageObjects/personPage';
import personDetailPage from '../support/pageObjects/personDetailPage';
import personEditPage from '../support/pageObjects/personEditPage';

// Instantiating page objects
const HomePage = new homePage();
const PersonPage = new personPage();
const PersonDetailPage = new personDetailPage();
const PersonEditPage = new personEditPage();

describe("Person entity management on localhost:8080", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080");
        cy.loginUsingNavMenu('user', 'user'); // Assumes cy.loginUsingNavMenu is a custom Cypress command
    });

    afterEach(() => {
        cy.logOut(); // Assumes cy.logOut is a custom Cypress command
    });

    it('Exercise 6.1: Verify visibility of all controls on the PEOPLE PAGE', () => {
        cy.navToPersonPage(); // Assumes cy.navToPersonPage is a custom Cypress command
        PersonPage.verifyAllControlsVisible();
    });

    it('Exercise 6.2: Verify ID sort functionality on the PERSON PAGE', () => {
        cy.navToPersonPage();
        PersonPage.verifyIdSortFunctionality();
    });

    it('Exercise 6.3: Verify NAME sort functionality on the PERSON PAGE', () => {
        cy.navToPersonPage();
        PersonPage.verifyNameSortFunctionality();
    });

    it('Exercise 6.4: Verify pagination functionality on the PERSON PAGE', () => {
        cy.navToPersonPage();
        PersonPage.verifyPaginationFunctionality();
    });

    it('Exercise 6.5: View a person record from the first page', () => {
        cy.navToPersonPage();
        PersonPage.viewFirstPersonRecord();
        PersonDetailPage.verifyPersonDetail('Michael Curtiz', '12/24/1886');
    });

    it('Exercise 6.6: View a person record from the last page', () => {
        cy.navToPersonPage().then(() => {
            PersonPage.navigateToLastPageAndViewLastPerson();
            PersonDetailPage.verifyPersonDetail('Paul Henreid', '01/10/1908');
        });
    });

    it('Exercise 6.7: Add a new person record', () => {
        cy.navToPersonPage();
        PersonPage.addNewPersonRecord({
            name: 'Newly Added **PERSON NAME FIELD**',
            birthday: '1964-04-07',
            biography: 'Newly Added **PERSON BIOGRAPHY**',
            profilePath: 'Newly Added **PROFILE PATH FIELD**',
            homepage: 'Newly Added **PERSON HOMEPAGE FIELD**',
            alsoKnownAs: 'Newly Added **PERSON ALSO KNOWN AS FIELD**'
        });
        PersonPage.verifyNewlyAddedPersonRecord();
    });

    it('Exercise 6.8: Delete a person record', () => {
        cy.navToPersonPage();
        PersonPage.deleteLastAddedPersonRecord();
        PersonPage.verifyPersonRecordDeletion();
    });

    it('Exercise 6.9: Edit/Update a person record', () => {
        cy.navToPersonPage();
        PersonPage.editFirstPersonRecord({
            name: 'UPDATED PERSON NAME',
            birthday: '1965-04-07',
            biography: 'UPDATED PERSON BIOGRAPHY',
            profilePath: 'UPDATED PERSON PROFILE PATH',
            homepage: 'UPDATED PERSON HOME PAGE',
            alsoKnownAs: 'UPDATED PERSON ALSO KNOWN AS'
        });
        PersonPage.verifyUpdatedPersonRecord();
    });

    it("Exercise 6.10: Verify person table's headings", () => {
        cy.navToPersonPage();
        PersonPage.verifyTableHeadings();
    });

    it("Exercise 6.11: Verify first and last name on page 1", () => {
        cy.navToPersonPage();
        PersonPage.verifyNamesOnFirstPage(['Michael Curtiz', 'Ian Holm']);
    });

    it("Exercise 6.12: Verify first and last name on the last page", () => {
        cy.navToPersonPage().then(() => {
            PersonPage.navigateToLastPageAndVerifyNames(['Mone Kamishiraishi', 'Paul Henreid']);
        });
    });
});
