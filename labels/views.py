# endpoints CRUD
from rest_framework.views import APIView
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import LabelSerializers
from .models import Label
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.template.loader import render_to_string


class LabelView(viewsets.ModelViewSet):
    queryset = Label.objects.all().order_by('-fecha_pedido')
    serializer_class = LabelSerializers
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        label = serializer.instance

        try:
            self.send_confirmation_email(label)
            self.send_admin_notification(label)
        except Exception as e:
            print(f"Error enviando emails: {str(e)}")

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def send_confirmation_email(self, label):
        subject = f"Confirmación de tu pedido #{label.id}"
        message = render_to_string('emails/order_confirmation.txt', {
            'label': label,
        })
        html_message = render_to_string('emails/order_confirmation.html', {
            'label': label,
        })
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [label.email],
            html_message=html_message,
            fail_silently=False,
        )

    def send_admin_notification(self, label):
        subject = f"Nuevo pedido recibido (#{label.id})"
        message = render_to_string('emails/admin_confirmation.txt', {
            'label': label,
        })
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL], 
            fail_silently=False,
        )
