/// <reference types="Cypress" />

import allmovies from '../fixtures/allmovies.json'
import addmovies from '../fixtures/addmovies.json'
import moviesEditPage from '../support/pageobjects/moviesEditPage';
import moviesSearchPage from '../support/pageobjects/moviesSearchPage';
import moviesEntityPage from '../support/pageobjects/moviesEntityPage';


const MoviesSearchPage = new moviesSearchPage();
const MoviesEditPage = new moviesEditPage();
const MoviesEntityPage = new moviesEntityPage;

describe("visiting app home page on localhost 8080", () => {
    beforeEach(() => {
        cy.visitFresh("http://localhost:8080");
    });

    it('Exercise 8.1: UAC As a non-admin user, I should able to VIEW EXISTING movies on the movies search page (Verifying movie records 1-25 using fixture data.) ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMovieSearchPage();
        MoviesSearchPage.getMovieItemsPerPageDropDwn().select('25');
        MoviesSearchPage.getIDSort().click()
        allmovies.slice(0, 24).forEach((a) => {
            let testMovieID = a.id;
            let testMovieTitle = a.title;
            let testMovieReleaseDate = a.releaseDate
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

    it('Exercise 8.2: UAC As a non-admin user, I should able to VIEW EXISTING movies on the movies search page (Verifying movie records 26-50 using fixture data.) ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMovieSearchPage();
        MoviesSearchPage.getMovieItemsPerPageDropDwn().select('25');
        MoviesSearchPage.getIDSort().click()
        allmovies.slice(0, 24).forEach((b) => {
            let testMovieID = b.id;
            let testMovieTitle = b.title;
            let testMovieReleaseDate = b.releaseDate
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

    it('Exercise 8.3: UAC As a non-admin user, I should able view movie records based on a partial search) VERIFYING FIRST 25 RECORDS ', () => {

        cy.loginUsingNavMenu('user', 'user');
        cy.navToMovieSearchPage();
        allmovies.slice(0, 24).forEach((c) => {
            let testMovieTitle = c.title;
            let movieTitleSearch = testMovieTitle.substring(0, 3);
            MoviesSearchPage.getMovieClearBtn().click();
            MoviesSearchPage.movieTitleSrch().type(movieTitleSearch, { delay: 250 });
            MoviesSearchPage.getMovieItemsPerPageDropDwn().select('25');
            cy.get('table').should('contain.text', testMovieTitle);

        });
        cy.logOut();
    });

    it('Exercise 8.4: UAC As a non-admin user, I should able view movie records based on a partial search) VERIFYING SECOND 25 RECORDS ', () => {

        cy.loginUsingNavMenu('user', 'user');
        allmovies.slice(25, 50).forEach((d) => {
            let testMovieTitle = d.title;
            let movieTitleSearch = testMovieTitle.substring(0, 3);
            cy.navToMovieSearchPage();
            MoviesSearchPage.getMovieClearBtn().click();
            MoviesSearchPage.getMovieItemsPerPageDropDwn().select('25');
            MoviesSearchPage.movieTitleSrch().type(movieTitleSearch, { delay: 250 });
            MoviesSearchPage.getMovieItemsPerPageDropDwn().select('25');
            cy.get('table').should('contain.text', testMovieTitle);

        });
        cy.logOut();
    });

    it('Exercise 8.5: UAC As a non-admin user, I should able to add a new movie from the movies entity page (Adding data from fixture file) ', () => {
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

    it('Exercise 8.6: Verify all sort controls function properly; the correct existing movies can be viewed using the sort controls. ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMovieSearchPage();
        //Sort when using default of 10 items per page.
        MoviesSearchPage.getIDSort().click();
        MoviesSearchPage.getIDSort().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '50');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', '2001: A Space Odyssey');
        MoviesSearchPage.getIDSort().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '1');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Star Wars: Episode I - The Phantom Menace');
        MoviesSearchPage.sortByTitleLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '34');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'WALL·E');
        MoviesSearchPage.sortByTitleLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '50');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', '2001: A Space Odyssey');
        MoviesSearchPage.sortByReleaseDateLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '12');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Tenet');
        MoviesSearchPage.sortByReleaseDateLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '46');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Casablanca');

        //Sort when displaying 5 items per page
        cy.wait(1000);
        MoviesSearchPage.getMovieItemsPerPageDropDwn().select('5');
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '46');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Casablanca');
        MoviesSearchPage.getIDSort().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '50');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', '2001: A Space Odyssey');
        MoviesSearchPage.getIDSort().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '1');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Star Wars: Episode I - The Phantom Menace');
        MoviesSearchPage.sortByTitleLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '34');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'WALL·E');
        MoviesSearchPage.sortByTitleLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '50');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', '2001: A Space Odyssey');
        MoviesSearchPage.sortByReleaseDateLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '12');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Tenet');
        MoviesSearchPage.sortByReleaseDateLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '46');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Casablanca');

        //Sort when displaying 25 items per page
        cy.navToMovieSearchPage();
        MoviesSearchPage.getMovieItemsPerPageDropDwn().select('25');
        cy.wait(1500);
        MoviesSearchPage.getIDSort().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '50');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', '2001: A Space Odyssey');
        MoviesSearchPage.getIDSort().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '1');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Star Wars: Episode I - The Phantom Menace');
        MoviesSearchPage.sortByTitleLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '34');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'WALL·E');
        MoviesSearchPage.sortByTitleLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '50');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', '2001: A Space Odyssey');
        MoviesSearchPage.sortByReleaseDateLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '12');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Tenet');
        MoviesSearchPage.sortByReleaseDateLink().click();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '46');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Casablanca');
        cy.logOut();
    });

    it('Exercise 8.7: Verify the number of items to display per page functions properly ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMovieSearchPage();
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '46');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Casablanca');
        MoviesSearchPage.getMovieIDFromTable(11).should('contain.text', '24');
        MoviesSearchPage.getMovieTitleFromTable(11).should('contain.text', 'Space Jam');

        //Display 5 items per page
        MoviesSearchPage.getMovieItemsPerPageDropDwn().select('5');
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '46');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Casablanca');
        MoviesSearchPage.getMovieIDFromTable(6).should('contain.text', '4');
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', 'Star Wars: Episode IV - A New Hope');

        //Display 25 items per page
        MoviesSearchPage.getMovieItemsPerPageDropDwn().select('25');
        MoviesSearchPage.getMovieIDFromTable(2).should('contain.text', '46');
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', 'Casablanca');
        MoviesSearchPage.getMovieIDFromTable(26).should('contain.text', '33');
        MoviesSearchPage.getMovieTitleFromTable(26).should('contain.text', 'Ratatouille');


        cy.logOut();
    });

    it('Exercise 8.8: Verify pagination controls on the movie search page functions properly - USES FIXTURE DATA ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMovieSearchPage();
        MoviesSearchPage.getIDSort().click();
        MoviesSearchPage.getMovieItemsPerPageDropDwn().select('5');
        //Page 1
        MoviesSearchPage.pageInfoText().should('contain.text', 'Showing 1 - 5 of 50 items.');
        //The second row of the movie search table should match the text from the specified record in allmovies.json
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', allmovies[0].title);
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', allmovies[4].title);

        //Page 2
        MoviesSearchPage.page2Link().click();
        MoviesSearchPage.pageInfoText().should('contain.text', 'Showing 6 - 10 of 50 items.');
        //The second row of the movie search table should match the text from the specified record in allmovies.json
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', allmovies[5].title);
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', allmovies[9].title);

        //Page 3
        MoviesSearchPage.page3Link().click();
        MoviesSearchPage.pageInfoText().should('contain.text', 'Showing 11 - 15 of 50 items.');
        //The second row of the movie search table should match the text from the specified record in allmovies.json
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', allmovies[10].title);
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', allmovies[14].title);

        //Page 4
        MoviesSearchPage.page4Link().click();
        MoviesSearchPage.pageInfoText().should('contain.text', 'Showing 16 - 20 of 50 items.');
        //The second row of the movie search table should match the text from the specified record in allmovies.json
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', allmovies[15].title);
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', allmovies[19].title);

        //Page 5
        MoviesSearchPage.page5Link().click();
        MoviesSearchPage.pageInfoText().should('contain.text', 'Showing 21 - 25 of 50 items.');
        //The second row of the movie search table should match the text from the specified record in allmovies.json
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', allmovies[20].title);
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', allmovies[24].title);

        //Page 6
        MoviesSearchPage.page6Link().click();
        MoviesSearchPage.pageInfoText().should('contain.text', 'Showing 26 - 30 of 50 items.');
        //The second row of the movie search table should match the text from the specified record in allmovies.json
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', allmovies[25].title);
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', allmovies[29].title);

        //Page 7
        MoviesSearchPage.page7Link().click();
        MoviesSearchPage.pageInfoText().should('contain.text', 'Showing 31 - 35 of 50 items.');
        //The second row of the movie search table should match the text from the specified record in allmovies.json
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', allmovies[30].title);
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', allmovies[34].title);

        //Page 8
        MoviesSearchPage.page8Link().click();
        MoviesSearchPage.pageInfoText().should('contain.text', 'Showing 36 - 40 of 50 items.');
        //The second row of the movie search table should match the text from the specified record in allmovies.json
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', allmovies[35].title);
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', allmovies[39].title);

        //Page 9
        MoviesSearchPage.page9Link().click();
        MoviesSearchPage.pageInfoText().should('contain.text', 'Showing 41 - 45 of 50 items.');
        //The second row of the movie search table should match the text from the specified record in allmovies.json
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', allmovies[40].title);
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', allmovies[44].title);

        //Page 10
        MoviesSearchPage.page10Link().click();
        MoviesSearchPage.pageInfoText().should('contain.text', 'Showing 46 - 50 of 50 items.');
        //The second row of the movie search table should match the text from the specified record in allmovies.json
        MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', allmovies[45].title);
        MoviesSearchPage.getMovieTitleFromTable(6).should('contain.text', allmovies[49].title);

        cy.logOut();
    });

    it('Exercise 8.9: Add a new movie and perform a search (The first and last part of the movie title) using its movie title) ', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        addmovies.slice(0, 5).forEach((e) => {
            let addMovieTitle = e.movietitle;
            let trimMovieTitleOne = addMovieTitle.substring(0, 4);
            let trimMovieTitleTwo = addMovieTitle.substring(6, 10);
            let addMovieOverview = e.movieoverview;
            let addMovieReleaseDate = e.moviereleasedate;
            let addMovieRelDateForSrch = e.outputdateformat;
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

            cy.navToMovieSearchPage();
            MoviesSearchPage.getMovieClearBtn().click();
            MoviesSearchPage.movieTitleSrch().type(trimMovieTitleOne, { delay: 250 });
            MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', addMovieTitle);
            MoviesSearchPage.getMovieRelDateFromTbl(2).should('contain.text', addMovieRelDateForSrch);

            MoviesSearchPage.getMovieClearBtn().click();
            MoviesSearchPage.movieTitleSrch().type(trimMovieTitleTwo, { delay: 250 });
            MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', addMovieTitle);
            MoviesSearchPage.getMovieRelDateFromTbl(2).should('contain.text', addMovieRelDateForSrch);

            //Verify Movie Added
            cy.wait(1500);
            cy.navToMoviesEntityPage();
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

    it('Exercise 8.10: Add a new movie and perform a search (The first and last part of the movie overview)', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        addmovies.slice(0, 5).forEach((f) => {
            let addMovieTitle = f.movietitle;
            let addMovieOverview = f.movieoverview;
            let movOverViewSubStrA = addMovieOverview.substring(0, 4);
            let movOverviewSubStrB = addMovieOverview.substring(6, 13);
            let addMovieReleaseDate = f.moviereleasedate;
            let addMovieRelDateForSrch = f.outputdateformat;
            let addMovieProdCompany = f.movieprodcompany;
            let addMovieCast = f.moviecast;
            let addMovieDirectors = f.moviedirector;
            //Add a movie using data driven testing from addmovies.json
            MoviesEntityPage.createANewMovieBtn().click();
            MoviesEditPage.titleInput().type(addMovieTitle);
            MoviesEditPage.overviewInput().type(addMovieOverview);
            MoviesEditPage.releaseDateCalendar().type(addMovieReleaseDate);
            MoviesEditPage.productionCompaniesSelect().select(addMovieProdCompany);
            MoviesEditPage.directorsSelect().select(addMovieDirectors);
            MoviesEditPage.castSelect().select(addMovieCast)
            MoviesEditPage.saveBtn().click();

            cy.navToMovieSearchPage();
            MoviesSearchPage.getMovieClearBtn().click();
            MoviesSearchPage.movieOverviewSrch().type(movOverViewSubStrA, { delay: 250 });
            MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', addMovieTitle);
            MoviesSearchPage.getMovieRelDateFromTbl(2).should('contain.text', addMovieRelDateForSrch);

            MoviesSearchPage.getMovieClearBtn().click();
            MoviesSearchPage.movieOverviewSrch().type(movOverviewSubStrB, { delay: 250 });
            MoviesSearchPage.getMovieTitleFromTable(2).should('contain.text', addMovieTitle);
            MoviesSearchPage.getMovieRelDateFromTbl(2).should('contain.text', addMovieRelDateForSrch);


            cy.deleteTestMovie(addMovieTitle);
        });
        cy.logOut();

    });

    it('Exercise 8.11: Add a new movie and perform a search (using its production company)', () => {
        cy.loginUsingNavMenu('user', 'user');
        cy.navToMoviesEntityPage();
        addmovies.slice(0, 5).forEach((g) => {
            let addMovieTitle = g.movietitle;
            let addMovieOverview = g.movieoverview;
            let movOverViewSubStrA = addMovieOverview.substring(0, 4);
            let movOverviewSubStrB = addMovieOverview.substring(6, 13);
            let addMovieReleaseDate = g.moviereleasedate;
            let addMovieRelDateForSrch = g.outputdateformat;
            let addMovieProdCompany = g.movieprodcompany;
            let addMovieCast = g.moviecast;
            let addMovieDirectors = g.moviedirector;
            //Add a movie using data driven testing from addmovies.json
            MoviesEntityPage.createANewMovieBtn().click();
            MoviesEditPage.titleInput().type(addMovieTitle);
            MoviesEditPage.overviewInput().type(addMovieOverview);
            MoviesEditPage.releaseDateCalendar().type(addMovieReleaseDate);
            MoviesEditPage.productionCompaniesSelect().select(addMovieProdCompany);
            MoviesEditPage.directorsSelect().select(addMovieDirectors);
            MoviesEditPage.castSelect().select(addMovieCast)
            MoviesEditPage.saveBtn().click();

            cy.navToMovieSearchPage();
            MoviesSearchPage.getMovieClearBtn().click();
            MoviesSearchPage.movieProdCompanyDropDwn().select(addMovieProdCompany)
            MoviesSearchPage.getEntireMoviePageCard().should('contain.text', addMovieTitle);

            cy.deleteTestMovie(addMovieTitle);


        });
        cy.logOut();

    });


});