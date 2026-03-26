@login
Feature: Login to SauceDemo

  As a user of SauceDemo
  I want to log in with my credentials
  So that I can access the product inventory

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When I login with valid credentials
    Then I should be redirected to the inventory page
    And the page title should be "Products"

  @negative
  Scenario: Failed login with invalid credentials
    When I login with invalid credentials
    Then I should see error message "Epic sadface: Username and password do not match any user in this service"
