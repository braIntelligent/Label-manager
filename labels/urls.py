from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'labels', views.LabelView, 'labels')

urlpatterns = [
  path('', include(router.urls))
]

from django.conf.urls import handler404
from django.shortcuts import render

def frontend(request, exception=None):
    return render(request, 'index.html')

handler404 = frontend