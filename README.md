# Karate API Automation Framework

Framework de automatización de APIs REST usando **Karate DSL 1.4.1**.

## Requisitos

- Java 11+
- Maven 3.6+

## Ejecución Rápida

**Opción 1: Script automatizado**
```bash
# Unix/Linux/Mac
chmod +x test-execution.sh && ./test-execution.sh

# Windows
test-execution.bat
```

**Opción 2: Maven directo**
```bash
mvn clean test -Dtest=SmokeTestsRunner
```

Los reportes se generan en `target/karate-reports/karate-summary.html`

## Estructura del Proyecto

```
src/test/java/
├── karate-config.js                 # Configuración global
├── runners/                         # Ejecutores de tests (clases públicas)
│   ├── AllTestsRunner.java         
│   ├── SmokeTestsRunner.java       
│   └── RegressionTestsRunner.java  
├── features/
│   ├── config/
│   │   ├── environments/           # Configuración por ambiente
│   │   │   ├── dev.json           
│   │   │   ├── int.json           
│   │   │   └── pro.json           
│   │   └── common/                # Utilidades compartidas
│   │       ├── utils.js           
│   │       ├── constants.js       
│   │       └── schemas.js         
│   └── api/                       # Features de pruebas
│       ├── users/                 
│       └── posts/                 
```

## Comandos de Ejecución

### Básicos
```bash
# Smoke tests (rápidos)
mvn test -Dtest=SmokeTestsRunner

# Todos los tests
mvn test -Dtest=AllTestsRunner

# Tests de regresión
mvn test -Dtest=RegressionTestsRunner
```

### Por perfil
```bash
mvn test -Psmoke
mvn test -Pregression
```

### Por ambiente
```bash
mvn test -Pint -Dtest=SmokeTestsRunner
mvn test -Ppro -Dtest=SmokeTestsRunner
```

### Por tags
```bash
mvn test -Dkarate.options="--tags @smoke"
mvn test -Dkarate.options="--tags @regression"
mvn test -Dkarate.options="--tags @users"
mvn test -Dkarate.options="--tags @smoke and @positive"
```

### Tests específicos
```bash
# Solo API de usuarios
mvn test -Dtest=RegressionTestsRunner#testUsersOnly

# Solo API de posts
mvn test -Dtest=RegressionTestsRunner#testPostsOnly
```

## Gestión de Ambientes

Cada ambiente tiene su archivo de configuración JSON:

- **dev.json**: Desarrollo con debug habilitado (timeout: 10s)
- **int.json**: Integración con timeouts moderados (timeout: 15s)  
- **pro.json**: Producción con timeouts estrictos (timeout: 30s)

## Tags Disponibles

| Tag | Descripción | Tiempo aprox. |
|-----|-------------|---------------|
| `@smoke` | Tests críticos del happy path | 2-3 min |
| `@regression` | Cobertura completa | 10-15 min |
| `@positive` | Casos de éxito | 5-8 min |
| `@negative` | Casos de error | 3-5 min |
| `@users` | Tests específicos de usuarios | 5-7 min |
| `@posts` | Tests específicos de posts | 4-6 min |

## Reportes

Se generan automáticamente:

1. **Karate HTML**: `target/karate-reports/karate-summary.html`
2. **Cucumber JSON**: `target/karate-reports/*.json`
3. **JUnit XML**: `target/surefire-reports/TEST-*.xml`

Para generar reportes mejorados:
```bash
mvn test verify -Dtest=SmokeTestsRunner
```

## Resolución de Problemas

**Tests no se ejecutan**
```bash
# Verificar Java y Maven
java -version && mvn -version

# Limpiar y recompilar
mvn clean compile test-compile
```

**Configuración de ambiente no carga**
```bash
# Verificar archivo de configuración
ls src/test/java/features/config/environments/

# Ejecutar con logs detallados
mvn test -Dkarate.env=dev -X -Dtest=SmokeTestsRunner
```

**Problemas de conexión**
```bash
# Cambiar ambiente
mvn test -Pint -Dtest=SmokeTestsRunner

# Aumentar timeout
mvn test -Dkarate.timeout=60000 -Dtest=SmokeTestsRunner
```

## Validación del Setup

```bash
# 1. Verificar estructura
find src -name "*.java" -o -name "*.feature" -o -name "*.js"

# 2. Compilar
mvn compile test-compile

# 3. Ejecutar test individual
mvn test -Dtest=SmokeTestsRunner#testSmoke
```

## Flujo de Trabajo Recomendado

```bash
# 1. Validación rápida durante desarrollo
mvn test -Psmoke

# 2. Tests específicos por funcionalidad
mvn test -Dkarate.options="--tags @users and @positive"

# 3. Validación completa antes de merge
mvn test -Pregression
```

**Framework Version**: 1.0.0  
**Karate Version**: 1.4.1  
**Status**: Funcionando correc