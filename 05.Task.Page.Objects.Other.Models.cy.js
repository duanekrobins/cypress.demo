/// <reference types="Cypress" />

import loginPage from '../support/pageObjects/loginPage';       import homePage from '../support/pageObjects/homePage';     import itemsPage from '../support/pageObjects/itemsPage';
import moviesSearchPage from '../support/pageObjects/moviesSearchPage';     import creditPage from '../support/pageObjects/creditPage'; import personPage from '../support/pageObjects/personPage';
import settingsPage from '../support/pageObjects/settingsPage'; import usersPage from '../support/pageObjects/usersPage';   import trackerPage from '../support/pageObjects/trackerPage';
import metricsPage from '../support/pageObjects/metricsPage';   import healthPage from '../support/pageObjects/healthPage'; import configPage from '../support/pageObjects/configPage';
import auditsPage from '../support/pageObjects/auditsPage';     import logsPage from '../support/pageObjects/logsPage';     import apiDocsPage from '../support/pageObjects/apiDocsPage';
import productionCompanyPage from '../support/pageObjects/productionCompanyPage';


const HomePage = new homePage();            const LoginPage = new loginPage();      const ItemsPage = new itemsPage();
const MoviesSearchPage = new moviesSearchPage();        const CreditPage = new creditPage();    const PersonPage = new personPage();
const SettingsPage = new settingsPage();    const UsersPage = new usersPage();      const TrackerPage = new trackerPage();
const MetricsPage = new metricsPage();      const HealthPage = new healthPage();    const ConfigPage = new configPage();
const AuditsPage = new auditsPage();        const LogsPage = new logsPage();        const ApiDocsPage = new apiDocsPage();
const ProductionCompanyPage = new productionCompanyPage();



