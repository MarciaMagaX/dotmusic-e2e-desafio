# Desafio Técnico: **DOT Digital Group**

DotMusic é um sistema acadêmico projetado para fins de aprendizado e prática em testes de software. Com funcionalidades como busca de músicas, organização de biblioteca e reprodução, o DotMusic oferece um ambiente ideal para explorar e aplicar técnicas de testes em um contexto prático e realista.

> **Agradecimento especial ao autor original do projeto Fernando Papito por disponibilizar uma base tão completa e didática para a comunidade!**

## 📚 Documentação

### **US01: Busca por nome da música**

**Como um usuário,**
**Quero buscar músicas pelo nome,**
**Para encontrar rapidamente a música que desejo ouvir.**

#### **Critérios de Aceite**

```gherkin
Funcionalidade: Busca de músicas por nome

  Cenário: Busca por termo exato
    Dado que estou na página principal do sistema
    Quando faço uma busca pelo nome completo de uma música disponível
    Então o sistema deve exibir a música correspondente com o nome, artista e álbum.

  Cenário: Busca por termo parcial
    Dado que estou na página principal do sistema
    Quando faço uma busca usando um termo parcial ou comum para músicas disponíveis no catálogo
    Então o sistema deve exibir uma lista de músicas correspondentes ao termo inserido, incluindo nome, artista e álbum.

  Cenário: Busca sem resultados
    Dado que estou na tela de busca
    Quando insiro o nome de uma música inexistente no campo de busca
    Então o sistema deve exibir uma mensagem informando que nenhuma música foi encontrada, como "Nenhuma música encontrada para o termo inserido."
```

------

### **US02: Tocar música**

**Como um usuário,**
**Quero tocar uma música a partir da lista de resultados ou da minha biblioteca,**
**Para que eu possa ouvir a música que escolhi.**

#### **Critérios de Aceite**

```gherkin
Funcionalidade: Reprodução de música

  Cenário: Reproduzir música
    Dado que desejo ouvir a música "Blue Suede Shoes"
    E a música está disponível na lista de resultados ou na minha biblioteca
    Quando seleciono essa música na lista
    E pressiono o botão "Play"
    Então a música selecionada deve começar a tocar
    E o player deve exibir o nome da música, artista e álbum.

  Cenário: Pausar música
    Dado que uma música está sendo reproduzida
    Quando pressiono o botão "Pausar"
    Então a reprodução da música deve ser pausada
    E o botão "Play" deve ser exibido novamente.

  Cenário: Retomar reprodução
    Dado que uma música está pausada
    Quando pressiono o botão "Play"
    Então a reprodução da música deve ser retomada a partir do ponto onde foi pausada.
```

## 🚀 Estimativas

1. **Cenários a serem testados**: 6 cenários (3 para a busca de música e 3 para a reprodução de música).
2. **Tempo médio de execução por cenário**: Aproximadamente **3 minutos**.
3. Tempo total para execução dos 6 cenários:
   - 6 cenários x 3 minutos = **18 minutos**.
4. **Tempo extra para análise de resultados e ajustes**: **10 minutos**.
5. **Tempo para retestes e reporte de bugs**: **2 horas**.
6. **Tempo para construção dos testes automatizados**: **1 hora**.
7. **Tempo total para execução dos testes automatizados (todos os cenários)**: **20 segundos**.

### **Estimativa final**:

- **Construção dos testes automatizados**: **1 hora**
- **Análise, ajustes e reporte de bugs**: **2 horas 10 minutos**

**Total: aproximadamente 3 horas e 10 minutos**.

## 🚀 Projeto de Teste Automatizado

O projeto de teste automatizado para o **DotMusic** utiliza o **Cypress** como framework de testes. Ele foi desenvolvido para validar os cenários descritos acima, garantindo que as funcionalidades principais do sistema funcionem como esperado.

⏰ **Tempo total de execução dos testes automatizados**: Aproximadamente **20 segundos**

### 📊 Visualizar os Resultados dos Testes

Você pode visualizar o resultado dos testes automatizados diretamente no **Cypress Cloud**. Acesse o link público abaixo para analisar a execução dos testes no Test Replay:

[**Cypress Cloud - Resultados dos Testes**](https://cloud.cypress.io/projects/rd383y/runs)

### Estrutura do Projeto

```bash
├── e2e/
│   ├── search.cy.js        # Testes para a funcionalidade de busca
│   ├── playback.cy.js      # Testes para a funcionalidade de reprodução
│   ├── accessibility.cy.js # [NOVO] Teste de acessibilidade (foco no play)
│   ├── integration.cy.js   # [NOVO] Teste de integração básico (play + áudio)
│   ├── player-controls.cy.js # [NOVO] Testes de controles básicos do player
├── fixtures/
│   └── songs.json          # Dados simulados para testes
├── support/
│   ├── commands.js         # Custom Commands utilizados nos testes
│   └── e2e.js              # Configurações globais do Cypress
cypress.config.js           # Configurações do Cypress
package.json                # Dependências e scripts do projeto
```

### Melhorias e Novos Testes Adicionados

- **Acessibilidade:**
  - Adicionado `accessibility.cy.js` para garantir que o botão de play pode receber foco via teclado.
- **Integração:**
  - Adicionado `integration.cy.js` validando o fluxo básico de integração do player (clicar no play e garantir que o áudio é exibido).
- **Controles básicos do player:**
  - Adicionado `player-controls.cy.js` para verificar a presença dos principais controles do player: botão de play, componente de áudio, tempo atual/total e barra de progresso.
- **Ajuste de seletores:**
  - Seletores dos testes revisados para garantir compatibilidade com o HTML atual do player.

Esses novos testes foram criados **com base nos cenários já existentes** e visam complementar e fortalecer a suíte de testes do projeto.

### Pré-requisitos

- **Node.js** (versão 22 ou superior)
- Gerenciador de pacotes **npm** ou **yarn**
- **Cypress** instalado como dependência do projeto

### Como Executar

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/dotmusic.git
   cd dotmusic
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Execute o servidor local do DotMusic.

4. Inicie o Cypress em modo interativo:

   ```bash
   npx cypress open
   # ou
   yarn cypress open
   ```

5. Acesse a aba **E2E Testing** no Cypress, selecione o navegador desejado e clique em **Start E2E Testing**.

6. Escolha o arquivo de teste desejado e execute os cenários.

7. Para executar os testes em modo headless:

   ```bash
   npx cypress run
   # ou
   yarn cypress run
   ```

### Principais Custom Commands

- **`cy.searchSong(searchTerm)`**: Realiza uma busca no sistema pelo termo informado.
- **`cy.playSong(songName)`**: Reproduz uma música pelo nome.
- **`cy.songIsPlaying(songName, duration)`**: Valida se a música está tocando.
- **`cy.songIsPausedOrStopped(songName, duration)`**: Verifica se a música está pausada ou parada.

---

**Contribuição:**

Essas melhorias foram desenvolvidas com base nos cenários já existentes, com o objetivo de ampliar a cobertura de testes e fortalecer a qualidade do projeto DotMusic. Agradeço ao autor original pela base sólida e inspiradora! 