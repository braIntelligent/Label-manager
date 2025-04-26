#!/bin/bash

# Salir si cualquier comando falla
set -e

echo "🚀 Instalando dependencias de Python..."
pip install -r requirements.txt

echo "🚀 Instalando dependencias de Node y construyendo el frontend..."
cd frontend
npm install
npm run build
cd ..

echo "🚀 Copiando index.html a templates..."
mkdir -p templates
cp labels/static/index.html templates/index.html

echo "🚀 Ejecutando collectstatic de Django..."
python manage.py collectstatic --noinput

echo "✅ Build completado con éxito."
