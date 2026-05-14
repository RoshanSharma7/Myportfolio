from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = '__all__'
    
    def get_thumbnail_url(self, obj):
        """Return full Cloudinary URL for thumbnail"""
        if obj.thumbnail:
            return obj.thumbnail.url
        return None