const Page = require('./page');

/**
 * InventoryPage — the product listing page after login.
 * URL: https://www.saucedemo.com/inventory.html
 */
class InventoryPage extends Page {
    // ==================
    // Element Selectors
    // ==================
    get pageTitle()      { return $('.title'); }
    get inventoryItems() { return $$('.inventory_item'); }
    get cartBadge()      { return $('.shopping_cart_badge'); }
    get cartLink()       { return $('.shopping_cart_link'); }
    get sortDropdown()   { return $('[data-test="product-sort-container"]'); }

    // ==================
    // Page Actions
    // ==================

    /**
     * Check if the inventory page is displayed (waits for URL change)
     * @returns {Promise<boolean>}
     */
    async isPageDisplayed() {
        try {
            await browser.waitUntil(
                async () => (await browser.getUrl()).includes('/inventory.html'),
                { timeout: 15000, timeoutMsg: 'Not redirected to inventory page' }
            );
            await this.pageTitle.waitForDisplayed({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get the page title text
     * @returns {Promise<string>}
     */
    async getPageTitle() {
        await this.pageTitle.waitForDisplayed();
        return this.pageTitle.getText();
    }

    /**
     * Add an item to the cart by its product name
     * @param {string} itemName — e.g. "Sauce Labs Backpack"
     */
    async addItemToCart(itemName) {
        const buttonId = itemName
            .toLowerCase()
            .replace(/ /g, '-');
        const addButton = $(`[data-test="add-to-cart-${buttonId}"]`);
        await addButton.waitForDisplayed();
        await addButton.waitForClickable();
        await addButton.click();
    }

    /**
     * Get the current cart item count from the badge
     * @returns {Promise<string>}
     */
    async getCartBadgeCount() {
        await this.cartBadge.waitForDisplayed();
        return this.cartBadge.getText();
    }

    /**
     * Click the cart icon to navigate to the cart page
     */
    async openCart() {
        await this.cartLink.click();
    }
}

module.exports = new InventoryPage();
