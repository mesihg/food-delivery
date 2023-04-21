from rest_framework import serializers
from .models import Menu, Order, OrderItem
from menu.serializers import MenuSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    item_name = serializers.ReadOnlyField(source='item.name')
    price = serializers.ReadOnlyField(source='item.price')

    class Meta:
        model = OrderItem
        fields = ('item', 'quantity', 'item_name', 'price')


class OrderSerializer(serializers.ModelSerializer):
    ordered_items = OrderItemSerializer(many=True)
    # menu_items = MenuSerializer(many=True)
    class Meta:
        model = Order
        fields = ('id', 'user', 'ordered_items', 'status', 'created_at', 'total')
        read_only_fields = ('id', 'user', 'created_at', 'total')

    def create(self, validated_data):
        ordered_items_data = validated_data.pop('ordered_items')
        menu_items_data = validated_data.pop('ordered_items')
        order = Order.objects.create(**validated_data)
        for item_data in ordered_items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    def update(self, instance, validated_data):
        ordered_items_data = validated_data.pop('ordered_items')
        ordered_items = instance.order_items.all()
        ordered_items = list(ordered_items)
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        for item_data in ordered_items_data:
            item = ordered_items.pop(0)
            item.item = item_data.get('item', item.item)
            item.quantity = item_data.get('quantity', item.quantity)
            item.save()

        return instance

