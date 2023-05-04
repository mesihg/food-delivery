from rest_framework import serializers
from .models import Menu
import os
from restaurant.models import Restaurant


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

    def create(self, validated_data):
        restaurant = validated_data.pop('restaurant')
        try:
            restaurant = Restaurant.objects.get(name__iexact=restaurant)
        except Restaurant.DoesNotExist:
            raise serializers.ValidationError("Restaurant doesn't exist")
        menu = Menu.objects.create(restaurant=restaurant, **validated_data)
        return menu

    def update(self, instance, validated_data):
        restaurant = validated_data.pop('restaurant')
        image_file = validated_data.get('image')
        if restaurant is not None:
            try:
                restaurant = Restaurant.objects.get(name__iexact=restaurant)
            except Restaurant.DoesNotExist:
                raise serializers.ValidationError("Restaurant doesn't exist")
            instance.restaurant = restaurant
        if image_file:
            if instance.image:
                os.remove(instance.image.path)
            instance.image = image_file
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
