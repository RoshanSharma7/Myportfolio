from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    resume_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = '__all__'
    
    def get_avatar_url(self, obj):
        """Return full Cloudinary URL for avatar"""
        if obj.avatar:
            return obj.avatar.url  # Cloudinary automatically provides full URL
        return None
    
    def get_resume_url(self, obj):
        """Return full Cloudinary URL for resume"""
        if obj.resume:
            return obj.resume.url  # Cloudinary automatically provides full URL
        return None