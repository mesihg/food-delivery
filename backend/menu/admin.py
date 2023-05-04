from django.contrib import admin
from .models import Menu


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ("id",
                    "name",
                    "image_tag",
                    "restaurant",
                    "price",
                    "discount",
                    "active",
                    )
    list_editable = ["active"]
    list_display_links = ('name',)

# admin.site.register(Menu)
