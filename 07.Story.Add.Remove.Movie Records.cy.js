/// <reference types="Cypress" />

import allmovies from '../fixtures/allmovies.json'; import addmovies from '../fixtures/addmovies.json';
import moviesEditPage from '../support/pageobjects/moviesEditPage'; import moviesSearchPage from '../support/pageobjects/moviesSearchPage';
import moviesEntityPage from '../support/pageobjects/moviesEntityPage'; import movieEntityRecViewPage from '../support/pageobjects/movieEntityRecViewPage';

const MoviesSearchPage = new moviesSearchPage();
const MoviesEditPage = new moviesEditPage();
const MoviesEntityPage = new moviesEntityPage;
const MovieEntityRecViewPage = new movieEntityRecViewPage();

describe("visiting app home page on localhost 8080", () => {
    beforeEach(() => {
        cy.visitFresh("http://localhost:8080");

    });


    it('Exercise 7.1: UAC As a non-admin user, I should able to VIEW EXISTING movies on the movies ENTITY page (Verifying movie records 1-25 using fixture data.) ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        MoviesSearchPage.getIDSort().click()
        allmovies.slice(0, 24).forEach((c) => {
            let testMovieID = c.id;
            let testMovieTitle = c.title;
            let testMovieReleaseDate = c.releaseDate
            cy.get('table')
                .find("tr")
                .then((rows) => {
                    let found = false;
                    for (let i = 1; i < rows.length; i++) {
                        cy.wrap(rows[i])
                            .find('td')
                            .then((cells) => {
                                // you can use jQuery, remember?
                                cy.wrap(cells[0])
                                    .invoke('text')
                                    .then((text) => {
                                        if (text === JSON.stringify(testMovieID)) {
                                            cy.wrap(cells[1]).should(
                                                'have.text',
                                                testMovieTitle
                                            );
                                            cy.wrap(cells[3]).should(
                                                'have.text',
                                                testMovieReleaseDate
                                            );
                                            found = true;
                                        }
                                    });
                            });
                        if (found) break;
                    }

                });
            cy.navToMovieSearchPage();
        });
        cy.logOut();
    });


    it('Exercise 7.2: UAC As a non-admin user, I should able to VIEW EXISTING movies on the movies ENTITY page (Verifying records 26-50 using fixture data.) ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        MoviesSearchPage.getIDSort().click()
        allmovies.slice(25, 50).forEach((c) => {
            let testMovieID = c.id;
            let testMovieTitle = c.title;
            let testMovieReleaseDate = c.releaseDate
            cy.get('table')
                .find("tr")
                .then((rows) => {
                    let found = false;
                    for (let i = 1; i < rows.length; i++) {
                        cy.wrap(rows[i])
                            .find('td')
                            .then((cells) => {
                                // you can use jQuery, remember?
                                cy.wrap(cells[0])
                                    .invoke('text')
                                    .then((text) => {
                                        if (text === JSON.stringify(testMovieID)) {
                                            cy.wrap(cells[1]).should(
                                                'have.text',
                                                testMovieTitle
                                            );
                                            cy.wrap(cells[3]).should(
                                                'have.text',
                                                testMovieReleaseDate
                                            );
                                            found = true;
                                        }
                                    });
                            });
                        if (found) break;
                    }

                });
            cy.navToMovieSearchPage();
        });
        cy.logOut();
    });

    it('Exercise 7.3: UAC As a non-admin user, I should able to Interact with all the control on the Movies Entities Page (Verifying all controls are available and recognized.) ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        MoviesEntityPage.sortByIDLnk().click();
        MoviesEntityPage.sortByTitleLnk().click();
        MoviesEntityPage.sortByReleaseDatelnk().click();
        MoviesEntityPage.paginationPageTwoLnk().click();
        MoviesEntityPage.paginationPageOneLnk().click();
        MoviesEntityPage.paginationPageThreeLnk().click();
        MoviesEntityPage.paginationPreviousPageLnk().click();
        MoviesEntityPage.paginationNextPageLnk().click();
        MoviesEntityPage.paginationGotoFirstPageLnk().click();
        MoviesEntityPage.paginationGotoLastPageLnk().click();
        cy.logOut();
    });

    it('Exercise 7.4: UAC As a non-admin user, I should be able to view movie entity data by using all the sort controls. (VERIFY ALL SORT CONTROLS) ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        MoviesEntityPage.sortByIDLnk().click();
        MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '50');
        MoviesEntityPage.sortByIDLnk().click();
        MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '1');
        cy.navToMoviesEntityPage();
        MoviesEntityPage.sortByTitleLnk().click();
        MoviesEntityPage.getMovieTitleDataFromTable(1).should('contain.text', 'WALL·E');
        MoviesEntityPage.sortByTitleLnk().click();
        MoviesEntityPage.getMovieTitleDataFromTable(1).should('contain.text', '2001: A Space Odyssey');
        cy.navToMoviesEntityPage();
        MoviesEntityPage.sortByReleaseDatelnk().click();
        MoviesEntityPage.getMovieReleaseDateDataFromTable(1).should('contain.text', '08/22/2020');
        MoviesEntityPage.sortByReleaseDatelnk().click();
        MoviesEntityPage.getMovieReleaseDateDataFromTable(1).should('contain.text', '11/26/1942');
        cy.logOut();
    });

    it('Exercise 7.5: UAC As a non-admin user, I should able to Interact with all the control on the Movies Entities Page (Verifying pagination controls function correctly.) ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        MoviesEntityPage.paginationPageTwoLnk().click();
        MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '21');
        MoviesEntityPage.paginationPageThreeLnk().click();
        MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '41');
        MoviesEntityPage.paginationGotoFirstPageLnk().click();
        MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '1');
        MoviesEntityPage.paginationGotoLastPageLnk().click();
        MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '41');
        MoviesEntityPage.paginationPageOneLnk().click();
        MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '1');
        MoviesEntityPage.paginationNextPageLnk().click();
        MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '21');
        MoviesEntityPage.paginationPreviousPageLnk().click();
        MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '1');
        cy.logOut();
    });

    it('Exercise 7.6: UAC As a non-admin user, I should able to ADD A NEW MOVIE a new movie from the movies entity page (Adding data manually first.) ', () => {
        //This test also tests the multi-select of Movie Director(s) and Cast Members.
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        MoviesEntityPage.createANewMovieBtn().click();
        MoviesEditPage.titleInput().type("Movie Title");
        MoviesEditPage.overviewInput().type("Movie Overview");
        MoviesEditPage.releaseDateCalendar().type('1964-01-01');
        MoviesEditPage.productionCompaniesSelect().select('Amuse');
        MoviesEditPage.directorsSelect().select(['Thelma Ritter', 'James Mason', 'Alfred Hitchcock']);
        MoviesEditPage.castSelect().select(['Thelma Ritter', 'James Mason', 'Alfred Hitchcock'])
        MoviesEditPage.saveBtn().click();
        //Verify Movie Added
        MoviesEntityPage.sortByIDLnk().click();
        MoviesEntityPage.getMovieTitleDataFromTable(1).should('contain.text', 'Movie Title');
        MoviesEntityPage.getMovieOverviewFromTable(1).should('contain.text', 'Movie Overview');
        MoviesEntityPage.getMovieReleaseDateDataFromTable(1).should('contain.text', '01/01/1964');
        //Delete Added Movie
        MoviesEntityPage.deleteMovieBtn(1).click();
        MoviesEntityPage.deleteMovieConfirmDeleteBtn().click();
        MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '50');
        MoviesEntityPage.getMovieTitleDataFromTable(1).should('contain.text', '2001: A Space Odyssey');
        cy.logOut();
    });

    it('Exercise 7.7: View existing movie entity records using the edit button from movie entity record view. (View First and Last Records)', () => {
        //This test also tests the multi-select of Movie Director(s) and Cast Members.
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        MoviesEntityPage.movieIDLnk(1).click();
        MovieEntityRecViewPage.recHeading().should('contain.text', 'Movie [1]');
        MovieEntityRecViewPage.recordMovieTitle().should('contain.text', 'Star Wars: Episode I - The Phantom Menace');
        MovieEntityRecViewPage.recMovieReleaseDate().should('contain.text', '05/16/1999');
        MovieEntityRecViewPage.recProdCompanies().should('contain.text', 'Lucasfilm');
        MovieEntityRecViewPage.recDirectors().should('contain.text', 'George Lucas');
        MovieEntityRecViewPage.recCast().should('contain.text', 'Ewan McGregor, Jake Lloyd, Natalie Portman, Liam Neeson');
        MovieEntityRecViewPage.backBtn().click();
        cy.navToMoviesEntityPage();
        MoviesEntityPage.sortByIDLnk().click();
        MoviesEntityPage.movieIDLnk(1).click();
        MovieEntityRecViewPage.recHeading().should('contain.text', 'Movie [50]');
        MovieEntityRecViewPage.recordMovieTitle().should('contain.text', '2001: A Space Odyssey');
        MovieEntityRecViewPage.recMovieReleaseDate().should('contain.text', '04/02/1968');
        MovieEntityRecViewPage.recProdCompanies().should('contain.text', 'Metro-Goldwyn-Mayer');
        MovieEntityRecViewPage.recDirectors().should('contain.text', 'Ewan McGregor');
        MovieEntityRecViewPage.recCast().should('contain.text', 'Keir Dullea, Gary Lockwood, William Sylvester');
        MovieEntityRecViewPage.backBtn().click();
        cy.logOut();
    });

    it('Exercise 7.8: View an existing movie entity record using the edit button in the movies entity table. (Verify First and Last Records)', () => {
        //This test also tests the multi-select of Movie Director(s) and Cast Members.
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        MoviesEntityPage.viewMovieBtn('1').click();
        MovieEntityRecViewPage.recHeading().should('contain.text', 'Movie [1]');
        MovieEntityRecViewPage.recordMovieTitle().should('contain.text', 'Star Wars: Episode I - The Phantom Menace');
        MovieEntityRecViewPage.recMovieReleaseDate().should('contain.text', '05/16/1999');
        MovieEntityRecViewPage.recProdCompanies().should('contain.text', 'Lucasfilm');
        MovieEntityRecViewPage.recDirectors().should('contain.text', 'George Lucas');
        MovieEntityRecViewPage.recCast().should('contain.text', 'Ewan McGregor, Jake Lloyd, Natalie Portman, Liam Neeson');
        MovieEntityRecViewPage.backBtn().click();
        cy.navToMoviesEntityPage();
        MoviesEntityPage.sortByIDLnk().click();
        MoviesEntityPage.movieIDLnk(1).click();
        MovieEntityRecViewPage.recHeading().should('contain.text', 'Movie [50]');
        MovieEntityRecViewPage.recordMovieTitle().should('contain.text', '2001: A Space Odyssey');
        MovieEntityRecViewPage.recMovieReleaseDate().should('contain.text', '04/02/1968');
        MovieEntityRecViewPage.recProdCompanies().should('contain.text', 'Metro-Goldwyn-Mayer');
        MovieEntityRecViewPage.recDirectors().should('contain.text', 'Ewan McGregor');
        MovieEntityRecViewPage.recCast().should('contain.text', 'Keir Dullea, Gary Lockwood, William Sylvester');
        MovieEntityRecViewPage.backBtn().click();
        cy.logOut();
    });



    it('Exercise 7.9: UAC As a non-admin user, I should able to add a new movie from the movies entity page (Adding data from fixture file) ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        addmovies.slice(0, 5).forEach((e) => {
            let addMovieTitle = e.movietitle;
            let addMovieOverview = e.movieoverview;
            let addMovieReleaseDate = e.moviereleasedate;
            let addMovieProdCompany = e.movieprodcompany;
            let addMovieCast = e.moviecast;
            let addMovieDirectors = e.moviedirector;
            //Add a movie using data driven testing from addmovies.json
            MoviesEntityPage.createANewMovieBtn().click();
            MoviesEditPage.titleInput().type(addMovieTitle);
            MoviesEditPage.overviewInput().type(addMovieOverview);
            MoviesEditPage.releaseDateCalendar().type(addMovieReleaseDate);
            MoviesEditPage.productionCompaniesSelect().select(addMovieProdCompany);
            MoviesEditPage.directorsSelect().select(addMovieDirectors);
            MoviesEditPage.castSelect().select(addMovieCast)
            MoviesEditPage.saveBtn().click();
            //Verify Movie Added
            cy.wait(2500);
            MoviesEntityPage.sortByIDLnk().click();
            MoviesEntityPage.getMovieTitleDataFromTable(1).should('contain.text', addMovieTitle);
            MoviesEntityPage.getMovieOverviewFromTable(1).should('contain.text', addMovieOverview);
            //Delete Added Movie
            MoviesEntityPage.deleteMovieBtn(1).click();
            MoviesEntityPage.deleteMovieConfirmDeleteBtn().click();
            //Verify Movie is deleted
            MoviesEntityPage.getMovieIDDataFromTable(1).should('contain.text', '50');
            MoviesEntityPage.getMovieTitleDataFromTable(1).should('contain.text', '2001: A Space Odyssey');
        });
        cy.logOut();

    });


    it('Exercise 7.10: EDIT An EXISTING movie entity record (Edit Record 25)', () => {
        //This test also tests the multi-select of Movie Director(s) and Cast Members.
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        MoviesEntityPage.paginationPageTwoLnk().click();
        MoviesEntityPage.getMovieTitleDataFromTable(5).should('contain.text', 'Toy Story');
        MoviesEntityPage.editMovieBtn('5').click();
        MoviesEditPage.titleInput().clear();
        MoviesEditPage.titleInput().type('MODIFIED MOVIE RECORD 25');
        MoviesEditPage.overviewInput().clear();
        MoviesEditPage.overviewInput().type('MODIFIED MOVIE OVERVIEW');
        MoviesEditPage.releaseDateCalendar().clear();
        MoviesEditPage.releaseDateCalendar().type('1990-01-01');
        MoviesEditPage.productionCompaniesSelect().select('Touchstone Pictures');
        MoviesEditPage.castSelect().select(['Thelma Ritter', 'James Mason', 'Alfred Hitchcock']);
        MoviesEditPage.directorsSelect().select(['Thelma Ritter', 'James Mason', 'Alfred Hitchcock'])
        MoviesEditPage.saveBtn().click();

        // //Verify Edited Movie
        cy.navToMovieSearchPage();
        cy.navToMoviesEntityPage();
        MoviesEntityPage.paginationPageTwoLnk().click();
        MoviesEntityPage.viewMovieBtn(5).click();
        MovieEntityRecViewPage.recHeading().should('contain.text', 'Movie [25]');
        MovieEntityRecViewPage.recordMovieTitle().should('contain.text', 'MODIFIED MOVIE RECORD 25');
        MovieEntityRecViewPage.recMovieOverview().should('contain.text', 'MODIFIED MOVIE OVERVIEW')
        MovieEntityRecViewPage.recMovieReleaseDate().should('contain.text', '01/01/1990');
        MovieEntityRecViewPage.recProdCompanies().should('contain.text', 'Touchstone Pictures');
        MovieEntityRecViewPage.recDirectors().should('contain.text', 'Alfred Hitchcock, Thelma Ritter, James Mason');
        MovieEntityRecViewPage.recCast().should('contain.text', 'Alfred Hitchcock, Thelma Ritter, James Mason');
        MovieEntityRecViewPage.backBtn().click();

        //Return the edited moved to its original values
        cy.navToMovieSearchPage();
        cy.navToMoviesEntityPage();
        MoviesEntityPage.paginationPageTwoLnk().click();
        MoviesEntityPage.getMovieTitleDataFromTable(5).should('contain.text', 'MODIFIED MOVIE RECORD 25');
        MoviesEntityPage.editMovieBtn('5').click();
        MoviesEditPage.titleInput().clear();
        MoviesEditPage.titleInput().type('Toy Story');
        MoviesEditPage.overviewInput().clear();
        MoviesEditPage.overviewInput().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
        MoviesEditPage.releaseDateCalendar().clear();
        MoviesEditPage.releaseDateCalendar().type('1995-11-19');
        MoviesEditPage.saveBtn().click();

        // //Verified Edited Record is correctly returned to its original state.
        cy.navToMovieSearchPage();
        cy.navToMoviesEntityPage();
        MoviesEntityPage.paginationPageTwoLnk().click();
        MoviesEntityPage.viewMovieBtn('5').click();
        MovieEntityRecViewPage.recHeading().should('contain.text', 'Movie [25]');
        MovieEntityRecViewPage.recordMovieTitle().should('contain.text', 'Toy Story');
        MovieEntityRecViewPage.recMovieReleaseDate().should('contain.text', '11/19/1995');
        MovieEntityRecViewPage.backBtn().click();
        cy.logOut();
    });

});