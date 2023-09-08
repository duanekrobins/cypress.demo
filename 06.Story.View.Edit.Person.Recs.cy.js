/// <reference types="Cypress" />

import homePage from '../support/pageObjects/homePage';
import personPage from '../support/pageObjects/personPage';

import personDetailPage from '../support/pageObjects/personDetailPage';
import personEditPage from '../support/pageObjects/personEditPage';

const PersonPage = new personPage();
const PersonDetailPage = new personDetailPage();
const PersonEditPage = new personEditPage;



describe("visiting app home page on localhost 8080", () => {
    beforeEach(() => {
        cy.visitFresh("http://localhost:8080");
    });

    it('Exercise 6.1: UAC As a non-admin user, I should be able to navigate to, load and view all controls on the PEOPLE PAGE ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getPersonWelcomeHeading().should('contain.text', 'People');
        PersonPage.getPersonDisplayingTxt().should('contain.text', 'Showing 1 - 20');
        PersonPage.getAddPersonBtn().should('be.visible');
        PersonPage.getAkaSortCtrl().should('be.visible');
        PersonPage.getBdateSortCtrl().should('be.visible');
        PersonPage.getBioSortCtrl().should('be.visible');
        PersonPage.getHomePageSortCtrl().should('be.visible');
        PersonPage.getIdSortCtrl().should('be.visible');
        PersonPage.getNameSortCtrl().should('be.visible');
        PersonPage.getProfilePathSortCtrl().should('be.visible');
        PersonPage.getNextPageCtrl().should('be.visible');
        PersonPage.getPage10Ctrl().should('be.visible');
        PersonPage.getPage1Ctrl().should('be.visible');
        PersonPage.getPage3Ctrl().should('be.visible');
        PersonPage.getPage10Ctrl().should('be.visible');
        PersonPage.getNameDataTxt().should('be.visible');
        PersonPage.getIdDataAndLinkTxt().should('be.visible');
        PersonPage.getBirthdateDataTxt().should('be.visible');
        cy.logOut();
    });

    it('Exercise 6.2: UAC As a non-admin user, I need for all sort controls on the PERSON PAGE to function correctly. ID Sort', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        //Click on Sort Control for ID SORT DESC
        PersonPage.getIdSortCtrl().click();
        PersonPage.getIdDataAndLinkTxt().should('contain.text', '194');
        PersonPage.getNameDataTxt().should('contain.text', 'Paul Henreid');
        PersonPage.getBirthdateDataTxt().should('contain.text', '01/10/1908');
        //Click on Sort Control for ID SORT ASC
        PersonPage.getIdSortCtrl().click();
        PersonPage.getIdDataAndLinkTxt().should('contain.text', '1');
        PersonPage.getNameDataTxt().should('contain.text', 'Michael Curtiz');
        PersonPage.getBirthdateDataTxt().should('contain.text', '12/24/1886');
        cy.logOut();
    });

    it('Exercise 6.3: UAC As a non-admin user, I need for all sort controls on the PERSON PAGE to function correctly. NAME Sort', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getNameSortCtrl().click();
        //Click on Sort Control for NAME SORT DESC
        PersonPage.getIdDataAndLinkTxt().should('contain.text', '102');
        PersonPage.getNameDataTxt().should('contain.text', 'Will Smith');
        PersonPage.getBirthdateDataTxt().should('contain.text', '09/25/1968');
        //Click on Sort Control for NAME SORT ASC
        PersonPage.getNameSortCtrl().click();
        PersonPage.getIdDataAndLinkTxt().should('contain.text', '167');
        PersonPage.getNameDataTxt().should('contain.text', 'Aaron Taylor-Johnson');
        PersonPage.getBirthdateDataTxt().should('contain.text', '06/13/1990');
        cy.logOut();
    });

    it('Exercise 6.4: UAC As a non-admin user, I should need for every pagination control on the PERSON PAGE to function correctly.', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getEndPageCtrl().click();
        PersonPage.getPersonDisplayingTxt().should('contain.text', 'Showing 181');
        PersonPage.getFirstPageCtrl().click();
        PersonPage.getPersonDisplayingTxt().should('contain.text', 'Showing 1');
        PersonPage.getPage10Ctrl().click();
        PersonPage.getPersonDisplayingTxt().should('contain.text', 'Showing 181');
        PersonPage.getPage1Ctrl().click();
        PersonPage.getPersonDisplayingTxt().should('contain.text', 'Showing 1');
        PersonPage.getPage2Ctrl().click();
        PersonPage.getPersonDisplayingTxt().should('contain.text', 'Showing 21');
        PersonPage.getFirstPageCtrl().click();
        PersonPage.getNextPageCtrl().click();
        PersonPage.getPersonDisplayingTxt().should('contain.text', 'Showing 21');
        PersonPage.getPrevPageCtrl().click();
        PersonPage.getPersonDisplayingTxt().should('contain.text', 'Showing 1');
        cy.logOut();
    });


    it('Exercise 6.5: UAC As a non-admin user, I need to be able to VIEW a person record(s) on the PERSON PAGE (VIEW A PERSON RECORD FROM THE FIRST PAGE OF THE TABLE).', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getRecordIdLink().click();
        cy.location('pathname').should('include', '/person/1');
        PersonDetailPage.getPersonDetailNameTxt().should('contain.text', 'Michael Curtiz');
        PersonDetailPage.getPersonDetailBirthDateTxt().should('contain.text', '12/24/1886')
        cy.logOut();
    });

    it('Exercise 6.6: UAC As a non-admin user, I need to be able to VIEW a person record(s) on the PERSON PAGE (VIEW A PERSON RECORD ON LAST PAGE OF TABLE).', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getIdSortCtrl().click();
        PersonPage.getRecordIdLink().click();
        cy.location('pathname').should('include', '/person/194');
        PersonDetailPage.getPersonDetailNameTxt().should('contain.text', 'Paul Henreid');
        PersonDetailPage.getPersonDetailBirthDateTxt().should('contain.text', '01/10/1908')
        cy.logOut();
    });

    it('Exercise 6.7: UAC As a non-admin user, I need to be able to VIEW a person detail record by clicking on the VIEW BUTTON (VIEW A PERSON DETAIL RECORD FROM THE FIRST PAGE OF THE TABLE).', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getViewPersonBtn().click();
        cy.location('pathname').should('include', '/person/1');
        PersonDetailPage.getPersonDetailNameTxt().should('contain.text', 'Michael Curtiz');
        PersonDetailPage.getPersonDetailBirthDateTxt().should('contain.text', '12/24/1886')
        cy.logOut();
    });


    it('Exercise 6.8: UAC As a non-admin user, I need to be able to ADD A NEW  person record(s) on the PERSON PAGE (VIEW A PERSON RECORD ON LAST PAGE OF TABLE).', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getAddPersonBtn().click();
        cy.get('#person-name').type('Newly Added **PERSON NAME FIELD**');
        cy.get('#person-birthday').type('1964-04-07');
        cy.get('#person-biography').type('Newly Added **PERSON BIOGRAPHY**');
        cy.get('#person-profilePath').type('Newly Added **PROFILE PATH FIELD**');
        cy.get('#person-homepage').type('Newly Added **PERSON HOMEPAGE FIELD**');
        cy.get('#person-alsoKnownAs').type('Newly Added **PERSON ALSO KNOWN AS FIELD**');
        cy.get('#save-entity').click();
        PersonPage.getIdSortCtrl().click();
        PersonPage.getRecordIdLink().click();
        //Verifying Added Record
        cy.get('.jh-entity-details > :nth-child(2)').should('contain.text', 'Newly Added **PERSON NAME FIELD**');
        cy.get('.jh-entity-details > :nth-child(4) > span').should('contain.text', '04/07/1964');
        cy.get('.jh-entity-details > :nth-child(6)').should('contain.text', 'Newly Added **PERSON BIOGRAPHY**');
        cy.get('.jh-entity-details > :nth-child(8)').should('contain.text', 'Newly Added **PROFILE PATH FIELD**');
        cy.get('.jh-entity-details > :nth-child(10)').should('contain.text', 'Newly Added **PERSON HOMEPAGE FIELD**');
        cy.get('.jh-entity-details > :nth-child(12)').should('contain.text', 'Newly Added **PERSON ALSO KNOWN AS FIELD**');
        cy.get('.btn-info').click();
        cy.logOut();
    });



    it('Exercise 6.9: UAC As a non-admin user, I need to be able to DELETE person record(s) on the PERSON ENTIRY PAGE (VIEW A PERSON RECORD ON LAST PAGE OF TABLE).', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getIdSortCtrl().click();
        PersonPage.getRecordIdLink().click();
        //Verifying Previously added record exists prior to deleting.
        cy.get('.jh-entity-details > :nth-child(2)').should('contain.text', 'Newly Added **PERSON NAME FIELD**');
        cy.get('.jh-entity-details > :nth-child(4) > span').should('contain.text', '04/07/1964');
        cy.get('.jh-entity-details > :nth-child(6)').should('contain.text', 'Newly Added **PERSON BIOGRAPHY**');
        cy.get('.jh-entity-details > :nth-child(8)').should('contain.text', 'Newly Added **PROFILE PATH FIELD**');
        cy.get('.jh-entity-details > :nth-child(10)').should('contain.text', 'Newly Added **PERSON HOMEPAGE FIELD**');
        cy.get('.jh-entity-details > :nth-child(12)').should('contain.text', 'Newly Added **PERSON ALSO KNOWN AS FIELD**');
        cy.get('.btn-info').click();
        //Deleting Added Record
        PersonPage.getIdSortCtrl().click();
        cy.get(':nth-child(1) > .text-right > .btn-group > .btn-danger').click();
        cy.get('#jhi-confirm-delete-person').click();
        //Verifying Deleted Record (Verify newly added record no longer exists, verify that last record is ID 194 Name: Paul Henreid)
        PersonPage.getNameDataTxt().should('not.contain.text', 'Newly Added **PERSON NAME FIELD**');
        PersonPage.getIdDataAndLinkTxt().should('contain.text', '194');
        PersonPage.getNameDataTxt().should('contain.text', 'Paul Henreid');
        cy.logOut();
    });



    it('Exercise 6.10: UAC As a non-admin user, I need to be able to EDIT/UPDATE person record(s) on the PERSON PAGE (EDIT USING THE EDIT BUTTON) .', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getEditPersonBtn().click();
        PersonEditPage.getPersonNameInput().clear();
        PersonEditPage.getPersonNameInput().type('UPDATED PERSON NAME');
        PersonEditPage.getPersonBirthDateInput().type('1965-04-07');
        PersonEditPage.getPersonBiographyInput().clear();
        PersonEditPage.getPersonBiographyInput().type('UPDATED PERSON BIOGRAPHY');
        PersonEditPage.getPersonProfilePathInput().clear();
        PersonEditPage.getPersonProfilePathInput().type('UPDATED PERSON PROFILE PATH');
        PersonEditPage.getPersonHomePageInput().clear();
        PersonEditPage.getPersonHomePageInput().type('UPDATED PERSON HOME PAGE');
        PersonEditPage.getPersonAlsoKnownAsInput().clear();
        PersonEditPage.getPersonAlsoKnownAsInput().type('UPDATED PERSON ALSO KNOWN AS');
        PersonEditPage.getPersonEditSaveBtn().click();
        cy.navToPersonPage();
        PersonPage.getRecordIdLink().click();
        //Verifying Added Record
        PersonDetailPage.getPersonDetailNameTxt().should('contain.text', 'UPDATED PERSON NAME');
        PersonDetailPage.getPersonDetailBirthDateTxt().should('contain.text', '04/07/1965');
        PersonDetailPage.getPersonDetailBiography().should('contain.text', 'UPDATED PERSON BIOGRAPHY');
        PersonDetailPage.getPersonDetailProfilePathTxt().should('contain.text', 'UPDATED PERSON PROFILE PATH');
        PersonDetailPage.getPersonDetailHomePagetxt().should('contain.text', 'UPDATED PERSON HOME PAGE')
        PersonDetailPage.getPersonDetailAlsoKnownAstxt().should('contain.text', 'UPDATED PERSON ALSO KNOWN AS')
        PersonDetailPage.getPersonDetailBackBtn().click();
        cy.logOut();
    });

    it('Exercise 6.11: UAC As a non-admin user, I need to be able to EDIT/UPDATE person record(s) on the PERSON PAGE (EDIT BY CLICKING ON ID LINK THEN EDIT BUTTON) .', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getRecordIdLink().click();
        PersonDetailPage.getPersonDetailEditBtn().click();
        PersonEditPage.getPersonNameInput().clear();
        PersonEditPage.getPersonNameInput().type('Michael Curtiz');
        PersonEditPage.getPersonBirthDateInput().type('1886-12-24');
        PersonEditPage.getPersonBiographyInput().clear();
        PersonEditPage.getPersonBiographyInput().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
        PersonEditPage.getPersonProfilePathInput().clear();
        PersonEditPage.getPersonProfilePathInput().type('https://www.imdb.com/search/name/');
        PersonEditPage.getPersonHomePageInput().clear();
        PersonEditPage.getPersonHomePageInput().type('https://www.imdb.com/search/name/');
        PersonEditPage.getPersonAlsoKnownAsInput().clear();
        PersonEditPage.getPersonAlsoKnownAsInput().type('no entry');
        PersonEditPage.getPersonEditSaveBtn().click();
        cy.navToPersonPage();
        PersonPage.getRecordIdLink().click();
        //Verifying Added Record
        PersonDetailPage.getPersonDetailNameTxt().should('contain.text', 'Michael Curtiz');
        PersonDetailPage.getPersonDetailBirthDateTxt().should('contain.text', '12/24/1886');
        PersonDetailPage.getPersonDetailBiography().should('contain.text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
        PersonDetailPage.getPersonDetailProfilePathTxt().should('contain.text', 'https://www.imdb.com/search/name/');
        PersonDetailPage.getPersonDetailHomePagetxt().should('contain.text', 'https://www.imdb.com/search/name/');
        PersonDetailPage.getPersonDetailAlsoKnownAstxt().should('contain.text', 'no entry');
        PersonDetailPage.getPersonDetailBackBtn().click();
        cy.logOut();
    });



    it("Exercise 6.12: UAC As a non-admin user, I need to be able to view all the person table's HEADINGS (Verifying ALL <TH> Data", () => {

        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        cy.get('thead > tr > :nth-child(1)').should('contain.text', 'ID');
        cy.get('thead > tr > :nth-child(2)').should('contain.text', 'Name');
        cy.get('thead > tr > :nth-child(3)').should('contain.text', 'Birthday');
        cy.get('thead > tr > :nth-child(4)').should('contain.text', 'Biography');
        cy.get('thead > tr > :nth-child(5)').should('contain.text', 'Profile Path');
        cy.get('thead > tr > :nth-child(6)').should('contain.text', 'Homepage');
        cy.get('thead > tr > :nth-child(7)').should('contain.text', 'Also Known As');
        cy.logOut();

    });

    it("Exercise 6.13: UAC As a non-admin user, I need to be able to view a person record(s) Verify First and Last Name on--PAGE 1", () => {
        let users = [];
        let expectedUsersPage1 = [
            "Michael Curtiz",
            "Ian Holm",
        ];
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        cy.get('table')
            .find('tr')
            .each(($row, index, $list) => {
                if (index > 0)
                    //skip the header row
                    cy.wrap($row)
                        .find('td')
                        .eq(1)
                        .invoke('text')
                        .then((user) => {
                            if (!users.includes(user))
                                users.push(user);
                        });
            })
            .then(() => {
                cy.log("Found these users...", users);
                for (let expected of expectedUsersPage1)
                    expect(users).to.include(expected);
            });
        cy.logOut();
    });


    it("Exercise 6.14: UAC As a non-admin user, I need to be able to view a person record(s) Verify First and Last Name on--LAST PAGE", () => {
        let users = [];
        let expectedUsers = [
            "Mone Kamishiraishi",
            "Paul Henreid",
        ];
        cy.loginUsingNavMenu('user', 'user');
        cy.navToPersonPage();
        PersonPage.getPage10Ctrl().click()
        cy.wait(1000);
        cy.get('table')
            .find('tr')
            .each(($row, index, $list) => {
                if (index > 0)
                    //skip the header row
                    cy.wrap($row)
                        .find('td')
                        .eq(1)
                        .invoke('text')
                        .then((user) => {
                            if (!users.includes(user))
                                users.push(user);
                        });
            })
            .then(() => {
                cy.log("Found these users...", users);
                for (let expected of expectedUsers)
                    expect(users).to.include(expected);
            });
        cy.logOut();
    });

});