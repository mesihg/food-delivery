from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from .serializers import OrderSerializer, OrderItemSerializer


class OrderAPIView(APIView):
    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderItemAPIView(APIView):
    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request, order_id):
        order_items = OrderItem.objects.filter(order__id=order_id)
        serializer = OrderItemSerializer(order_items, many=True)
        return Response(serializer.data)

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request):
        serializer = OrderItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAdminUser])
    def put(self, request, item_id):
        try:
            order_item = OrderItem.objects.get(id=item_id)
        except OrderItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = OrderItemSerializer(
            order_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAdminUser])
    def delete(self, request, item_id):
        try:
            order_item = OrderItem.objects.get(id=item_id)
        except OrderItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        order_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
