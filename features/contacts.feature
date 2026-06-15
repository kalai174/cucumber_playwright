Feature: Contacts Module

  Background:
    Given I open the CRM application
    And I navigate to the Contacts page

  Scenario: Create new contact
    When I create a single contact from json data
    Then the created contact should appear in the contact list

  Scenario: Create multiple contacts with duplicate handling
    When I create multiple contacts from json data
    Then duplicate contacts should be skipped and execution should continue

  Scenario: Search contact by first name
    When I search contact by first name from json data
    Then the searched contact should be displayed

  Scenario: Search contact by Email filter
    When I search contact by filter field "Email"
    Then the filter operation should complete successfully

  Scenario: Search contact by First Name filter
    When I search contact by filter field "First Name"
    Then the filter operation should complete successfully

  Scenario: Search contact by Last Name filter
    When I search contact by filter field "Last Name"
    Then the filter operation should complete successfully

  Scenario: Update contact phone number
    When I update the contact phone number from json data
    Then the updated phone number should persist after refresh

  Scenario: Update contact email
    When I update the contact email from json data
    Then the updated email should persist after refresh

  Scenario: Add notes to contact
    When I add notes to a contact from json data
    Then the notes should be saved successfully

  Scenario: Delete contact
    When I delete a contact from json data
    Then the deleted contact should not appear in search results