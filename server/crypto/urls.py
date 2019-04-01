from django.urls import path, include
from rest_framework.routers import DefaultRouter

from crypto import views


router = DefaultRouter()
router.register('coins', views.CryptocurrencyViewSet)

app_name = 'crypto'

urlpatterns = [
    path('', include(router.urls))
]
