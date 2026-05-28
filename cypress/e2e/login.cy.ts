describe('Login - FakeStore API', () => {
  it('intercepta y valida login correctamente', () => {
    cy.intercept('POST', '**/auth/login').as('loginRequest');

    cy.visit('/login');

    cy.fixture('users').then((users) => {
      cy.fillLoginForm(users.validUser.username, users.validUser.password);
    });

    cy.get('button.w-full').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(201);
      expect(interception.response?.body).to.have.property('token');
    });
  });

  it('redirecciona a la página de productos después de un login exitoso y que aparezca log out', () => {
    cy.visit('/login');
    cy.fixture('users').then((users) => {
      cy.fillLoginForm(users.validUser.username, users.validUser.password);
    });
    cy.get('button.w-full').click();
    cy.url().should('include', '/products/list');
    cy.contains('Log Out').should('be.visible');
  });

  it('login fallido con usuario alternativo', () => {
    
    cy.intercept('POST', '**/auth/login').as('loginRequest');
    cy.visit('/login');
    cy.fixture('users').then((users) => {
      cy.fillLoginForm(users.alternativeUser.username, users.alternativeUser.password);
    });
    cy.get('button.w-full').click();
    cy.wait('@loginRequest').then((interception) => {
    expect(interception.response?.statusCode).to.eq(401);
    cy.get('p.font-medium').should('be.visible').contains('Invalid username or password');
    });
  });
});