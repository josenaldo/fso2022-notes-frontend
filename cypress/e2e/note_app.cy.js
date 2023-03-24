const appUrl = 'http://localhost:3000'
const apiUrl = 'http://localhost:3001'

const testUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'sekret',
}

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${apiUrl}/api/testing/reset`)
    cy.request('POST', `${apiUrl}/api/users`, testUser)
    cy.visit(appUrl)
  })

  describe('when logged out', function () {
    it('front page can be opened', () => {
      cy.contains('Notes')
      cy.contains(
        'Note app, Department of Computer Science, University of Helsinki 2022'
      )
    })

    it('login form can be opened', () => {
      cy.contains('Login').click()

      cy.get('#username').type(testUser.username)
      cy.get('#password').type(testUser.password)
      cy.get('#login-button').click()

      cy.contains(`Welcome ${testUser.name}!`)
    })

    it('login fails with wrong password', () => {
      cy.contains('Login').click()
      cy.get('#username').type(testUser.username)
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.alert-error').should('contain', 'Wrong credentials')

      cy.get('html').should('not.contain', `Welcome ${testUser.name}!`)
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Login').click()

      cy.get('#username').type(testUser.username)
      cy.get('#password').type(testUser.password)
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.contains('New note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('Save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('New note').click()
        cy.get('#note-input').type('another note cypress')
        cy.contains('Save').click()
      })

      it('it can be made not important', function () {
        cy.contains('another note cypress')
          .parentsUntil('article')
          .contains('Make not important')
          .click()

        cy.contains('another note cypress')
          .parentsUntil('article')
          .contains('Make important')
      })
    })
  })
})
