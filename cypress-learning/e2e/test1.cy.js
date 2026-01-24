describe("Recording 12/25/2025 at 3:39:45 PM", () => {
  it("tests Recording 12/25/2025 at 3:39:45 PM", () => {
    cy.viewport(1339, 911);
    cy.visit("https://demowebshop.tricentis.com/");
    cy.get("div.header img").click();
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/");
    cy.get("#small-searchterms").click();
    cy.get("#small-searchterms").type("laptop");
    cy.get(".ui-autocomplete .ui-menu-item", { timeout: 10000 }).first().should("be.visible").click(); // More robust selector
    cy.location("href").should("include", "laptop");
    cy.get("input[value='Add to cart']", { timeout: 10000 }).first().should("be.visible").click();
    cy.get("#topcartlink span.cart-label").click();
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/cart");
    cy.get("#termsofservice").click();
    cy.get("#checkout").click();
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/login/checkoutasguest?returnUrl=%2Fcart");
    cy.get("input.checkout-as-guest-button", { timeout: 10000 }).should("be.visible").click();
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/onepagecheckout");
    cy.get("#BillingNewAddress_FirstName").should("be.visible").click();
    cy.get("#BillingNewAddress_FirstName").type("Subrat");
    cy.get("#BillingNewAddress_LastName").type("Pradhan");
    cy.get("#BillingNewAddress_Email").type("test@test.com");
    cy.get("#BillingNewAddress_CountryId").select("United States"); // Changed to select for reliability
    cy.get("#BillingNewAddress_City").type("New York");
    cy.get("#BillingNewAddress_Address1").type("123 Test St");
    cy.get("#BillingNewAddress_ZipPostalCode").type("10001");
    cy.get("#BillingNewAddress_PhoneNumber").type("1234567890");

    cy.get("#billing-buttons-container input[type='button']").click();

    // Step 2: Shipping Address
    cy.get("#opc-shipping", { timeout: 10000 }).should("have.class", "active");
    cy.get("#shipping-buttons-container input[type='button']").should("be.visible").click();

    // Step 3: Shipping Method
    cy.get("#opc-shipping_method", { timeout: 10000 }).should("have.class", "active");
    cy.get("#shippingoption_0").should("be.visible").check();
    cy.get("#shipping-method-buttons-container input[type='button']").should("be.visible").click();

    // Step 4: Payment Method
    cy.get("#opc-payment_method", { timeout: 10000 }).should("have.class", "active");
    cy.get("#payment-method-buttons-container input[type='button']").should("be.visible").click();

    // Step 5: Payment Info
    cy.get("#opc-payment_info", { timeout: 10000 }).should("have.class", "active");
    cy.get("#payment-info-buttons-container input[type='button']").should("be.visible").click();

    // Step 6: Confirm Order
    cy.get("#opc-confirm_order", { timeout: 10000 }).should("have.class", "active");
    cy.get("#confirm-order-buttons-container input[type='button']").should("be.visible").click();

    cy.get('h1', { timeout: 20000 }).should('contain', 'Thank you');
    cy.get('.section.order-completed').should('be.visible');
    cy.get('.title').should('contain', 'Your order has been successfully processed!');
    cy.get("input.button-2.order-completed-continue-button").click(); // Corrected to button-2
    cy.location("href").should("include", "tricentis.com/");
  });
});
