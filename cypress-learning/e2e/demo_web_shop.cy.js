describe('Demo Web Shop Automation', () => {
    it('should complete a purchase as a guest', () => {
        cy.visit('http://demowebshop.tricentis.com/');

        cy.get('#small-searchterms').type('Computing and Internet');
        cy.get('input.button-1.search-box-button').click();

        cy.get('h2.product-title a').contains('Computing and Internet').click();

        cy.get('#add-to-cart-button-13').click();
        cy.get('#bar-notification').should('be.visible');

        cy.get('.header-links a.ico-cart').click({ force: true });
        cy.url().should('include', '/cart');

        cy.get('#termsofservice').check();
        cy.get('#checkout').click();

        cy.get('input.checkout-as-guest-button').click();

        cy.get('#BillingNewAddress_FirstName').type('John');
        cy.get('#BillingNewAddress_LastName').type('Doe');
        cy.get('#BillingNewAddress_Email').type(`john.doe${Date.now()}@example.com`);
        cy.get('#BillingNewAddress_CountryId').select('United States');
        cy.get('#BillingNewAddress_City').type('New York');
        cy.get('#BillingNewAddress_Address1').type('123 Test Street');
        cy.get('#BillingNewAddress_ZipPostalCode').type('10001');
        cy.get('#BillingNewAddress_PhoneNumber').type('1234567890');
        cy.get('#billing-buttons-container input[type="button"]').click();

        cy.get('#shipping-buttons-container input[type="button"]').should('be.visible').click();

        cy.get('#shippingoption_0').should('be.visible').check();
        cy.get('#shipping-method-buttons-container input[type="button"]').click();

        cy.get('#paymentmethod_0').should('be.visible').check();
        cy.get('#payment-method-buttons-container input[type="button"]').click();

        cy.get('#payment-info-buttons-container input[type="button"]').should('be.visible').click();

        cy.get('#confirm-order-buttons-container input[type="button"]').should('be.visible').click();

        cy.get('h1').should('contain', 'Thank you');
        cy.get('.section.order-completed').should('be.visible');
        cy.get('.title').should('contain', 'Your order has been successfully processed!');
    });
});
