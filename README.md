# Instrucciones de Ejecución del Proyecto

## Comandos Maven

### Ejecutar todos los tests en DEV (por defecto)
```bash
mvn test
```

### Ejecutar tests en entorno INT
```bash
mvn test -Pint
```

### Ejecutar tests en entorno PRO
```bash
mvn test -Ppro
```

### Ejecutar un feature específico
```bash
mvn test -Dkarate.options="--tags @users"
```

### Ejecutar con reportes detallados
```bash
mvn test -Dkarate.options="--tags @smoke"
```

## Estructura de Carpetas

- **pom.xml**: Configuración Maven con perfiles para entornos
- **karate-config.js**: Configuración principal que carga entornos
- **config/environments/**: Archivos JSON para cada entorno (dev, int, pro)
- **config/common/utils.js**: Funciones utilitarias reutilizables
- **users/users.feature**: Tests para API de usuarios
- **posts/posts.feature**: Tests para API de posts
- **TestRunner.java**: Runner principal para ejecutar tests

## Reportes

Los reportes se generan en: `target/karate-reports/`
- HTML detallado
- JSON para CI/CD
- XML para Jenkins