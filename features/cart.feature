@cart
Feature: Shopping Cart

  As a user of SauceDemo
  I want to add products to my shopping cart
  So that I can purchase them later

  Background:
    Given I am on the login page
    And I login with username "standard_user" and password "secret_sauce"
    And I should be redirected to the inventory page

  Scenario: Add a single item to the cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  # TODO: Fix — add-to-cart button changes to 'Remove' when item already in cart from previous scenario
  @skip
  Scenario: Add multiple items to the cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"
