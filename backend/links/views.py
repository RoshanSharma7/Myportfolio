from rest_framework import viewsets, permissions
from .models import ProfileLink
from .serializers import ProfileLinkSerializer

class ProfileLinkViewSet(viewsets.ModelViewSet):
    queryset = ProfileLink.objects.all()
    serializer_class = ProfileLinkSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]