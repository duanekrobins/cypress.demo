/// <reference types="cypress" />
describe('Logging In - Basic Auth', function () {
    // we can use these values to log in
    const username = 'admin'
    const password = 'admin'
it('can post', () => {
    Cypress.Cookies.defaults({
        preserve: 'jhi-authenticationToken',
      })
    cy.request({
      url: 'http://localhost:8080/api/authenticate',
      method: 'POST',
      body: {"username":"admin","password":"admin","rememberMe":false},
    }).then((response) => {
      expect(response.status, 'status').to.equal(200)
      console.log(response.body)
    })
  })
})