/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


//---------------------------------------------- Aula 2 ----------------------------------------------

    //GET funciona pegando o seletor selecionado 
    //TYPE funciona digitando o texto
    //CLICK funciona como um click no botão
    //SHOULD funciona como uma validação de então
    //IT.ONLY testa somente esse teste
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,Mensagem escrita obrigatória,'
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
    //Exer2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('teste')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })
    //Exer3
    it('campo telefone contunua vazio quando preenchido', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })
    //Exer 4// Extra aula 5
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    //Exer 5
    //CLEAR funciona limpando o que foi digitado pelo type
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Gabriel')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Rodrigues')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('teste@teste.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('53984848484')
            .clear()
            .should('have.value', '')
    })
    //Exer 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    //Exer 7
    //fillMandatoryFieldsAndSubmit é uma variavel dinamica criado em ../support/commands.js
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    //Exer 7
    //CONTAINS funciona como um get mas adicionando uma texto contido no seletor
    it('utilizando contains', function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })


//---------------------------------------------- Aula 3 ----------------------------------------------

    //Exer
    //SELECT funciona para escolher algum value dentro do select
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })


    //Exer 1
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    //Exer 2
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })


//---------------------------------------------- Aula 4 ----------------------------------------------

    //Exer
    //CHECK funciona marcando um check box
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    //Exer Extra
    //EACH pega todo array dos chech box
    //WRAP empacota todos itens
    it('marca cada tipo de atendimento"', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio)
                    .check()
                    .should('be.checked')
            })

    })

//---------------------------------------------- Aula 5 ----------------------------------------------

    //Exer
    //UNCHECK funciona desmarcando um check box
    //LAST funciona pegndo o ultimo do array
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })


//---------------------------------------------- Aula 6 ----------------------------------------------

    //SELECTFILE funciona para pegar um arquivo em uma determinada pasta

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //{action: 'drag-drop'} é a acão de arrastar o arquivo para dentro do input

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
 
    //FIXTURE pega uma fixture e adiciona um as para ela

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    
})


    