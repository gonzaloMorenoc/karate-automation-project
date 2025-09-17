Feature: Users API Testing

  Background:
    * url baseUrl
    * def utils = read('classpath:features/config/common/utils.js')

  Scenario: Get all users successfully
    Given path 'users'
    When method GET
    Then status 200
    And match response == '#[10]'
    And match each response contains { id: '#number', name: '#string', email: '#string' }
    And assert responseTime < timeout

  Scenario: Get specific user by ID
    Given path 'users', 1
    When method GET
    Then status 200
    And match response.id == 1
    And match response.name == '#string'
    And match response.email == '#regex .+@.+'
    And match response.address == '#object'

  Scenario: Create new user
    Given path 'users'
    And def newUser = utils.generateRandomUser()
    And request newUser
    When method POST
    Then status 201
    And match response.name == newUser.name
    And match response.email == newUser.email
    And match response.id == '#number'

  Scenario: Update existing user
    Given path 'users', 1
    And def updatedUser = utils.generateRandomUser()
    And request updatedUser
    When method PUT
    Then status 200
    And match response.name == updatedUser.name
    And match response.email == updatedUser.email
    And match response.id == 1