const appUrl = 'http://localhost:3000'

const testUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'sekret',
}

describe('Note app', function () {
  beforeEach(function () {
    cy.visit(appUrl)
  })

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
  })
})
