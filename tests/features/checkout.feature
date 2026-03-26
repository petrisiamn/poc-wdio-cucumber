@checkout
Feature: Checkout Process

  As a user of SauceDemo
  I want to complete a purchase
  So that I can order my selected products

  Background:
    Given I am on the login page
    And I login with valid credentials
    And I should be redirected to the inventory page

  Scenario: Complete a full purchase
    When I add product "PRODUCT_1" to the cart
    And I open the shopping cart
    And I proceed to checkout
    And I fill in checkout info with first name "John" last name "Doe" and zip "12345"
    And I continue to the overview
    And I finish the order
    Then I should see the order confirmation "Thank you for your order!"

  Scenario: Checkout with empty form fields
    When I add product "PRODUCT_1" to the cart
    And I open the shopping cart
    And I proceed to checkout
    And I continue to the overview
    Then I should see checkout error message "Error: First Name is required"

  Scenario: Verify order completion and return home
    When I add product "PRODUCT_2" to the cart
    And I open the shopping cart
    And I proceed to checkout
    And I fill in checkout info with first name "Jane" last name "Smith" and zip "67890"
    And I continue to the overview
    And I finish the order
    Then I should see the order confirmation "Thank you for your order!"
    When I click back home
    Then I should be redirected to the inventory page
