function generateRandomUser() {
    var randomId = Math.floor(Math.random() * 1000000);
    return {
        name: 'Test User ' + randomId,
        username: 'testuser' + randomId,
        email: 'testuser' + randomId + '@test.com',
        website: 'test' + randomId + '.com'
    };
}

function generateRandomPost() {
    var randomId = Math.floor(Math.random() * 1000000);
    return {
        userId: Math.floor(Math.random() * 10) + 1,
        title: 'Test Post ' + randomId,
        body: 'This is a test post body with id ' + randomId
    };
}

function validateResponseTime(responseTime, maxTime) {
    return responseTime <= maxTime;
}

function getCurrentTimestamp() {
    return new Date().toISOString();
}