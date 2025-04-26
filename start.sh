#!/bin/bash

# Salir si cualquier comando falla
set -e

echo "🚀 Aplicando migraciones de Django..."
python manage.py makemigrations

python manage.py migrate 

python manage.py shell << EOF
from django.contrib.auth.models import User
User.objects.create_superuser('admin', '', 'password123')
EOF



echo "🚀 Iniciando servidor con gunicorn..."
gunicorn crud_api.wsgi:application --bind 0.0.0.0:8000
