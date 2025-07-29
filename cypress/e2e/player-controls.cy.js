import { shortRock } from '../fixtures/songs.json';

describe('Player de música - controles básicos', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/songs', {
      statusCode: 200,
      body: [shortRock],
    }).as('getSongs');

    cy.visit('/');
    cy.wait('@getSongs');
  });

  it('deve exibir o botão de play', () => {
    cy.get('.play').should('be.visible');
  });

  it('deve exibir o componente de áudio', () => {
    cy.get('audio').should('exist');
  });

  it('deve exibir o tempo atual e total', () => {
    cy.get('.text-white.text-opacity-70').should('have.length.at.least', 2);
  });

  it('deve exibir a barra de progresso', () => {
    cy.get('.w-full.h-7.flex.group').should('exist');
    cy.get('.h-1.w-full.rounded-md.self-center').should('exist');
  });
}); 