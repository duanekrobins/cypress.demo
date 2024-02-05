import allmovies from '../fixtures/allmovies.json';
import addmovies from '../fixtures/addmovies.json';
import MoviesEditPage from '../support/pageObjects/moviesEditPage';
import MoviesSearchPage from '../support/pageObjects/moviesSearchPage';
import MoviesEntityPage from '../support/pageObjects/moviesEntityPage';

describe("Movie management functionality on localhost:8080", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080");
        cy.loginUsingNavMenu('user', 'user'); // Assumes a custom command for login
    });

    afterEach(() => {
        cy.logOut(); // Assumes a custom command for logout
    });

    const verifyMovieRecords = (movies, startIndex, endIndex) => {
        cy.navToMovieSearchPage(); // Assumes a custom command for navigation
        MoviesSearchPage.getMovieItemsPerPageDropDwn().select('25');
        MoviesSearchPage.getIDSort().click(); // Ensuring records are sorted for consistency
        movies.slice(startIndex, endIndex).forEach(movie => {
            MoviesSearchPage.verifyMovieRecordExists(movie.id, movie.title, movie.releaseDate);
        });
    };

    it('Exercise 8.1 & 8.2: Verify EXISTING movies using fixture data', () => {
        verifyMovieRecords(allmovies, 0, 25); // Verifying first 25 records
        verifyMovieRecords(allmovies, 25, 50); // Verifying next 25 records
    });

    const searchAndVerifyMoviesByTitle = (movies) => {
        movies.forEach(movie => {
            let movieTitleSearch = movie.title.substring(0, 3);
            MoviesSearchPage.performTitleSearch(movieTitleSearch);
            MoviesSearchPage.verifySearchResultContains(movie.title);
        });
    };

    it('Exercise 8.3 & 8.4: Verify movie records based on a partial title search', () => {
        searchAndVerifyMoviesByTitle(allmovies.slice(0, 24)); // First 25 records
        searchAndVerifyMoviesByTitle(allmovies.slice(25, 50)); // Next 25 records
    });

    it('Exercise 8.5: Add new movies and verify', () => {
        addmovies.forEach(movie => {
            MoviesEntityPage.addNewMovie(movie);
            MoviesEntityPage.verifyNewMovieAdded(movie.title);
            MoviesEntityPage.deleteAddedMovie();
        });
    });

    it('Exercise 8.6: Verify sort controls functionality', () => {
        MoviesSearchPage.verifySortControlsFunctionality();
    });

    it('Exercise 8.7: Verify items per page functionality', () => {
        MoviesSearchPage.verifyItemsPerPageFunctionality();
    });

    it('Exercise 8.8: Verify pagination controls', () => {
        MoviesSearchPage.verifyPaginationFunctionality();
    });

    it('Exercise 8.9 & 8.10: Add a new movie, search by title and overview', () => {
        addmovies.forEach(movie => {
            MoviesEntityPage.addNewMovie(movie);
            MoviesSearchPage.searchByMovieTitleAndOverview(movie.title, movie.movieoverview);
            MoviesEntityPage.deleteAddedMovie();
        });
    });

    it('Exercise 8.11: Add a new movie and perform a search using its production company', () => {
        addmovies.forEach(movie => {
            MoviesEntityPage.addNewMovie(movie);
            MoviesSearchPage.searchByProductionCompany(movie.movieprodcompany);
            MoviesEntityPage.deleteAddedMovie();
        });
    });
});
