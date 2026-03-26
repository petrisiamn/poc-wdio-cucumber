const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('expect');
const InventoryPage = require('../pageobjects/inventory.page');

// ==============================
// When Steps
// ==============================

When('I add product {string} to the cart', async (productKey) => {
    const itemName = process.env[productKey] || productKey;
    await InventoryPage.addItemToCart(itemName);
});

When('I add {string} to the cart', async (itemName) => {
    await InventoryPage.addItemToCart(itemName);
});

When('I open the shopping cart', async () => {
    await InventoryPage.openCart();
});

// ==============================
// Then Steps
// ==============================

Then('the cart badge should show {string}', async (expectedCount) => {
    const actualCount = await InventoryPage.getCartBadgeCount();
    expect(actualCount).toBe(expectedCount);
});
