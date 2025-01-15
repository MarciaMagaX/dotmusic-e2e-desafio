import { shortRock } from '../fixtures/songs.json';

describe('Player de música', () => {
    context('Quando a música desejada está disponível', () => {
        const { title, artist } = shortRock;

        beforeEach(() => {
            cy.intercept('GET', '**/songs', {
                statusCode: 200,
                body: [shortRock],
            }).as('getSongs');

            cy.visit('/');
            cy.wait('@getSongs');
        });

        it('deve tocar a música até o final', () => {
            cy.playSong(title);
            cy.songIsPlaying(title);

            cy.get('audio').each(($audio) => {
                expect($audio[0].paused).to.eq(false);
                expect($audio[0].muted).to.eq(false);
            });

            cy.songIsPausedOrStopped(title);
        });

        it('deve exibir o álbum e o nome da música na barra de controle', () => {
            cy.playSong(title);
            cy.songIsPlaying(title);

            cy.get('.playing').within(() => {
                cy.contains(title).should('be.visible');
                cy.contains(artist).should('be.visible');
            });
        });
    });

    context('Quando uma música está tocando', () => {
        const playingSong = 'All The Small Sprints';

        beforeEach(() => {
            cy.visit('/');
            cy.playSong(playingSong);
        });

        it('deve permitir pausar a música', () => {
            cy.contains('.song', playingSong)
                .find('.pause')
                .click();

            cy.songIsPausedOrStopped(playingSong);

            cy.get('audio').each(($audio) => {
                expect($audio[0].paused).to.eq(true);
            });
        });
    });
});
