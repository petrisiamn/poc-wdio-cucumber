const Page = require('./page');

/**
 * CheckoutPage — handles both checkout step one (info) and step two (overview).
 * URL: https://www.saucedemo.com/checkout-step-one.html
 *      https://www.saucedemo.com/checkout-step-two.html
 */
class CheckoutPage extends Page {
    // ============================
    // Step One — Your Information
    // ============================
    get inputFirstName() { return $('[data-test="firstName"]'); }
    get inputLastName()  { return $('[data-test="lastName"]'); }
    get inputZipCode()   { return $('[data-test="postalCode"]'); }
    get btnContinue()    { return $('[data-test="continue"]'); }
    get errorMessage()   { return $('[data-test="error"]'); }

    // ============================
    // Step Two — Overview / Finish
    // ============================
    get btnFinish()      { return $('[data-test="finish"]'); }

    // ============================
    // Complete Page
    // ============================
    get completeHeader()  { return $('.complete-header'); }
    get completeText()    { return $('.complete-text'); }
    get btnBackHome()     { return $('[data-test="back-to-products"]'); }

    // ==================
    // Page Actions
    // ==================

    /**
     * Fill in the checkout information form
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} zipCode
     */
    async fillInfo(firstName, lastName, zipCode) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputZipCode.setValue(zipCode);
    }

    /**
     * Click the Continue button on step one
     */
    async continue() {
        await this.btnContinue.waitForClickable();
        await this.btnContinue.click();
    }

    /**
     * Click the Finish button on step two
     */
    async finish() {
        await this.btnFinish.waitForClickable();
        await this.btnFinish.click();
    }

    /**
     * Get the order completion header text
     * @returns {Promise<string>}
     */
    async getCompleteHeader() {
        await this.completeHeader.waitForDisplayed();
        return this.completeHeader.getText();
    }

    /**
     * Get the checkout error message text
     * @returns {Promise<string>}
     */
    async getErrorMessage() {
        await this.errorMessage.waitForDisplayed();
        return this.errorMessage.getText();
    }

    /**
     * Click Back Home button after order completion
     */
    async backHome() {
        await this.btnBackHome.click();
    }
}

module.exports = new CheckoutPage();
