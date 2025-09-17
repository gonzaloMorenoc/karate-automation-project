@users @api
Feature: Users API Testing

  Background:
    * url baseUrl
    * def userSchema = schemas.getUserSchema(true)
    * def userBasicSchema = schemas.getUserSchema(false)

  @smoke @positive
  Scenario: Get all users successfully
    Given path constants.getEndpoint('USERS')
    When method GET
    Then status constants.getStatus('OK')
    And match response == '#[10]'
    And match each response contains userBasicSchema
    And assert utils.validateResponseTime(responseTime, timeout)

  @smoke @positive
  Scenario: Get specific user by ID
    Given path constants.getEndpoint('USERS'), 1
    When method GET
    Then status constants.getStatus('OK')
    And match response == userSchema
    And match response.id == 1
    And assert utils.validateEmailFormat(response.email)

  @regression @positive
  Scenario: Create new user
    Given path constants.getEndpoint('USERS')
    And def newUser = utils.generateRandomUser()
    And request newUser
    When method POST
    Then status constants.getStatus('CREATED')
    And match response.name == newUser.name
    And match response.email == newUser.email
    And match response.id == '#number'
    And assert utils.validatePositiveNumber(response.id)

  @regression @positive
  Scenario: Update existing user
    Given path constants.getEndpoint('USERS'), 1
    And def updatedUser = utils.generateRandomUser()
    And request updatedUser
    When method PUT
    Then status constants.getStatus('OK')
    And match response.name == updatedUser.name
    And match response.email == updatedUser.email
    And match response.id == 1

  @regression @negative
  Scenario: Get user with invalid ID
    Given path constants.getEndpoint('USERS'), constants.TEST_VALUES.INVALID_ID
    When method GET
    Then status constants.getStatus('NOT_FOUND')

  @regression @negative
  Scenario: Create user with invalid email
    Given path constants.getEndpoint('USERS')
    And def invalidUser = utils.generateRandomUser()
    And set invalidUser.email = 'invalid-email'
    And request invalidUser
    When method POST
    Then status constants.getStatus('CREATED')

  @performance
  Scenario: Verify users API performance
    Given path constants.getEndpoint('USERS')
    When method GET
    Then status constants.getStatus('OK')
    And assert utils.validateResponseTime(responseTime, constants.getLimit('MAX_RESPONSE_TIME'))