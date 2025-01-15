describe('Busca', () => {
    context('Quando a música desejada está disponível', () => {
        beforeEach(() => {
            cy.visit('/');
        });

        it('deve exibir a música correta nos resultados', () => {

            const title = 'Bug Suede Shoes';
            const artist = 'Elvis Testley';

            cy.searchSong(title);

            cy.get('.songlist .song')
                .should('have.length', 1)
                .and('be.visible')
                .within(() => {
                    cy.contains(title).should('be.visible');
                    cy.contains(artist).should('be.visible');
                });
        });
    });

    context('Quando o termo "Bug" é pesquisado', () => {
        beforeEach(() => {
            cy.visit('/');
        });

        it('deve exibir 3 resultados', () => {
            cy.searchSong('Bug');

            cy.get('.songlist .song')
                .should('have.length', 3)
                .each(($song) => {
                    cy.wrap($song)
                        .should('be.visible')
                        .and('include.text', 'Bug');
                });
        });
    });

    context('Quando nenhuma música é encontrada', () => {
        beforeEach(() => {
            cy.visit('/');
        });

        it('deve exibir uma mensagem informando que não há resultados', () => {
            cy.searchSong('Um minuto para o fim do mundo');

            cy.get('.songlist').should('not.exist');
            cy.get('.notice')
                .should('be.visible')
                .and('contain.text', 'Desculpe, não encontramos nenhuma música com o termo pesquisado. Tente verificar a ortografia ou buscar por outro título.');
        });
    });
});
