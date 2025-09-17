@posts @api
Feature: Posts API Testing

  Background:
    * url baseUrl
    * def postSchema = schemas.getPostSchema()

  @smoke @positive
  Scenario: Get all posts successfully
    Given path constants.getEndpoint('POSTS')
    When method GET
    Then status constants.getStatus('OK')
    And match response == '#[100]'
    And match each response contains postSchema
    And assert utils.validateResponseTime(responseTime, timeout)
    And assert utils.validateArrayNotEmpty(response)

  @smoke @positive
  Scenario: Get posts by user ID
    Given path constants.getEndpoint('POSTS')
    And param userId = 1
    When method GET
    Then status constants.getStatus('OK')
    And match response == '#[]'
    And match each response.userId == 1
    And match each response contains postSchema

  @regression @positive
  Scenario: Get specific post by ID
    Given path constants.getEndpoint('POSTS'), 1
    When method GET
    Then status constants.getStatus('OK')
    And match response == postSchema
    And match response.id == 1
    And assert utils.validatePositiveNumber(response.userId)

  @regression @positive
  Scenario: Create new post
    Given path constants.getEndpoint('POSTS')
    And def newPost = utils.generateRandomPost()
    And request newPost
    When method POST
    Then status constants.getStatus('CREATED')
    And match response.userId == newPost.userId
    And match response.title == newPost.title
    And match response.body == newPost.body
    And match response.id == '#number'
    And assert utils.validatePositiveNumber(response.id)

  @regression @positive
  Scenario: Update existing post
    Given path constants.getEndpoint('POSTS'), 1
    And def updatedPost = utils.generateRandomPost()
    And request updatedPost
    When method PUT
    Then status constants.getStatus('OK')
    And match response.title == updatedPost.title
    And match response.body == updatedPost.body
    And match response.id == 1

  @regression @positive
  Scenario: Delete post
    Given path constants.getEndpoint('POSTS'), 1
    When method DELETE
    Then status constants.getStatus('OK')

  @regression @negative
  Scenario: Get post with invalid ID
    Given path constants.getEndpoint('POSTS'), constants.TEST_VALUES.INVALID_ID
    When method GET
    Then status constants.getStatus('NOT_FOUND')

  @regression @negative
  Scenario: Create post with missing userId
    Given path constants.getEndpoint('POSTS')
    And def invalidPost = utils.generateRandomPost()
    And remove invalidPost.userId
    And request invalidPost
    When method POST
    Then status constants.getStatus('CREATED')

  @performance
  Scenario: Verify posts API performance
    Given path constants.getEndpoint('POSTS')
    When method GET
    Then status constants.getStatus('OK')
    And assert utils.validateResponseTime(responseTime, constants.getLimit('MAX_RESPONSE_TIME'))

  @datadriven
  Scenario Outline: Get posts for multiple users
    Given path constants.getEndpoint('POSTS')
    And param userId = <userId>
    When method GET
    Then status constants.getStatus('OK')
    And match each response.userId == <userId>
    
    Examples:
      | userId |
      | 1      |
      | 2      |
      | 3      |