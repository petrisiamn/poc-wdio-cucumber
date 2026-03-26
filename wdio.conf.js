const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env.secret'), override: true });

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
