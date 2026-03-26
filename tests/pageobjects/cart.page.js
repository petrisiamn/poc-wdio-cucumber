const Page = require('./page');

/**
 * CartPage — the shopping cart page.
 * URL: https://www.saucedemo.com/cart.html
 */
class CartPage extends Page {
    // ==================
    // Element Selectors
    // ==================
    get pageTitle()      { return $('.title'); }
    get cartItems()      { return $$('.cart_item'); }
    get btnCheckout()    { return $('[data-test="checkout"]'); }
    get btnContinue()    { return $('[data-test="continue-shopping"]'); }

    // ==================
    // Page Actions
    // ==================

    /**
     * Get the number of items currently in the cart
     * @returns {Promise<number>}
     */
    async getCartItemCount() {
        return (await this.cartItems).length;
    }

    /**
     * Get the name of a cart item by index
     * @param {number} index — zero-based index
     * @returns {Promise<string>}
     */
    async getCartItemName(index = 0) {
        const items = await this.cartItems;
        const nameEl = await items[index].$('.inventory_item_name');
        return nameEl.getText();
    }

    /**
     * Remove an item from the cart by its index
     * @param {number} index — zero-based index
     */
    async removeItem(index = 0) {
        const items = await this.cartItems;
        const removeBtn = await items[index].$('button');
        await removeBtn.click();
    }

    /**
     * Click checkout button to proceed to checkout
     */
    async checkout() {
        await this.pageTitle.waitForDisplayed();
        await this.btnCheckout.waitForDisplayed();
        await this.btnCheckout.waitForClickable();
        await this.btnCheckout.click();
    }
}

module.exports = new CartPage();
