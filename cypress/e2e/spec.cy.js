/*describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})*/



describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){//para que a primeira coisa antes de todos os testes seja abrir a aplicação
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
    cy.get('#firstName').type("Ingrid")
    cy.get('#lastName').type("Meira")
    cy.get('#email').type("ingrid@email.com")
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type("Ingrid")
    cy.get('#lastName').type("Meira")
    cy.get('#email').type("ingrid@email,com")
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type("Ingrid")
    cy.get('#lastName').type("Meira")
    cy.get('#email').type("ingrid@email.com")
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName')
      .type("Ingrid")
      .should('have.value', 'Ingrid')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type("Meira")
      .should('have.value', 'Meira')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type("ingrid@email.com")
      .should('have.value', 'ingrid@email.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('99999999')
      .should('have.value', '99999999')
      .clear()
      .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product')//poderia ser cy.get('select') pq só tem um select
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('select')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
  })
  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'} )
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
  
})
/*o bloco describe define a suíte de testes, e o bloco it define um caso de teste
cy.visit("urlcomostring"): para visitar uma página web com Cypress, basta passar a URL 
desejada como uma string ao comando.
cy.title(): Get the document.title property of the page that is currently active.
.should(): cria uma assertion, ou seja, vai tentar automaticamente até passar a condição.
.type(): vai digitar no elemento DOM o que estiver entre os parênteses.
.click(): clicar em algum elemento DOM.
cy.get(): é com ela que identificamos os elementos com os quais queremos interagir ou 
fazer verificações. O modo mais comum de usar o comando cy.get() é passando-o um seletor 
CSS como argumento (como uma string), o qual identifica um (ou mais) elemento(s), 
para posterior ação ou verificação. Por exemplo: cy.get('[data-test="avatar"]').
  */