from rest_framework import viewsets
from .serializer import labelSerializers
from .models import Label

# Create your views here.

class label_view(viewsets.ModelViewSet):
  serializer_class = labelSerializers
  queryset = Label.objects.all().order_by('-fecha_pedido')