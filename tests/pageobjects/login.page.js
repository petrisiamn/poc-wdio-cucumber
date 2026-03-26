const Page = require('./page');

/**
 * LoginPage — handles the SauceDemo login screen.
 * URL: https://www.saucedemo.com/
 */
class LoginPage extends Page {
    // ==================
    // Element Selectors
    // ==================
    get inputUsername()  { return $('#user-name'); }
    get inputPassword()  { return $('#password'); }
    get btnLogin()       { return $('#login-button'); }
    get errorContainer() { return $('.error-message-container'); }
    get errorMessage()   { return $('[data-test="error"]'); }

    // ==================
    // Page Actions
    // ==================

    /**
     * Login with given credentials
     * @param {string} username
     * @param {string} password
     */
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    /**
     * Get the error message text displayed on failed login
     * @returns {Promise<string>}
     */
    async getErrorMessage() {
        // Wait for the error container to exist in DOM first
        await this.errorContainer.waitForExist({ timeout: 10000 });
        // Then get the text from the error message element
        const errorEl = this.errorMessage;
        await errorEl.waitForExist({ timeout: 5000 });
        return errorEl.getText();
    }

    /**
     * Open the login page and wait for it to load.
     * Clears cookies to prevent stale session redirects.
     */
    async openLoginPage() {
        await browser.url('/');
        await browser.deleteCookies();
        await browser.url('/');
        await this.inputUsername.waitForDisplayed({ timeout: 10000 });
    }
}

module.exports = new LoginPage();
