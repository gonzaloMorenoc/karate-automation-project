package runners;

import com.intuit.karate.junit5.Karate;

public class RegressionTestsRunner {
    
    @Karate.Test
    public Karate testRegression() {
        return Karate.run("classpath:features/api")
                .tags("@regression")
                .reportDir("target/karate-reports/regression")
                .outputCucumberJson(true);
    }
    
    @Karate.Test
    public Karate testUsersOnly() {
        return Karate.run("classpath:features/api/users")
                .reportDir("target/karate-reports/users");
    }
    
    @Karate.Test
    public Karate testPostsOnly() {
        return Karate.run("classpath:features/api/posts")
                .reportDir("target/karate-reports/posts");
    }
}