@echo off
echo 🚀 Probando Framework Karate...
echo ==============================

echo 🧹 Limpiando proyecto...
call mvn clean

echo 🔨 Compilando...
call mvn compile test-compile

echo 💨 Ejecutando Smoke Tests...
call mvn test -Dtest=SmokeTestsRunner

if %ERRORLEVEL% == 0 (
    echo ✅ Tests ejecutados correctamente!
    echo 📊 Ver reporte: target\karate-reports\karate-summary.html
) else (
    echo ❌ Error en tests - revisar target\surefire-reports\
)

pause
