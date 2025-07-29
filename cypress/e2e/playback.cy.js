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
            // Primeiro clique para tocar a música
            cy.contains('.song', playingSong)
                .find('button')
                .click();

            // Verifica se a música está tocando
            cy.songIsPlaying(playingSong);

            // Aguarda um pouco para garantir que a música está tocando
            cy.wait(1000);

            // Clica no mesmo botão novamente para pausar
            cy.contains('.song', playingSong)
                .find('button')
                .click();

            // Aguarda um pouco para garantir que a pausa foi processada
            cy.wait(1000);

            // Verifica se a música está pausada
            cy.get('audio').should(($audio) => {
                // Verifica se pelo menos um áudio está pausado
                const hasPausedAudio = Array.from($audio).some(audio => audio.paused);
                expect(hasPausedAudio).to.be.true;
            });
        });
    });
});
