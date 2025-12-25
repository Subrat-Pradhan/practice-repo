describe("2", () => {
  it("tests 2", () => {
    cy.viewport(1339, 911);
    cy.visit("https://demowebshop.tricentis.com/");
    cy.get("#small-searchterms").click();
    cy.get("#small-searchterms").type("laptop");
    cy.get("input[type='submit']").click();
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/search?q=laptop");
    cy.get("div.master-wrapper-main img").click();
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/141-inch-laptop");
    cy.get("#add-to-cart-button-31").click();
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

    cy.get("#billing-buttons-container > input", { timeout: 10000 }).should("be.visible").click();

    // Shipping Address/Method section might take time to expand
    cy.get("#shipping-buttons-container > input", { timeout: 10000 }).should("be.visible").click();

    cy.get("#payment-method-buttons-container > input", { timeout: 10000 }).should("be.visible").click();

    cy.get("#payment-info-buttons-container > input", { timeout: 10000 }).should("be.visible").click();

    cy.get("#confirm-order-buttons-container > input", { timeout: 10000 }).should("be.visible").click();

    cy.location("href", { timeout: 10000 }).should("eq", "https://demowebshop.tricentis.com/checkout/completed/");
    cy.get("div.master-wrapper-main input").should("be.visible").click();
    cy.location("href").should("eq", "https://demowebshop.tricentis.com/");
  });
});
