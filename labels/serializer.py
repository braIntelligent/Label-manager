from rest_framework import serializers
from .models import Label


class LabelSerializers(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = '__all__'
        extra_kwargs = {
            'nombre': {'required': True},
            'email': {'required': True},
            'altura': {'required': True},
            'ancho': {'required': True},
            'descripcion': {'required': True},
            'imagen': {'required': True},
            'forma': {'required': True},
        }
