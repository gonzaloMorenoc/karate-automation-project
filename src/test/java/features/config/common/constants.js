var Constants = {
    
    // API Endpoints
    ENDPOINTS: {
        USERS: '/users',
        POSTS: '/posts',
        COMMENTS: '/comments',
        ALBUMS: '/albums',
        PHOTOS: '/photos',
        TODOS: '/todos'
    },
    
    // HTTP Status Codes
    STATUS: {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
    },
    
    // Content Types
    CONTENT_TYPES: {
        JSON: 'application/json',
        XML: 'application/xml',
        FORM_DATA: 'application/x-www-form-urlencoded'
    },
    
    // Test Data Limits
    LIMITS: {
        MAX_USERS: 10,
        MAX_POSTS: 100,
        MAX_RESPONSE_TIME: 5000,
        MIN_STRING_LENGTH: 1,
        MAX_STRING_LENGTH: 255
    },
    
    // Common Test Values
    TEST_VALUES: {
        INVALID_ID: 999999,
        NEGATIVE_ID: -1,
        ZERO_ID: 0,
        STRING_ID: 'invalid'
    }
};

function getEndpoint(name) {
    return Constants.ENDPOINTS[name] || '';
}

function getStatus(name) {
    return Constants.STATUS[name] || 200;
}

function getLimit(name) {
    return Constants.LIMITS[name] || 0;
}