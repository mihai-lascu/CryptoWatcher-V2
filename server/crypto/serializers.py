from rest_framework import serializers

from core.models import Cryptocurrency


class CryptocurrencySerializer(serializers.ModelSerializer):
    """Serializer for cryptocurrency objects"""

    class Meta:
        model = Cryptocurrency
        fields = (
            'coin_symbol', 'coin_amount', 'coin_investment'
        )
        read_only_fields = ('id',)
