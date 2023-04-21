# from django.contrib import admin
# from .models import Order


# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#   list_display = ["id", "user", "get_tags", "quantity", "total", "status"]
#   list_editable = ('status',)


#   def get_tags(self, obj):
#         return ", ".join([tag.name for tag in obj.items.all()])

#   get_tags.short_description = "Items"

from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'total', 'status', 'created_at']
    inlines = [OrderItemInline]

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)

