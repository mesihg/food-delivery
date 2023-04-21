from rest_framework.views import APIView
import os
from django.conf import settings
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework import status
from .models import Menu
from .serializers import MenuSerializer


class MenuAPIView(APIView):
    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request, format=None):
        menus = Menu.objects.all()
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data)

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAdminUser])
    def post(self, request, format=None):
        serializer = MenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MenuDetailAPIView(APIView):
    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request, pk, format=None):
        menu = Menu.objects.get(pk=pk)
        serializer = MenuSerializer(menu)
        return Response(serializer.data)

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAdminUser])
    def put(self, request, pk, format=None):
        menu = Menu.objects.get(pk=pk)
        serializer = MenuSerializer(menu, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @authentication_classes([BasicAuthentication])
    @permission_classes([IsAdminUser])
    def delete(self, request, pk, format=None):
        menu = Menu.objects.get(pk=pk)
        if menu.image:
            try:
                image_path = os.path.join(settings.MEDIA_ROOT, str(menu.image))
                os.remove(image_path)
            except FileNotFoundError:
                pass
        menu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
