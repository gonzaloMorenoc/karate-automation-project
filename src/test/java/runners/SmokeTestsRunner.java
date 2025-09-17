package runners;

import com.intuit.karate.junit5.Karate;

public class SmokeTestsRunner {
    
    @Karate.Test
    public Karate testSmoke() {
        return Karate.run("classpath:features/api")
                .tags("@smoke")
                .reportDir("target/karate-reports/smoke")
                .outputCucumberJson(true);
    }
}