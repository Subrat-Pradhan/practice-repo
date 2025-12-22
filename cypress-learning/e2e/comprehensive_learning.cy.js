/**
 * Cypress Comprehensive Learning Spec
 *
 * This file demonstrates key Cypress features for learning purposes.
 * It uses the official Cypress example site: https://example.cypress.io
 *
 * Concepts covered:
 * 1. Navigation (cy.visit, cy.go)
 * 2. Selectors (cy.get, cy.contains, traversal)
 * 3. Actions (click, type, check, select)
 * 4. Assertions (implicit "should" and explicit "expect")
 * 5. Network Requests (cy.intercept, cy.wait)
 * 6. Hooks (beforeEach)
 */

describe('Cypress Learning Journey', () => {

    // Hook: Runs before each test in this describe block
    beforeEach(() => {
        // cy.visit() loads a remote URL.
        // Ensure you visit the page before trying to interact with elements.
        cy.visit('https://example.cypress.io');
    });

    describe('1. Basic Navigation and Queries', () => {
        it('Should navigate to queries page and find elements', () => {
            // cy.get() selects one or more elements by CSS selector.
            // cy.click() performs a click action.
            // Finding the "Querying" link and clicking it
            cy.get('.home-list')
                .contains('Querying')
                .click();

            // Assert that the URL includes '/commands/querying'
            // .should() creates an assertion. 'include' checks for a substring.
            cy.url().should('include', '/commands/querying');

            // cy.get('#id') selects by ID
            cy.get('#query-btn')
                .should('contain', 'Button'); // Checking text content

            // cy.get('.class') selects by class
            // .first() yields the first element from a list of elements
            cy.get('.query-btn').first().should('contain', 'Button');

            // .contains() finds an element by text content. 
            // Useful when you don't have a specific ID or Class.
            cy.get('#querying')
                .contains('ul', 'apples') // Scoped search: find 'apples' inside '#querying'
                .should('have.class', 'query-list'); // Asserting class existence
        });
    });

    describe('2. User Actions (Interactions)', () => {
        it('Should perform type, clear, and check actions', () => {
            // Navigate to Actions page directly for this test
            cy.visit('https://example.cypress.io/commands/actions');

            // --- Typing ---
            // .type() types into a DOM element (usually an input)
            cy.get('.action-email')
                .type('fake@email.com')
                .should('have.value', 'fake@email.com'); // Verify input value

            // --- Special Keys ---
            // You can type special keys like {enter}, {leftarrow}, etc.
            cy.get('.action-email')
                .type('{leftarrow}{leftarrow}') // Move cursor left twice
                .type('updated'); // Insert text
            // Note: This is just a demo, validating the exact position is complex, 
            // but the action is performed.

            // --- Clearing ---
            // .clear() removes all text from an input
            cy.get('.action-email').clear().should('have.value', '');

            // --- Checkboxes and Radio Buttons ---
            // .check() checks a checkbox or radio button
            // You must provide the value attribute or rely on finding it by other means
            cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
                .check() // Checks all enabled checkboxes found
                .should('be.checked');

            // Unchecking
            cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
                .uncheck()
                .should('not.be.checked');

            // Single radio button
            cy.get('.action-radios [type="radio"]').not('[disabled]')
                .first()
                .check()
                .should('be.checked');

            // --- Select (Dropdown) ---
            // .select() selects an <option> from a <select>
            cy.get('.action-select')
                .select('apples') // Select by text content (or value)
                .should('have.value', 'fr-apples'); // Asserting the value of the select
        });
    });

    describe('3. Assertions (BDD vs TDD)', () => {
        it('Demonstrates common assertions', () => {
            cy.visit('https://example.cypress.io/commands/assertions');

            // --- Implicit Assertions (.should) ---
            // These are chainable and retry automatically until they pass or timeout.
            cy.get('.assertion-table')
                .find('tbody tr:last')
                .should('have.class', 'success')    // Check class
                .and('contain', 'Column content');  // Chain another assertion with .and()

            // --- Explicit Assertions (expect) ---
            // Useful when you need to perform complex logic on a subject.
            // .then() yields the subject (jQuery object) to the callback.
            cy.get('.assertion-table')
                .find('tbody tr:last')
                .then(($tr) => {
                    // jQuery sync formatting
                    const className = $tr.attr('class');

                    // 'expect' is from the Chai library
                    // Not retried automatically like .should()
                    expect(className).to.include('success');
                    expect($tr.text()).to.include('Column content');
                });
        });
    });

    describe('4. Network Requests (Stubbing & Waiting)', () => {
        it('Should intercept and wait for network calls', () => {
            cy.visit('https://example.cypress.io/commands/network-requests');

            // cy.intercept() allows you to spy on or stub network requests.
            // Ideally, define intercepts BEFORE the action that triggers them.

            // Alias the request with .as('aliasName')
            cy.intercept('GET', '**/comments/*').as('getComment');

            // Trigger the request
            // Using class verified via browser inspection
            cy.get('.network-btn').click();

            // cy.wait() pauses the test until the aliased request completes.
            // It yields the interception object, allowing inspection of request/response.
            cy.wait('@getComment').its('response.statusCode').should('eq', 200);

            // --- Stubbing a Response ---
            // Forcing the server to return specific data
            cy.intercept('POST', '**/comments', {
                statusCode: 201,
                body: {
                    name: 'Using fixtures to represent data',
                    email: 'hello@cypress.io',
                    body: 'Fixtures are a great way to mock data',
                },
                delay: 500, // Simulate network latency
            }).as('postComment');

            // Using class verified via browser inspection
            cy.get('.network-post').click();

            cy.wait('@postComment');

            // Validate the UI updated based on our stubbed response
            // We rely on text content for safety
            cy.contains('Fixtures are a great way to mock data').should('be.visible');
        });
    });

});
