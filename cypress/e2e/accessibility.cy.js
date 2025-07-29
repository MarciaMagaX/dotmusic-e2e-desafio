import { shortRock } from '../fixtures/songs.json';

describe('Player de música - acessibilidade básica', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/songs', {
      statusCode: 200,
      body: [shortRock],
    }).as('getSongs');

    cy.visit('/');
    cy.wait('@getSongs');
  });

  it('botão de play deve ser focável via teclado', () => {
    cy.get('.play').first().focus();
    cy.get('.play').first().should('be.focused');
  });
}); 