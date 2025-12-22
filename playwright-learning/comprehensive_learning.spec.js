/**
 * Playwright Comprehensive Learning Spec
 *
 * This file demonstrates key Playwright features for learning purposes.
 * It uses a popular testing sandbox: https://the-internet.herokuapp.com
 *
 * Concepts covered:
 * 1. Structuring Tests (test, expect)
 * 2. Navigation (page.goto)
 * 3. Locators (Advanced: getByRole, getByText, etc.)
 * 4. Actions (click, fill, check)
 * 5. Assertions (Web-first assertions like toBeVisible)
 * 6. Network Handling (route, waitForResponse)
 * 7. Hooks (test.beforeEach)
 */

// Import 'test' and 'expect' from the Playwright test runner
const { test, expect } = require('@playwright/test');

test.describe('Playwright Learning Journey', () => {

    // Hook: Runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        // Navigation is async, must use 'await'
        await page.goto('https://the-internet.herokuapp.com/');
    });

    test.describe('1. Navigation and Basic Interaction', () => {
        test('Should navigate to a page and verify content', async ({ page }) => {
            // Find element by text and click it
            // Playwright auto-waits for the element to be actionable
            await page.getByText('Form Authentication').click();

            // Assert that URL contains expected text
            // 'expect' with 'page' usually checks URL or title
            await expect(page).toHaveURL(/login/);

            // Verify header is visible
            // getByRole is the preferred locator strategy (ACCESSIBILITY FIRST)
            await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
        });
    });

    test.describe('2. Locators and Inputs', () => {
        test('Should handle inputs and click actions', async ({ page }) => {
            await page.getByText('Form Authentication').click();

            // --- Filling Inputs ---
            // getByLabel is great for forms linked with <label for="...">
            // If labels aren't available, we might fall back to css locators.
            // This page has IDs username/password but no standard labels for them in a way getByLabel finds easily sometimes.
            // Let's use CSS selector for specifics if semantic locators fail, but here user/pass usually works.

            // Let's use ID selector (CSS)
            await page.locator('#username').fill('tomsmith');

            // Type into password field
            await page.locator('#password').fill('SuperSecretPassword!');

            // Click Login button
            // Use getByRole for finding buttons with specific text
            await page.getByRole('button', { name: 'Login' }).click();

            // --- Assertions ---
            // Verify success message
            // we can check if the element contains text
            await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

            // Verify Logout button exists
            // "toBeVisible" waits until the element appears (retry logic built-in)
            await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
        });

        test('Should handle Checkboxes', async ({ page }) => {
            // Go back to home for this test context or navigate directly
            await page.goto('https://the-internet.herokuapp.com/checkboxes');

            // Locate checkboxes. 
            // They are inside a form usually.
            // We can select by direct checkbox input index if there are no unique IDs
            const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
            const checkbox2 = page.locator('input[type="checkbox"]').nth(1);

            // Assert initial state
            // checkbox 1 is usually unchecked, 2 is checked
            expect(await checkbox1.isChecked()).toBeFalsy();
            expect(await checkbox2.isChecked()).toBeTruthy();

            // Check the first one
            await checkbox1.check();

            // Uncheck the second one
            await checkbox2.uncheck();

            // Verify flip
            expect(await checkbox1.isChecked()).toBeTruthy();
            expect(await checkbox2.isChecked()).toBeFalsy();
        });
    });

    test.describe('3. Dynamic Content & Waits', () => {
        test('Should wait for element to appear (Dynamic Loading)', async ({ page }) => {
            // Navigate directly to the example page to ensure stability
            await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

            // Click "Start"
            // Using getByText based on verification to be robust
            await page.getByText('Start').click();

            // Wait for the text "Hello World!" to appear. 
            // Playwright automates waiting! You generally DO NOT need explicit waits like sleep.
            // This assertion will effectively wait for the element to attach and be visible up to the timeout limit.
            // Increased timeout to be safe.
            await expect(page.getByText('Hello World!')).toBeVisible({ timeout: 15000 });
        });
    });

    test.describe('4. Network Interception', () => {
        test('Should mock a network request', async ({ page }) => {
            // Let's go to a page that makes requests, or we can just mock a request on any page.
            // We will intercept a request to a non-existent endpoint to prove it works

            // page.route() intercepts network requests
            await page.route('**/api/test-data', async route => {
                // Fulfill the request with custom data
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ message: "Mocked Data Success" })
                });
            });

            // Trigger code that would call this API (Simulating a fetch call in browser console for demo)
            const response = await page.evaluate(async () => {
                const res = await fetch('/api/test-data');
                return res.json();
            });

            // Assert the response matches our mock
            expect(response.message).toBe("Mocked Data Success");
        });
    });

});
