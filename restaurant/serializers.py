from rest_framework import serializers
import os
from .models import Restaurant

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

    def update(self, instance, validated_data):
        image_file = validated_data.get('image')
        if image_file:
            if instance.image:
                os.remove(instance.image.path)
            instance.image = image_file
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
