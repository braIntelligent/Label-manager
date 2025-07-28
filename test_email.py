# test_email.py
import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crud_api.settings') 
django.setup()

from django.core.mail import send_mail

# Enviar correo
send_mail(
    subject='Correo de prueba desde Django + SendGrid 🚀',
    message='¡Felicitaciones! Este es un correo de prueba enviado con SendGrid.',
    from_email=os.getenv('DEFAULT_FROM_EMAIL'),  # O puedes ponerlo directo aquí
    recipient_list=[''],  # <-- Pon correos aquí para recibir la prueba
    fail_silently=False,
)

print("Correo enviado correctamente.")
