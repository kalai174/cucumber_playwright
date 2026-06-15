Feature: Companies Module

  Background:
    Given I open the CRM application (Companies)

  Scenario: Create Company
    When I navigate to the Companies page
    And I click create company
    And I fill the company form with generated company data
    And I save the company
    Then the company should be created

  Scenario: Search Company
    When I navigate to the Companies page
    And I search and open the created company
    Then the company should be opened successfully

  Scenario: Update Company
    When I navigate to the Companies page
    And I search and open the created company
    And I click the edit icon
    And I update the company details with generated updated data
    Then the company should be updated successfully

  Scenario: Delete Company
    When I navigate to the Companies page
    And I search and open the created company
    And I click the delete icon
    Then the company should be deleted successfully