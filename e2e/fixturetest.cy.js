/// <reference types="Cypress" />

import loginPage from '../support/pageObjects/loginPage';       import homePage from '../support/pageObjects/homePage';    
import personPage from '../support/pageObjects/personPage';
import usersPage from '../support/pageObjects/usersPage';   
import personDetailPage from '../support/pageObjects/personDetailPage';                                                    


const HomePage = new homePage();            const LoginPage = new loginPage();      
const PersonPage = new personPage();        const PersonDetailPage = new personDetailPage(); 
const UsersPage = new usersPage();      
      
          
                    




describe('Fixture Test', () => {
  beforeEach(function () {
    // "this" points at the test context object
    cy.fixture('moviesordered').then((moviesordered) => {
        // "this" is still the test context object
        this.moviesordered = moviesordered
      })
    cy.visitFresh("http://localhost:8080");


  })

  
//   it("can find all unique users", () => {
//     let users = [];

//     let expectedUsers = [
//         "Michael Curtiz",
//         "Jessie Royce Landis",
//         "Alfred Hitchcock",
//         "Thelma Ritter",
//         "Cary Grant",
//         "James Stewart",
//         "James Mason",
//     ];
//     cy.loginUsingNavMenu('user','user');
//     cy.navToPersonPage();
  
//     cy.get('table')
//         .find('tr')
//         .each(($row, index, $list) => {
//             if (index > 0)
//                 //skip the header row
//                 cy.wrap($row)
//                     .find('td')
//                     .eq(1)
//                     .invoke('text')
//                     .then((user) => {
//                         if (!users.includes(user))
//                             users.push(user);
//                     });
//         })
//         .then(() => {
//             cy.log("Found these users...", users);
//             for (let expected of expectedUsers)
//                 expect(users).to.include(expected);
//         });
// });



  it("Verify First and Last Users on the first page of the People Entity Pages --PAGE 1", () => {
    let users = [];
    let expectedUsersPage1 = [
        "Michael Curtiz",
        "Ian Holm",
    ];
    cy.loginUsingNavMenu('user','user');
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

it("Verify First and Last Users on each of the People Entity Pages --LAST PAGE", () => {
  let users = [];
  let expectedUsers = [
      "Mone Kamishiraishi",
      "Paul Henreid",
  ];
  cy.loginUsingNavMenu('user','user');
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
















})