describe("visiting app home page on localhost 8080", () => {
    beforeEach(() => {
        cy.visitFresh("http://localhost:8080");
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As a user I can login (by clicking on the login text within the page)', () => {
        cy.loginUsingHyperLinkText('user','user');
        HomePage.getLoggedInAsTxt().should('contain.text', 'You are logged in as user "user"');
        cy.logOut();
    });
    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS  -- As a user I can login (by using the nav menu at the top of the page)', () => {
        cy.loginUsingNavMenu('user','user');
        HomePage.getLoggedInAsTxt().should('contain.text', 'You are logged in as user "user"')
        cy.logOut();
    });
 
     it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS  -- As a user I have access to the MOVIES PAGE ', () => {
        cy.loginUsingNavMenu('user','user');
        cy.navToMovieSearchPage();
        MoviesSearchPage.movieSearchHeading().should('contain.text', 'Movies');
        cy.location('pathname').should('include', '/movie');
        cy.logOut();
    });

     it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As a user I have access to the ITEMS PAGE', () => {
        cy.loginUsingNavMenu('user','user');
        cy.navToItemsPage();
        cy.location('pathname').should('include', '/item');
        ItemsPage.getItemsHeading().should('contain.text', 'Items')
        ItemsPage.getCreateNewItmBtn().should('exist');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As a user I have access to the PRODUCT COMPANIES PAGE', () => {
        cy.loginUsingNavMenu('user','user');
        cy.navToProdCompanyPage();
        cy.location('pathname').should('include', '/production-company');       
        ProductionCompanyPage.getProdCompanyHeading().should('contain.text','Production Companies');
        ProductionCompanyPage.getProdCompanyAddBtn().should('exist')
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As a user I have access to THE PEOPLE PAGE', () => {
        cy.loginUsingNavMenu('user','user');
        cy.navToPersonPage();
        PersonPage.getPersonWelcomeHeading().should('contain.text','People');
        PersonPage.getPersonDisplayingTxt().should('contain.text','Showing 1 - 20')
        PersonPage.getAddPersonBtn().should('exist');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As a user I have access to the CREDITS PAGE', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToCreditPage();
        cy.location('pathname').should('include', '/credit');
        CreditPage.getCreditHeading().should('contain.text', 'Credits');
        CreditPage.getCreditShowingItemsTxt().should('contain.text', 'Showing 1 - 10')
        CreditPage.getCreditCreateBtn().should('exist');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As a admin I can login (by clicking on the login text within the page)', () => {
        cy.loginUsingHyperLinkText('admin','admin');
        HomePage.getLoggedInAsTxt().should('contain.text', 'You are logged in as user "admin"');
        cy.logOut();
    });
    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As a admin I can login (by using the nav menu at the top of the page)', () => {
        cy.loginUsingNavMenu('admin','admin');
        HomePage.getLoggedInAsTxt().should('contain.text', 'You are logged in as user "admin"')
        cy.logOut();
    });
 
     it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an admin I have access to everything a standard user has access to after login. MOVIES ', () => {
        // Click on the movies link using the nav control at the top of the page, loads login.
        cy.loginUsingNavMenu('admin','admin');
        cy.navToMovieSearchPage();
        MoviesSearchPage.movieSearchHeading().should('contain.text', 'Movies');
        cy.location('pathname').should('include', '/movie');
        cy.logOut();
    });

     it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an admin I have access to everything a standard user has access to after login. ITEMS', () => {
        // Login launched by clicking on login link in text.
        cy.loginUsingNavMenu('admin','admin');
        cy.navToItemsPage();
        cy.location('pathname').should('include', '/item');
        ItemsPage.getItemsHeading().should('contain.text', 'Items')
        ItemsPage.getCreateNewItmBtn().should('exist');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an admin I have access to everything a standard user has access to after login. Production Companies', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToProdCompanyPage();
        cy.location('pathname').should('include', '/production-company');       
        ProductionCompanyPage.getProdCompanyHeading().should('contain.text','Production Companies');
        ProductionCompanyPage.getProdCompanyAddBtn().should('exist')
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an admin I have access to everything a standard user has access to after login. PEOPLE', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToPersonPage();
        PersonPage.getPersonWelcomeHeading().should('contain.text','People');
        PersonPage.getPersonDisplayingTxt().should('contain.text','Showing 1 - 20')
        PersonPage.getAddPersonBtn().should('exist');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an admin I have access to everything a standard user has access to after login.  CREDITS', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToCreditPage();
        cy.location('pathname').should('include', '/credit');
        CreditPage.getCreditHeading().should('contain.text', 'Credits');
        CreditPage.getCreditShowingItemsTxt().should('contain.text', 'Showing 1 - 10')
        CreditPage.getCreditCreateBtn().should('exist');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an admin I have access to everything a standard user has access to after login.  ACCOUNT SETTINGS', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToAccountSettings();
        SettingsPage.getSettingsHeading().should('contain.text', 'User settings for [admin]');
        SettingsPage.getSettingsSaveBtn().should('exist');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an Admin, when logged in, I also show the administration menu.', () => {
        cy.loginUsingNavMenu('admin','admin');
        HomePage.getAdminMnu().should('exist');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an Admin, I also show the administration menu, and can access each of the pages listed above. USER MANAGEMENT PAGE', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToUsersPage();
        UsersPage.getUsersHeading().should('contain.text', 'Users');
        cy.l('Verifying User Management Page loads');
        UsersPage.getUsersShowingItemsTxt().should('contain.text','Showing 1 -');
        UsersPage.getUsersCreateBtn().should('be.visible');
        cy.logOut();
    });


    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an Admin, I also show the administration menu, and can access each of the pages listed above. USER TRACKER PAGE', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToTrackerPage()
        cy.l('Verifying User Tracker Page loads');
        cy.location('pathname').should('include', '/admin/tracker');
        TrackerPage.getTrackerHeadingTxt().should('contain.text','Real-time user activities');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an Admin, I also show the administration menu, and can access each of the pages listed above. METRICS PAGE', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToMetricsPage();
        cy.location('pathname').should('include', '/admin/metrics');
        MetricsPage.getMetricsHeading().should('contain.text','Application Metrics');
        MetricsPage.getMetricsRefreshBtn().should('be.visible');
        MetricsPage.getDataSourceStatsTxt().should('contain.text','DataSource statistics (time in millisecond)');
        MetricsPage.getMetricsFooter().should('be.visible');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an Admin, I also show the administration menu, and can access each of the pages listed above. HEALTH PAGE', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToHealthPage();
        cy.location('pathname').should('include', '/admin/health');
        HealthPage.getHealthHeading().should('contain.text','Health Checks');
        HealthPage.getHealthRefreshBtn().should('be.visible');
        HealthPage.getHealthPingSvsTxt().should('contain.text','ping');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an Admin, I also show the administration menu, and can access each of the pages listed above. CONFIGURATION PAGE', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToConfigPage();
        cy.location('pathname').should('include', '/admin/configuration');
        ConfigPage.getConfigHeading().should('contain.text','Configuration');
        ConfigPage.getConfigFooter().should('be.visible');
        ConfigPage.getConfigDefaultPropTxt().should('contain.text','defaultProperties');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an Admin, I also show the administration menu, and can access each of the pages listed above. AUDITS PAGE', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToAuditsPage();
        cy.location('pathname').should('include', '/admin/audits');
        AuditsPage.getAuditsHeading().should('contain.text','Audits');
        AuditsPage.getAuditsDisplayingTxt().should('contain.text','Showing 1 - ');
        AuditsPage.getAuditsFooter().should('be.visible');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an Admin, I also show the administration menu, and can access each of the pages listed above. LOGS PAGE', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToLogsPage();
        cy.get('#admin-menu > .d-flex').click();
        cy.location('pathname').should('include', '/admin/logs');
        LogsPage.getLogsHeading().should('contain.text','Logs');
        LogsPage.getLogsLoggersTxt().should('contain.text','There are');
        LogsPage.getLogsLoggersTxt().should('contain.text','loggers');
        LogsPage.getLogsFooter().should('be.visible');
        cy.logOut();
    });

    it('UAC 5.1.1A & 5.1.1B  - USING PAGE OBJECTS, LOGIN AND NAV FUNCTIONS -- As an Admin, I also show the administration menu, and can access each of the pages listed above. qacert api DOCS PAGE', () => {
        cy.loginUsingNavMenu('admin','admin');
        cy.navToApiDocsPage();
        cy.location('pathname').should('include', '/admin/docs');
        ApiDocsPage.getApiDocsPage().should('be.visible');
        ApiDocsPage.getApiDocsFooter().should('be.visible');
        cy.logOut();
    });
});