from django.contrib import admin
from .models import Restaurant


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("name", "restaurant_type", "image_tag",
                    "phone_number", "active",)
    list_editable = ["active"]
    list_display_links = ('name',)
