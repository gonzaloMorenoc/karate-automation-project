package runners;

import com.intuit.karate.junit5.Karate;

public class AllTestsRunner {
    
    @Karate.Test
    public Karate testAll() {
        return Karate.run("classpath:features/api")
                .reportDir("target/karate-reports")
                .outputCucumberJson(true)
                .outputJunitXml(true);
    }
}