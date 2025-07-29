import { shortRock } from '../fixtures/songs.json';

describe('Player de música - fluxo básico de integração', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/songs', {
      statusCode: 200,
      body: [shortRock],
    }).as('getSongs');

    cy.visit('/');
    cy.wait('@getSongs');
  });

  it('deve permitir clicar no play e exibir o áudio', () => {
    cy.get('.play').first().click();
    cy.get('audio').should('exist');
  });
}); 