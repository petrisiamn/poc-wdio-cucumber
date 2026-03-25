# 🧪 poc-wdio-cucumber

> **WebdriverIO + Cucumber** automation testing PoC with **GitHub Actions CI/CD** — targeting [SauceDemo](https://www.saucedemo.com).

---

## 📚 Tech Stack

| Technology | Purpose |
|---|---|
| [WebdriverIO](https://webdriver.io/) | Browser automation framework |
| [Cucumber](https://cucumber.io/) | BDD test framework (Gherkin syntax) |
| [Allure](https://allurereport.org/) | Test reporting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [ChromeDriver](https://chromedriver.chromium.org/) | Chrome browser driver |

## 📁 Project Structure

```
poc-wdio-cucumber/
├── .github/workflows/
│   └── test.yml                    # GitHub Actions CI/CD pipeline
├── features/
│   ├── pageobjects/
│   │   ├── page.js                 # Base page class
│   │   ├── login.page.js           # Login page object
│   │   ├── inventory.page.js       # Inventory page object
│   │   ├── cart.page.js            # Cart page object
│   │   └── checkout.page.js        # Checkout page object
│   ├── step-definitions/
│   │   ├── login.steps.js          # Login step definitions
│   │   ├── cart.steps.js           # Cart step definitions
│   │   └── checkout.steps.js       # Checkout step definitions
│   ├── login.feature               # Login test scenarios
│   ├── cart.feature                # Cart test scenarios
│   └── checkout.feature            # Checkout test scenarios
├── wdio.conf.js                    # WebdriverIO configuration
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (recommend v20)
- **Google Chrome** (latest stable)

### Installation

```bash
git clone <your-repo-url>
cd poc-wdio-cucumber
npm install
```

### Running Tests

```bash
# Run all tests
npx wdio run wdio.conf.js

# Run smoke tests only (login)
npx wdio run wdio.conf.js --suite smoke

# Run full regression suite
npx wdio run wdio.conf.js --suite regression
```

### Generating Allure Report

```bash
# Generate report from results
npx allure generate allure-results --clean -o allure-report

# Open report in browser
npx allure open allure-report
```

## 🧪 Test Scenarios

| Feature | Scenario | Tags |
|---|---|---|
| **Login** | Successful login with valid credentials | `@login @smoke` |
| **Login** | Failed login with invalid credentials | `@login @negative` |
| **Cart** | Add a single item to the cart | `@cart` |
| **Cart** | Add multiple items to the cart | `@cart` |
| **Checkout** | Complete a full purchase | `@checkout` |
| **Checkout** | Checkout with empty form fields | `@checkout` |
| **Checkout** | Verify order completion and return home | `@checkout` |

## ⚙️ CI/CD Pipeline

The GitHub Actions pipeline (`.github/workflows/test.yml`) runs automatically on:

- **Push** to `main` or `develop` branch
- **Pull requests** targeting `main`

### Pipeline Steps

```
📥 Checkout → 🟢 Setup Node → 🌐 Install Chrome → 📦 Install deps → 🧪 Run Tests → 📊 Upload Reports
```

### Viewing Reports

After a pipeline run, download the **Allure Report** artifact from the GitHub Actions run page to view detailed test results.

## 📝 Test Credentials (SauceDemo)

| Username | Password | Description |
|---|---|---|
| `standard_user` | `secret_sauce` | ✅ Standard user — all features work |
| `locked_out_user` | `secret_sauce` | 🔒 Locked out — login blocked |
| `problem_user` | `secret_sauce` | ⚠️ Broken images & behavior |
| `performance_glitch_user` | `secret_sauce` | 🐌 Slow responses |

---

Made with ☕ for learning CI/CD automation testing.
