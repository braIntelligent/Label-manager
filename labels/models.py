# from django.db import models

# # Create your models here.
# from django.db import models
# from django.conf import settings

# class labels(models.Model):
#     FORMAS = [
#         ("circulo", "Círculo"),
#         ("cuadrada", "Cuadrada"),
#         ("cuadrada_redonda", "Cuadrada con puntas redondas"),
#         ("ovalada", "Ovalada"),
#         ("rectangular", "Rectangular"),
#         ("rectangular_redonda", "Rectangular con puntas redondas"),
#     ]

#     ESTADOS = [
#         ("pendiente", "Pendiente"),
#         ("en_produccion", "En producción"),
#         ("enviada", "Enviada"),
#         ("entregada", "Entregada"),
#         ("cancelada", "Cancelada"),
#     ]

#     cliente = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="etiquetas")
#     altura = models.DecimalField(max_digits=5, decimal_places=2)
#     ancho = models.DecimalField(max_digits=5, decimal_places=2)
#     forma = models.CharField(max_length=30, choices=FORMAS)
#     estado = models.CharField(max_length=20, choices=ESTADOS, default="pendiente")
#     fecha_pedido = models.DateTimeField(auto_now_add=True)
#     imagen = models.ImageField(upload_to="labels_images/", null=True, blank=True)
#     descripcion = models.TextField(blank=True)

#     def __str__(self):
#         return f"Etiqueta de {self.cliente.username} - {self.forma} ({self.altura}x{self.ancho}) {self.estado}"

from django.db import models

class Label(models.Model):  # Renombré la clase a singular y con mayúscula por convención PEP8
    FORMAS = [
        ("circulo", "Círculo"),
        ("cuadrada", "Cuadrada"),
        ("cuadrada_redonda", "Cuadrada con puntas redondas"),
        ("ovalada", "Ovalada"),
        ("rectangular", "Rectangular"),
        ("rectangular_redonda", "Rectangular con puntas redondas"),
    ]

    ESTADOS = [
        ("pendiente", "Pendiente"),
        ("en_produccion", "En producción"),
        ("enviada", "Enviada"),
        ("entregada", "Entregada"),
        ("cancelada", "Cancelada"),
    ]

    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    altura = models.DecimalField(max_digits=5, decimal_places=2)
    ancho = models.DecimalField(max_digits=5, decimal_places=2)
    forma = models.CharField(max_length=30, choices=FORMAS)
    estado = models.CharField(max_length=20, choices=ESTADOS, default="pendiente")
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    imagen = models.ImageField(upload_to="labels_images/", null=True, blank=True)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return f"Etiqueta de {self.nombre} - {self.forma} ({self.altura}x{self.ancho}) {self.estado}"
