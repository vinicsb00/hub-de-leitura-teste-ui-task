import { faker } from '@faker-js/faker'

describe('Testes End To End do fluxo de cadastro e login', () => {

    /* 
    Testes End To End ou Testes de ponta a ponta, ligam uma série de funcionalidades de um sistema,
    simulando o comportamento do usuário final. Esses testes verificam se diferentes partes do sistema
    funcionam corretamente quando integradas, garantindo que o fluxo completo de uma funcionalidade
    funcione como esperado.
    Aqui iremos criar um teste end to end que cobre o fluxo de cadastro e login de um usuário em um sistema web.
    Em apenas um teste, ou seja, em um único "it", iremos:
    1. Acessar a página de cadastro.
    2. Preencher o formulário de cadastro com dados válidos.
    3. Submeter o formulário e verificar se o cadastro foi bem-sucedido.
    4. Acessar a página de login.
    5. Preencher o formulário de login com as credenciais do usuário recém-cadastrado.
    6. Submeter o formulário de login e verificar se o login foi bem-sucedido.

    Use as boas práticas aprendidas até agora para estruturar o teste.
    */

    beforeEach(() => {
        // Configurações iniciais, se necessário
        cy.visit('register.html');
    });


    it('Deve fazer o cadastro e validar o login com o usuário cadastrado', () => {
        // Criar todo o fluxo aqui dentro deste único "it"
        // Usa o nome e sobrenome no email e deixa tudo minusculo
        const name = faker.person.firstName('female')
        const lastName = faker.person.lastName()
        const nomeCompleto = `${name} ${lastName}`
        
        const email = faker.internet.email({
            firstName: name,
            lastName: lastName
        }).toLowerCase()

        const phone = `119${faker.string.numeric(8)}`
        const password = faker.internet.password({
            length: 12,
        })

        // Faz o Cadastro e valida
         cy.cadastrar(nomeCompleto, email, phone, password)

        // Faz o logout 
        cy.get('.user-actions > .btn-outline-danger > .fas').click()

        // Faz o login com os dados cadastrados e valida
        cy.login(email, password)
    });
});