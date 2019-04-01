from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Cryptocurrency

from crypto import serializers


class CryptocurrencyViewSet(viewsets.ModelViewSet):
    """Base viewset for user owned cryptocurrencies"""
    serializer_class = serializers.CryptocurrencySerializer
    queryset = Cryptocurrency.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current user only"""
        queryset = self.queryset
        return queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Create a new object"""
        serializer.save(user=self.request.user)
