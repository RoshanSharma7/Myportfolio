from rest_framework import serializers
from .models import Certification

class CertificationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Certification
        fields = '__all__'
    
    def get_image_url(self, obj):
        """Return full Cloudinary URL for certification image"""
        if obj.image:
            return obj.image.url
        return None