from django.urls import path
from .views import RestaurantAPIView, RestaurantDetailAPIView

urlpatterns = [
    path('restaurants/', RestaurantAPIView.as_view(), name="restaurant-list"),
    path('restaurants/<uuid:pk>/', RestaurantDetailAPIView.as_view(), name="restaurant-detail"),
]
