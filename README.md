# Javascript, Cypress, and Playwright Learning Repository

This repository is designed for learning and practicing JavaScript, Cypress, and Playwright. It separates the two testing frameworks into distinct directories to keep the workspace organized.

## 📂 Project Structure

```
private-practice-repo/
├── cypress-learning/       # All Cypress related code
│   ├── e2e/               # Test files
│   ├── fixtures/          # Test data
│   └── support/           # Custom commands and configuration
├── playwright-learning/    # All Playwright related code
├── cypress.config.js       # Cypress configuration
├── playwright.config.js    # Playwright configuration
└── package.json            # Project dependencies and scripts
```

## 🛠️ Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can check by running `node -v` in your terminal.

## 🚀 Installation

1.  Clone this repository (if you haven't already).
2.  Install all dependencies:
    ```bash
    npm install
    ```
    This command installs Cypress, Playwright, and other necessary packages.

3.  Install Playwright Browsers:
    ```bash
    npx playwright install
    ```

## 🌲 Cypress

### Running Cypress

**Interactive Mode (Test Runner):**
Opens the Cypress GUI to interactively run and debug tests.
```bash
npm run cypress:open
```

**Headless Mode:**
Runs all tests in the terminal without opening the browser window. Useful for CI/CD or quick checks.
```bash
npm run cypress:run
```

### Writing Cypress Tests
- Create new test files in: `cypress-learning/e2e/`
- File extension: `.cy.js` (or `.cy.ts`)

## 🎭 Playwright

### Running Playwright

**Run All Tests:**
Runs all Playwright tests in headless mode.
```bash
npm run playwright:test
```

**Show Report:**
Opens the HTML report from the last test run.
```bash
npm run playwright:report
```

### Writing Playwright Tests
- Create new test files in: `playwright-learning/`
- File extension: `.spec.js` (or `.spec.ts`)

## 🔧 Maintenance

### Updating Dependencies
To update Cypress and Playwright to their latest versions, run:
```bash
npm update
```

### Clean Install
If you encounter weird issues, try deleting `node_modules` and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```
(On Windows Command Prompt: `rmdir /s /q node_modules` and `del package-lock.json`)
