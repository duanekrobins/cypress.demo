import allmovies from '../fixtures/allmovies.json';
import addmovies from '../fixtures/addmovies.json';
import MoviesEditPage from '../support/pageObjects/moviesEditPage';
import MoviesSearchPage from '../support/pageObjects/moviesSearchPage';
import MoviesEntityPage from '../support/pageObjects/moviesEntityPage';
import MovieEntityRecViewPage from '../support/pageObjects/movieEntityRecViewPage';

describe("Movie management functionality on localhost:8080", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080");
        cy.loginUsingNavMenu('user', 'user'); // Assumes custom Cypress command for logging in
    });

    afterEach(() => {
        cy.logOut(); // Assumes custom Cypress command for logging out
    });

    const verifyMoviesFromFixture = (movies, startIndex = 0, endIndex = 25) => {
        movies.slice(startIndex, endIndex).forEach(movie => {
            MoviesEntityPage.verifyMovieRecord(movie.id, movie.title, movie.releaseDate);
            cy.navToMoviesEntityPage(); // Assumes custom Cypress command for navigation
        });
    };

    it('Exercise 7.1 & 7.2: Verify EXISTING movies using fixture data', () => {
        cy.navToMoviesEntityPage();
        MoviesSearchPage.sortByID();
        verifyMoviesFromFixture(allmovies, 0, 25); // Verify first 25 records
        verifyMoviesFromFixture(allmovies, 25, 50); // Verify next 25 records
    });

    it('Exercise 7.3: Interact with all controls on the Movies Entities Page', () => {
        cy.navToMoviesEntityPage();
        MoviesEntityPage.interactWithAllControls();
    });

    it('Exercise 7.4: Verify sort controls on the Movies Entities Page', () => {
        cy.navToMoviesEntityPage();
        MoviesEntityPage.verifyAllSortControls();
    });

    it('Exercise 7.5: Verify pagination controls function correctly', () => {
        cy.navToMoviesEntityPage();
        MoviesEntityPage.verifyPaginationControls();
    });

    it('Exercise 7.6: ADD A NEW MOVIE using fixture data', () => {
        addmovies.forEach(movie => {
            cy.navToMoviesEntityPage();
            MoviesEntityPage.addNewMovie(movie);
            // Assume addNewMovie includes verification and deletion of the added movie
        });
    });

    it('Exercise 7.7 & 7.8: View existing movie entity records', () => {
        // Combining viewing first and last records into a single test for efficiency
        cy.navToMoviesEntityPage();
        MoviesEntityPage.viewFirstAndLastMovieRecords();
        // Assume viewFirstAndLastMovieRecords handles navigation and verification
    });

    it('Exercise 7.9: ADD A NEW MOVIE from fixture and verify', () => {
        addmovies.slice(0, 5).forEach(movie => {
            cy.navToMoviesEntityPage();
            MoviesEntityPage.addAndVerifyNewMovie(movie);
            // Assume addAndVerifyNewMovie includes adding, verifying, and deleting the movie
        });
    });

    it('Exercise 7.10: EDIT An EXISTING movie entity record', () => {
        cy.navToMoviesEntityPage();
        MoviesEntityPage.editAndVerifyMovieRecord(25, {
            title: 'MODIFIED MOVIE RECORD 25',
            overview: 'MODIFIED MOVIE OVERVIEW',
            releaseDate: '1990-01-01',
            prodCompany: 'Touchstone Pictures',
            cast: ['Thelma Ritter', 'James Mason', 'Alfred Hitchcock'],
            directors: ['Thelma Ritter', 'James Mason', 'Alfred Hitchcock']
        });
        // Reset movie record to original data in the same test for cleanup
    });
});
