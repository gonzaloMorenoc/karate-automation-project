function fn() {
    var env = karate.env || 'dev';
    karate.log('Running tests in environment:', env);
    
    var baseConfig = {
        env: env,
        appName: 'JsonPlaceholder API Tests',
        version: '1.0.0',
        baseUrl: '',
        timeout: 30000,
        retry: { count: 3, interval: 2000 },
        ssl: true,
        debug: false
    };
    
    var envConfig = {};
    try {
        envConfig = karate.read('classpath:features/config/environments/' + env + '.json');
    } catch (e) {
        karate.log('Environment config not found for:', env, 'Using defaults');
    }
    
    var config = karate.merge(baseConfig, envConfig);
    
    karate.configure('connectTimeout', config.timeout);
    karate.configure('readTimeout', config.timeout);
    karate.configure('ssl', config.ssl);
    karate.configure('retry', config.retry);
    
    if (config.debug) {
        karate.configure('logPrettyRequest', true);
        karate.configure('logPrettyResponse', true);
    }
    
    config.utils = karate.read('classpath:features/config/common/utils.js');
    config.constants = karate.read('classpath:features/config/common/constants.js');
    config.schemas = karate.read('classpath:features/config/common/schemas.js');
    
    karate.log('Final configuration:', config);
    
    return config;
}