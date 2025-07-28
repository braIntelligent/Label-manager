# Labels App – Backend Django + Frontend Vite (React)

Esta es una aplicación web fullstack compuesta por un backend en Django REST y un frontend en Vite + React. El sistema incluye autenticación con JWT, despliegue local con Gunicorn, envío de correos y configuración vía `.env`.

---

## ⚙️ Requisitos

- Python 3.10+
- Node.js y npm
- pip
- bash (Linux/macOS)
- SQLite (modo desarrollo)

---

## Instalación

### 1. Crear entorno virtual

```bash
python -m venv environment
source environment/bin/activate  # en Windows: environment\Scripts\activate
````

### 2. Instalar dependencias de Python

```bash
pip install -r requirements.txt
```

### 3. Dar permisos a scripts (si es necesario)

```bash
chmod u+x build.sh
chmod u+x start.sh
```

### 4. Crear archivo `.env` y configurar variables

Ejemplo básico:

```env
SECRET_KEY="tu_clave_secreta"
DEBUG="true"
# EMAIL_HOST=
# EMAIL_HOST_USER=
# EMAIL_HOST_PASSWORD=
# EMAIL_PORT=
# EMAIL_USE_TLS=
# DEFAULT_FROM_EMAIL=
# ADMIN_EMAIL=
```

---

## 📦 Despliegue local

Ejecuta los siguientes scripts **en orden**:

```bash
./build.sh   # instala dependencias, construye el frontend y configura staticfiles
./start.sh   # aplica migraciones, crea superusuario y levanta el servidor con Gunicorn
```
---

## Test de envío de correos

Puedes ejecutar este script para probar el envío de correos (si configuraste las variables):

```bash
python test_email.py
```
---

## 📤 Actualizar dependencias pip

Para actualizar todas las dependencias a la última versión:

```bash
pip install --upgrade -r requirements.txt
```

Para generar un nuevo `requirements.txt` actualizado:

```bash
pip freeze > requirements.txt
```

---

## 📂 Estructura relevante

```
├── crud_api/           # Proyecto Django
│   ├── settings.py     # Configurado para .env
│   └── wsgi.py
├── labels/             # App Django principal
├── frontend/           # App React (Vite)
├── staticfiles/        # Static files para producción
├── templates/          # React build copiado como index.html
├── build.sh
├── start.sh
├── .env
└── requirements.txt
```

---

## 🛡️ Objetivo del Proyecto

Este proyecto es parte de un camino de aprendizaje práctico hacia el rol de profesional en **Ciberseguridad**, partiendo desde una base sólida en programación, despliegue e infraestructura moderna.

---