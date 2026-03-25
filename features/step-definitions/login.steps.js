const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('expect');
const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

// ==============================
// Given Steps
// ==============================

Given('I am on the login page', async () => {
    await LoginPage.openLoginPage();
});

// ==============================
// When Steps
// ==============================

When('I login with username {string} and password {string}', async (username, password) => {
    await LoginPage.login(username, password);
});

// ==============================
// Then Steps
// ==============================

Then('I should be redirected to the inventory page', async () => {
    const isDisplayed = await InventoryPage.isPageDisplayed();
    expect(isDisplayed).toBe(true);
});

Then('the page title should be {string}', async (expectedTitle) => {
    const actualTitle = await InventoryPage.getPageTitle();
    expect(actualTitle).toBe(expectedTitle);
});

Then('I should see error message {string}', async (expectedError) => {
    const actualError = await LoginPage.getErrorMessage();
    expect(actualError).toBe(expectedError);
});
