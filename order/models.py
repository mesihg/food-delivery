from django.db import models
from menu.models import Menu
from user.models import User
from uuid import uuid4


class Order(models.Model):
    STATUS_CHOICE = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('processing', 'Processing'),
        ('on way', 'On Way'),
        ('packed', 'Packed'),
        ('cancelled', 'Cancelled'),
        ('delivered', 'Delivered'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=30, choices=STATUS_CHOICE, default='pending')
    ordered_items = models.ManyToManyField(Menu, related_name='orders', blank=True, through='OrderItem')
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def total(self):
        total = 0
        for item in self.order_items.all():
            total += item.item.price * item.quantity
        return total

    def __str__(self):
        return str(self.id)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    item = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='order_item')
    quantity = models.PositiveIntegerField(default=1)
    item_price = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)


    def save(self, *args, **kwargs):
        self.item_price = self.item.price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.order} - {self.item.name}"
