function fn() {
    var env = karate.env;
    if (!env) {
        env = 'dev';
    }
    
    var config = {
        env: env,
        baseUrl: '',
        timeout: 30000,
        retry: { count: 2, interval: 5000 }
    };
    
    var envConfig = karate.read('classpath:features/config/environments/' + env + '.json');
    
    karate.configure('connectTimeout', config.timeout);
    karate.configure('readTimeout', config.timeout);
    karate.configure('retry', config.retry);
    
    return karate.merge(config, envConfig);
}