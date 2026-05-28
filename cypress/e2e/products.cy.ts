import { Product } from "../../src/app/core/interfaces/product";

describe('Productos - FakeStore API', () => {
  it('intercepta y valida datos de productos correctamente', () => {

    cy.intercept('GET', '**/products*').as('getProducts');

    cy.visit('/');

    cy.wait('@getProducts').then((interception) => {

      // Validar status
      expect(interception.response?.statusCode).to.eq(200);

      const products = interception.response?.body;

      // Validar tipo y contenido
      expect(products).to.be.an('array');
      expect(products.length).to.be.greaterThan(0);


      // Validar estructura (FakeStore API)
      products.forEach((product: any) => {
      expect(product).to.have.property('id').that.is.a('number');
      expect(product).to.have.property('title').that.is.a('string');
      expect(product).to.have.property('price').that.is.a('number');
      expect(product).to.have.property('description').that.is.a('string');
      expect(product).to.have.property('category').that.is.a('string');
      expect(product).to.have.property('image').that.is.a('string');

      // Validación adicional importante
      expect(product.price).to.be.greaterThan(0);
     });
    });
  });

  //it('Should create products successfully', () => {
    // Add products
  //cy.fixture('products').then((data) => {
    //data.products.forEach((product: Product) => {
      //cy.createProduct(product).then((response) => {
        //expect(response.status).to.eq(201);
        //expect(response.body).to.include(product);
        //expect(response.body).to.have.property('id').that.is.a('number');
     // });
   // });
 //});
//});
  
});