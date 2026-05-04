from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileLinkViewSet

router = DefaultRouter()
router.register(r'', ProfileLinkViewSet, basename='link')

urlpatterns = [path('', include(router.urls))]