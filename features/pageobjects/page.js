/**
 * Base Page class — all page objects extend this.
 * Contains shared behavior like open().
 */
module.exports = class Page {
    /**
     * Opens a sub page of the SauceDemo site
     * @param {string} path — path to append to base URL (default: '/')
     */
    open(path = '/') {
        return browser.url(path);
    }
};
