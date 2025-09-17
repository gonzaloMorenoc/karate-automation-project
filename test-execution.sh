#!/bin/bash

echo "🚀 Iniciando pruebas del Framework Karate..."
echo "=============================================="

# Limpiar compilaciones anteriores
echo "🧹 Limpiando compilaciones anteriores..."
mvn clean

# Compilar el proyecto
echo "🔨 Compilando el proyecto..."
mvn compile test-compile

# Ejecutar smoke tests (más rápido)
echo "💨 Ejecutando Smoke Tests..."
mvn test -Dtest=SmokeTestsRunner

if [ $? -eq 0 ]; then
    echo "✅ ¡Smoke Tests ejecutados exitosamente!"
    echo "📊 Reportes disponibles en:"
    echo "   - target/karate-reports/karate-summary.html" 
    echo "   - target/surefire-reports/"
else
    echo "❌ Error en la ejecución de Smoke Tests"
    echo "📋 Revisar logs en target/surefire-reports/"
fi

echo ""
echo "🎯 Comandos adicionales disponibles:"
echo "   - Todos los tests: mvn test"
echo "   - Solo usuarios: mvn test -Dtest=RegressionTestsRunner#testUsersOnly"
echo "   - Solo posts: mvn test -Dtest=RegressionTestsRunner#testPostsOnly" 
echo "   - Por tags: mvn test -Dkarate.options='--tags @positive'"
echo "=============================================="
