from django.urls import path
from .views import MenuAPIView, MenuDetailAPIView

urlpatterns = [
    path('menus/', MenuAPIView.as_view(), name="menu-list"),
    path('menus/<uuid:pk>/', MenuDetailAPIView.as_view(), name="menu-detail"),
]