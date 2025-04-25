# endpoints CRUD

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializer import LabelSerializers
from .models import Label


class LabelView(viewsets.ModelViewSet):
  permission_classes = [IsAuthenticated]
  queryset = Label.objects.all().order_by('-fecha_pedido')
  serializer_class = LabelSerializers


# endpoint Email

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail

class EmailApiView(APIView):
  def post(self, request):
    try:
      to_email = "matias.cataldo@correoaiep.cl"
      subject = "Mensaje de prueba"
      message = "Este es un mensaje de prueba desde DRF"
      send_mail(subject, message, None, [to_email])
      return Response({'message': 'Correo enviado con exito.'}, status=status.HTTP_200_OK)
    except Exception as e:
      error_message = str(e)
      return Response({'message': error_message}, status=status.HTTP_400_BAD_REQUEST)