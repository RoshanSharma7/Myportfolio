from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EducationViewSet

router = DefaultRouter()
router.register(r'', EducationViewSet, basename='education')

urlpatterns = [path('', include(router.urls))]