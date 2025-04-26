#!/bin/bash

# Salir si cualquier comando falla
set -e

echo "🚀 Aplicando migraciones de Django..."
python manage.py migrate 
python manage.py migrate labels
python manage.py makemigrations
python manage.py makemigrations labels

python manage.py createsuperuser


echo "🚀 Iniciando servidor con gunicorn..."
gunicorn crud_api.wsgi:application --bind 0.0.0.0:8000
