import loginPage from '../support/pageObjects/loginPage';
import homePage from '../support/pageObjects/homePage';
import itemsPage from '../support/pageObjects/itemsPage';
import moviesSearchPage from '../support/pageObjects/moviesSearchPage';
import creditPage from '../support/pageObjects/creditPage';
// Import statements for other page objects...

// Instantiate page objects
const HomePage = new homePage();
const LoginPage = new loginPage();
const ItemsPage = new itemsPage();
const MoviesSearchPage = new moviesSearchPage();
// More instances...

describe("App functionality with Page Objects on localhost:8080", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080");
    });

    const loginUser = (username, password) => {
        LoginPage.login(username, password);
        HomePage.getLoggedInAsTxt().should('contain.text', `You are logged in as user "${username}"`);
    };

    const logoutUser = () => {
        HomePage.logout();
    };

    it('UAC 5.1.1A & 5.1.1B - User can login and verify', () => {
        loginUser('user', 'user');
        logoutUser();
    });

    it('UAC 5.1.1A & 5.1.1B - User has access to the MOVIES PAGE', () => {
        loginUser('user', 'user');
        MoviesSearchPage.navigateTo();
        MoviesSearchPage.verifyPageAccess('/movie', 'Movies');
        logoutUser();
    });

    // Similar structure for accessing ITEMS, PRODUCT COMPANIES, PEOPLE, CREDITS pages...

    it('UAC 5.1.1A & 5.1.1B - Admin can login and verify', () => {
        loginUser('admin', 'admin');
        logoutUser();
    });

    // Tests for admin access to standard and admin-specific pages...

    // Example for navigating and verifying access to the ACCOUNT SETTINGS page for admin
    it('UAC 5.1.1A & 5.1.1B - Admin has access to ACCOUNT SETTINGS', () => {
        loginUser('admin', 'admin');
        SettingsPage.navigateTo();
        SettingsPage.verifyPageAccess('/account/settings', 'User settings for [admin]');
        logoutUser();
    });

    // Continuing with the rest of the admin-specific access tests...
});
