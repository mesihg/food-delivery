from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework import status
from .models import Restaurant
from .serializers import RestaurantSerializer
import os
from django.conf import settings


class RestaurantAPIView(APIView):
    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request, format=None):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAdminUser])
    def post(self, request, format=None):
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RestaurantDetailAPIView(APIView):

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request, pk):
        restaurant = Restaurant.objects.get(pk=pk)
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAdminUser])
    def put(self, request, pk, format=None):
        restaurant = Restaurant.objects.get(pk=pk)
        serializer = RestaurantSerializer(restaurant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAdminUser])
    def delete(self, request, pk, format=None):
        restaurant = Restaurant.objects.get(pk=pk)
        if restaurant.image:
            try:
                image_path = os.path.join(
                settings.MEDIA_ROOT, str(restaurant.image))
                os.remove(image_path)
            except FileNotFoundError:
                pass

        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
