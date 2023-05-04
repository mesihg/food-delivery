from django.urls import path
from .views import MenuAPIView, MenuDetailAPIView, MenuByRestaurantAPIView

urlpatterns = [
    path('menus/', MenuAPIView.as_view(), name="menu-list"),
    path('restaurants/<uuid:restaurant_id>/menu/',
         MenuByRestaurantAPIView.as_view(), name='menu_by_restaurant'),
    path('menus/<uuid:pk>/', MenuDetailAPIView.as_view(), name="menu-detail"),
]
