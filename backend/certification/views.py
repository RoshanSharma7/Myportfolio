# from rest_framework import viewsets, permissions
# from .models import Certification
# from .serializers import CertificationSerializer

# class CertificationViewSet(viewsets.ModelViewSet):
#     queryset = Certification.objects.all()
#     serializer_class = CertificationSerializer

#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAuthenticated()]

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Certification
from .serializers import CertificationSerializer

class CertificationViewSet(viewsets.ModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            cert = Certification.objects.get(pk=pk)
        except Certification.DoesNotExist:
            return Response({'error': 'Certification not found'}, status=404)
        
        serializer = self.get_serializer(cert, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            cert = Certification.objects.get(pk=pk)
            cert.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Certification.DoesNotExist:
            return Response({'error': 'Certification not found'}, status=404)