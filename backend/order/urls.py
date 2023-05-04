from django.urls import path
from .views import OrderAPIView, OrderItemAPIView

urlpatterns = [
    path('orders/', OrderAPIView.as_view(), name='order-list'),
    path('orders/<uuid:order_id>/items/',
         OrderItemAPIView.as_view(), name='order-detail'),
    path('orders/items/<uuid:item_id>/',
         OrderItemAPIView.as_view(), name='orderitem-detail'),
]
