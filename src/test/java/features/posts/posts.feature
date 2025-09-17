Feature: Posts API Testing

  Background:
    * url baseUrl
    * def utils = read('classpath:features/config/common/utils.js')

  Scenario: Get all posts successfully
    Given path 'posts'
    When method GET
    Then status 200
    And match response == '#[100]'
    And match each response contains { id: '#number', userId: '#number', title: '#string', body: '#string' }
    And assert responseTime < timeout

  Scenario: Get posts by user ID
    Given path 'posts'
    And param userId = 1
    When method GET
    Then status 200
    And match response == '#[]'
    And match each response.userId == 1

  Scenario: Create new post
    Given path 'posts'
    And def newPost = utils.generateRandomPost()
    And request newPost
    When method POST
    Then status 201
    And match response.userId == newPost.userId
    And match response.title == newPost.title
    And match response.body == newPost.body
    And match response.id == '#number'

  Scenario: Delete post
    Given path 'posts', 1
    When method DELETE
    Then status 200