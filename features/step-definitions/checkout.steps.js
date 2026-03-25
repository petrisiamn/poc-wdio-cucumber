const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('expect');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const InventoryPage = require('../pageobjects/inventory.page');

// ==============================
// When Steps
// ==============================

When('I proceed to checkout', async () => {
    await CartPage.checkout();
});

When('I fill in checkout info with first name {string} last name {string} and zip {string}', async (firstName, lastName, zip) => {
    await CheckoutPage.fillInfo(firstName, lastName, zip);
});

When('I continue to the overview', async () => {
    await CheckoutPage.continue();
});

When('I finish the order', async () => {
    await CheckoutPage.finish();
});

When('I click back home', async () => {
    await CheckoutPage.backHome();
});

// ==============================
// Then Steps
// ==============================

Then('I should see the order confirmation {string}', async (expectedMessage) => {
    const actualMessage = await CheckoutPage.getCompleteHeader();
    expect(actualMessage).toBe(expectedMessage);
});

Then('I should see checkout error message {string}', async (expectedError) => {
    const actualError = await CheckoutPage.getErrorMessage();
    expect(actualError).toBe(expectedError);
});
