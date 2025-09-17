// Data Generation Functions
function generateRandomUser() {
    var randomId = Math.floor(Math.random() * 1000000);
    var timestamp = new Date().getTime();
    
    return {
        name: 'Test User ' + randomId,
        username: 'testuser' + randomId,
        email: 'testuser' + randomId + '@test.com',
        website: 'test' + randomId + '.com',
        phone: generateRandomPhone(),
        address: generateRandomAddress()
    };
}

function generateRandomPost() {
    var randomId = Math.floor(Math.random() * 1000000);
    
    return {
        userId: Math.floor(Math.random() * 10) + 1,
        title: 'Test Post ' + randomId + ' - ' + generateRandomTitle(),
        body: 'This is a test post body with id ' + randomId + '. ' + generateRandomText(50)
    };
}

function generateRandomComment() {
    var randomId = Math.floor(Math.random() * 1000000);
    
    return {
        postId: Math.floor(Math.random() * 100) + 1,
        name: 'Comment ' + randomId,
        email: 'commenter' + randomId + '@test.com',
        body: generateRandomText(100)
    };
}

// Validation Functions
function validateResponseTime(responseTime, maxTime) {
    return responseTime <= (maxTime || 5000);
}

function validateEmailFormat(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateNotEmpty(value) {
    return value !== null && value !== undefined && value !== '';
}

function validatePositiveNumber(number) {
    return typeof number === 'number' && number > 0;
}

function validateArrayNotEmpty(array) {
    return Array.isArray(array) && array.length > 0;
}

// Utility Functions
function getCurrentTimestamp() {
    return new Date().toISOString();
}

function getRandomElementFromArray(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return null;
    }
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomString(length) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < (length || 10); i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateRandomNumber(min, max) {
    min = min || 1;
    max = max || 1000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function waitForSeconds(seconds) {
    java.lang.Thread.sleep((seconds || 1) * 1000);
}

// Helper Functions for Complex Data
function generateRandomPhone() {
    return '+1-' + generateRandomNumber(100, 999) + '-' + 
           generateRandomNumber(100, 999) + '-' + generateRandomNumber(1000, 9999);
}

function generateRandomAddress() {
    var streets = ['Main St', 'Oak Ave', 'First St', 'Second St', 'Park Ave'];
    var cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    
    return {
        street: generateRandomNumber(1, 999) + ' ' + getRandomElementFromArray(streets),
        suite: 'Suite ' + generateRandomNumber(100, 999),
        city: getRandomElementFromArray(cities),
        zipcode: generateRandomNumber(10000, 99999).toString(),
        geo: {
            lat: (Math.random() * 180 - 90).toFixed(4),
            lng: (Math.random() * 360 - 180).toFixed(4)
        }
    };
}

function generateRandomTitle() {
    var adjectives = ['Amazing', 'Incredible', 'Fantastic', 'Awesome', 'Great'];
    var nouns = ['Journey', 'Adventure', 'Experience', 'Story', 'Tale'];
    
    return getRandomElementFromArray(adjectives) + ' ' + getRandomElementFromArray(nouns);
}

function generateRandomText(wordCount) {
    var words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 
                 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 
                 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
    
    var result = [];
    for (var i = 0; i < (wordCount || 10); i++) {
        result.push(getRandomElementFromArray(words));
    }
    return result.join(' ') + '.';
}

// API Response Validation
function validateSuccessResponse(response, expectedSchema) {
    if (!response) return false;
    
    try {
        karate.match(response, expectedSchema);
        return true;
    } catch (e) {
        karate.log('Schema validation failed:', e.message);
        return false;
    }
}

function extractIdsFromResponse(response) {
    if (!Array.isArray(response)) return [];
    return response.map(function(item) { return item.id; });
}