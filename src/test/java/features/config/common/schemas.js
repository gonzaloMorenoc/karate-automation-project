var Schemas = {
    
    USER: {
        id: '#number',
        name: '#string',
        username: '#string',
        email: '#regex .+@.+\\..+',
        address: {
            street: '#string',
            suite: '#string',
            city: '#string',
            zipcode: '#string',
            geo: {
                lat: '#string',
                lng: '#string'
            }
        },
        phone: '#string',
        website: '#string',
        company: {
            name: '#string',
            catchPhrase: '#string',
            bs: '#string'
        }
    },
    
    USER_BASIC: {
        id: '#number',
        name: '#string',
        username: '#string',
        email: '#regex .+@.+\\..+'
    },
    
    POST: {
        id: '#number',
        userId: '#number',
        title: '#string',
        body: '#string'
    },
    
    COMMENT: {
        id: '#number',
        postId: '#number',
        name: '#string',
        email: '#regex .+@.+\\..+',
        body: '#string'
    },
    
    ERROR_RESPONSE: {
        error: '#string',
        message: '#string',
        statusCode: '#number'
    }
};

function getUserSchema(includeAddress) {
    return includeAddress ? Schemas.USER : Schemas.USER_BASIC;
}

function getPostSchema() {
    return Schemas.POST;
}

function getCommentSchema() {
    return Schemas.COMMENT;
}

function getErrorSchema() {
    return Schemas.ERROR_RESPONSE;
}