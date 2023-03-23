const appUrl = 'http://localhost:3000'

describe('Note app', function () {
  it('front page can be opened', () => {
    cy.visit(appUrl)
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2022'
    )
  })

  it('front page contains random text', () => {
    cy.visit(appUrl)
    cy.contains('wtf is this app')
  })
})
