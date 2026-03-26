const path = require('path');

// =============================================
// Environment variable loading strategy:
//   - CI (GitHub Actions): vars and secrets are passed as JSON blobs
//     via GITHUB_VARS_JSON / GITHUB_SECRETS_JSON env vars.
//     This auto-injects ALL GitHub Variables & Secrets into process.env.
//   - Local: falls back to .env and .env.secret files via dotenv.
// =============================================
if (process.env.GITHUB_VARS_JSON) {
    try {
        const vars = JSON.parse(process.env.GITHUB_VARS_JSON);
        Object.assign(process.env, vars);
    } catch (e) {
        console.warn('[wdio.conf] Failed to parse GITHUB_VARS_JSON:', e.message);
    }
}
if (process.env.GITHUB_SECRETS_JSON) {
    try {
        const secrets = JSON.parse(process.env.GITHUB_SECRETS_JSON);
        Object.assign(process.env, secrets);
    } catch (e) {
        console.warn('[wdio.conf] Failed to parse GITHUB_SECRETS_JSON:', e.message);
    }
}

// Local development: load from .env / .env.secret
if (!process.env.GITHUB_ACTIONS) {
    require('dotenv').config({ path: path.resolve(__dirname, '.env') });
    require('dotenv').config({ path: path.resolve(__dirname, '.env.secret'), override: true });
}

exports.config = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    // ==================
    // Test Configuration
    // ==================
    specs: [
        './tests/features/**/*.feature'
    ],
    suites: {
        smoke: ['./tests/features/login.feature'],
        regression: [
            './tests/features/login.feature',
            './tests/features/cart.feature',
            './tests/features/checkout.feature'
        ]
    },

    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--headless',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--window-size=1920,1080'
            ]
        },
        acceptInsecureCerts: true
    }],

    // ===================
    // Test Configurations
    // ===================
    logLevel: 'warn',
    bail: 0,
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // ========
    // Services
    // ========
    services: [],

    // =========
    // Framework
    // =========
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./tests/step-definitions/**/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        name: [],
        snippets: true,
        source: true,
        strict: false,
        tags: 'not @skip',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },

    // =========
    // Reporters
    // =========
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            useCucumberStepReporter: true
        }]
    ],

    // =====
    // Hooks
    // =====
    afterStep: async function (step, scenario, result, context) {
        if (!result.passed) {
            await browser.takeScreenshot();
        }
    }
};
