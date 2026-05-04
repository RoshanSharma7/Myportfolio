from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginView, ProfileViewSet

router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')

urlpatterns = [
    path('login/',   LoginView.as_view(), name='login'),
    path('',         include(router.urls)),
]