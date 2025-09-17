# 🚀 Karate API Automation Framework

Scalable API testing framework using **Karate DSL 1.4.1** for comprehensive REST API automation.

## 🔧 Problema Resuelto: "TestEngine failed to discover tests"

**El problema:** JUnit Jupiter no podía descubrir los tests porque los runners tenían clases y métodos con visibilidad `package-private` en lugar de `public`.

**La solución:** Cambiar todas las clases y métodos de test a `public`:
```java
// ❌ Antes (no funciona)
class AllTestsRunner {
    @Karate.Test
    Karate testAll() { ... }
}

// ✅ Después (funciona correctamente)
public class AllTestsRunner {
    @Karate.Test
    public Karate testAll() { ... }
}
```

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Test](#quick-test)
- [Project Structure](#project-structure)
- [Execution Commands](#execution-commands)
- [Environment Management](#environment-management)
- [Test Organization](#test-organization)
- [Reporting](#reporting)
- [Troubleshooting](#troubleshooting)

## ✅ Prerequisites

- **Java 11+** (JDK 11 or higher)
- **Maven 3.6+**
- **IDE** (IntelliJ IDEA, Eclipse, or VS Code)

## 🚀 Quick Test

**Opción 1: Usando script (Recomendado)**
```bash
# MacOS/Linux
chmod +x test-execution.sh
./test-execution.sh

# Windows
test-execution.bat
```

**Opción 2: Comandos manuales**
```bash
# Limpiar y probar
mvn clean test -Dtest=SmokeTestsRunner

# Si funciona, ver reporte en:
open target/karate-reports/karate-summary.html
```

## 🏗️ Project Structure

```
src/test/java/
├── karate-config.js                 # Global configuration
├── runners/                         # Test execution runners (PUBLIC CLASSES!)
│   ├── AllTestsRunner.java         #   All tests execution
│   ├── SmokeTestsRunner.java       #   Smoke tests only
│   └── RegressionTestsRunner.java  #   Regression & specific suites
├── features/
│   ├── config/
│   │   ├── environments/           # Environment-specific configs
│   │   │   ├── dev.json           #   Development environment
│   │   │   ├── int.json           #   Integration environment
│   │   │   └── pro.json           #   Production environment
│   │   └── common/                # Shared utilities
│   │       ├── utils.js           #   Helper functions
│   │       ├── constants.js       #   Application constants
│   │       └── schemas.js         #   Response validation schemas
│   └── api/                       # API test features
│       ├── users/                 #   Users API tests
│       │   └── users.feature
│       └── posts/                 #   Posts API tests
│           └── posts.feature
└── resources/
    └── logback-test.xml           # Logging configuration
```

## ⚡ Execution Commands

### Basic Execution

```bash
# Run smoke tests (fastest - recommended for first test)
mvn test -Dtest=SmokeTestsRunner

# Run all tests
mvn test -Dtest=AllTestsRunner

# Run regression tests
mvn test -Dtest=RegressionTestsRunner
```

### Profile-Based Execution

```bash
# Smoke tests profile
mvn test -Psmoke

# Regression tests profile  
mvn test -Pregression

# All tests (default)
mvn test
```

### Environment-Based Execution

```bash
# Development (default)
mvn test -Dtest=SmokeTestsRunner

# Integration
mvn test -Pint -Dtest=SmokeTestsRunner

# Production  
mvn test -Ppro -Dtest=SmokeTestsRunner
```

### Tag-Based Execution

```bash
# Run by single tag
mvn test -Dkarate.options="--tags @smoke"
mvn test -Dkarate.options="--tags @regression"
mvn test -Dkarate.options="--tags @users"
mvn test -Dkarate.options="--tags @positive"

# Run by multiple tags (AND)
mvn test -Dkarate.options="--tags @smoke and @positive"

# Exclude tags
mvn test -Dkarate.options="--tags ~@negative"
```

### Specific Test Execution

```bash
# Only Users API tests
mvn test -Dtest=RegressionTestsRunner#testUsersOnly

# Only Posts API tests
mvn test -Dtest=RegressionTestsRunner#testPostsOnly

# Single feature file
mvn test -Dkarate.options="classpath:features/api/users/users.feature"
```

## 🌍 Environment Management

### Environment Configuration Files

Each environment has its own JSON configuration file:

- **dev.json**: Development settings with debug enabled (10s timeout)
- **int.json**: Integration testing with moderate timeouts (15s timeout)
- **pro.json**: Production-like settings with strict timeouts (30s timeout)

### Override Configuration

```bash
# Override environment
mvn test -Dkarate.env=int -Dtest=SmokeTestsRunner

# Override base URL (useful for local testing)
mvn test -Dkarate.baseUrl=http://localhost:8080 -Dtest=SmokeTestsRunner
```

## 🏷️ Test Organization

### Available Tags

| Tag | Description | Execution Time | Usage |
|-----|-------------|--------|--------|
| `@smoke` | Critical happy path tests | ~2-3 min | Quick validation |
| `@regression` | Comprehensive test coverage | ~10-15 min | Full validation |  
| `@positive` | Valid scenario tests | ~5-8 min | Success cases |
| `@negative` | Error scenario tests | ~3-5 min | Failure cases |
| `@performance` | Response time validation | ~2-3 min | Performance checks |
| `@users` | User API specific tests | ~5-7 min | User management |
| `@posts` | Post API specific tests | ~4-6 min | Content management |

### Test Execution Strategy

```bash
# 🚀 Quick validation (2-3 minutes)
mvn test -Psmoke

# 🔍 Comprehensive testing (10-15 minutes)  
mvn test -Pregression

# 🎯 API-specific testing
mvn test -Dkarate.options="--tags @users"
mvn test -Dkarate.options="--tags @posts"

# ✅ Quality gates (positive cases only)
mvn test -Dkarate.options="--tags @smoke and @positive"
```

## 📊 Reporting

### Report Types Generated

1. **Karate HTML Report**: `target/karate-reports/karate-summary.html`
2. **Cucumber JSON**: `target/karate-reports/*.json`
3. **JUnit XML**: `target/surefire-reports/TEST-*.xml`
4. **Enhanced Cucumber Report**: `target/cucumber-report-html/overview-features.html`

### View Reports

```bash
# MacOS
open target/karate-reports/karate-summary.html

# Windows
start target\karate-reports\karate-summary.html

# Linux
xdg-open target/karate-reports/karate-summary.html
```

### Generate Enhanced Reports

```bash
mvn test verify -Dtest=SmokeTestsRunner
open target/cucumber-report-html/overview-features.html
```

## 🔧 Troubleshooting

### Common Issues and Solutions

**1. "TestEngine failed to discover tests"**
✅ **SOLUCIONADO** - Los runners ahora son clases y métodos públicos

**2. Tests not running**
```bash
# Check Java version (should be 11+)
java -version

# Verify Maven
mvn -version

# Clean and recompile
mvn clean compile test-compile
```

**3. Environment configuration not loading**
```bash
# Verify environment parameter
mvn test -Dkarate.env=dev -X -Dtest=SmokeTestsRunner

# Check config file exists
ls src/test/java/features/config/environments/
```

**4. Connection issues**
```bash
# Test with different environment
mvn test -Pint -Dtest=SmokeTestsRunner

# Override timeout
mvn test -Dkarate.timeout=60000 -Dtest=SmokeTestsRunner
```

### Debug Mode

```bash
# Enable detailed logging
mvn test -Dkarate.env=dev -X -Dtest=SmokeTestsRunner

# Single thread with debug (slower but more stable)
mvn test -Dkarate.options="--threads 1" -Dtest=SmokeTestsRunner
```

### Verify Setup

```bash
# 1. Verify structure
find src -name "*.java" -o -name "*.feature" -o -name "*.js" -o -name "*.json"

# 2. Check compiled classes
ls -la target/test-classes/runners/

# 3. Test compilation only
mvn compile test-compile

# 4. Run single test method
mvn test -Dtest=SmokeTestsRunner#testSmoke
```

## 🎯 Best Practices

### Test Development

1. ✅ **All runner classes and methods are PUBLIC**
2. ✅ **Use appropriate tags** for test categorization
3. ✅ **Leverage schemas** for response validation
4. ✅ **Use constants** instead of hard-coded values
5. ✅ **Create reusable utilities** in utils.js

### Execution Strategy

```bash
# Development workflow
mvn test -Psmoke              # Quick check (2-3 min)
mvn test -Dkarate.options="--tags @users and @positive"  # Focused testing
mvn test -Pregression         # Full validation (10-15 min)
```

### Performance Optimization

```bash
# Parallel execution (when stable)
mvn test -Dkarate.options="--threads 2" -Dtest=RegressionTestsRunner

# Environment-specific timeouts already configured:
# dev.json: 10s, int.json: 15s, pro.json: 30s
```

## 📚 Additional Resources

- [Karate Documentation](https://github.com/karatelabs/karate)
- [JSON Placeholder API](https://jsonplaceholder.typicode.com/)
- [Maven Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/)

## 🎉 Success Validation

After fixing the "TestEngine failed to discover tests" issue, you should see:

```
[INFO] Tests run: X, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

And find reports in:
- `target/karate-reports/karate-summary.html`
- `target/surefire-reports/`

---

**Framework Version**: 1.0.0  
**Karate Version**: 1.4.1  
**Status**: ✅ Funcionando correctamente  
**Last Updated**: September 2025