const testUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'sekret',
}

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, testUser)
    cy.visit('/')
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
      cy.login({ username: testUser.username, password: testUser.password })
    })

    it('a new note can be created', function () {
      cy.contains('New note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('Save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: true,
        })
      })

      it('it can be made not important', function () {
        cy.get('#note-list')
          .contains('another note cypress')
          .parentsUntil('#note-list')
          .contains('Make not important')
          .click()

        cy.get('#note-list')
          .contains('another note cypress')
          .parentsUntil('#note-list')
          .contains('Make important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'first note',
          important: false,
        })
        cy.createNote({
          content: 'second note',
          important: false,
        })
        cy.createNote({
          content: 'third note',
          important: false,
        })
      })

      it('one of those can be made important', function () {
        cy.get('#note-list')
          .contains('second note')
          .parentsUntil('#note-list')
          .find('button.importance-button')
          .as('theButton')

        cy.get('@theButton').should('contain', 'Make important')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'Make not important')
      })
    })
  })
})
