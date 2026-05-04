from rest_framework import serializers
from .models import ProfileLink

class ProfileLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileLink
        fields = '__all__'