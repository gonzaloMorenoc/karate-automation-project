import com.intuit.karate.junit5.Karate;

class TestRunner {
    
    @Karate.Test
    Karate runAllTests() {
        return Karate.run("classpath:features")
                .reportDir("target/karate-reports")
                .outputCucumberJson(true)
                .outputJunitXml(true);
    }
    
    @Karate.Test
    Karate runUsersTests() {
        return Karate.run("classpath:features/users")
                .reportDir("target/karate-reports");
    }
    
    @Karate.Test
    Karate runPostsTests() {
        return Karate.run("classpath:features/posts")
                .reportDir("target/karate-reports");
    }
}