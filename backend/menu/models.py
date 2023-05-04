from django.db import models
from restaurant.models import Restaurant
from django.utils.safestring import mark_safe
import uuid

from django.core.files.base import ContentFile
from django.utils.text import slugify
from io import BytesIO
from PIL import Image


class Menu(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name='menu')
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    discount = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    # image = models.ImageField(upload_to='menu_images/', null=True, blank=True)
    image = models.ImageField(upload_to='menu_images/', default='default.jpg')

    active = models.BooleanField(default=True)
    menu_group = models.CharField(max_length=50, null=True, blank=True)
    menu_ingredients = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.id:
            # Generate a unique filename for the uploaded image
            filename = f"{slugify(self.name)}_{uuid.uuid4()}.jpg"

            # Resize the uploaded image and save it to the image field
            image = Image.open(self.image)
            image.thumbnail((1024, 1024), Image.ANTIALIAS)
            image_data = BytesIO()
            image.save(image_data, format='JPEG', quality=90)
            image_data.seek(0)
            self.image = ContentFile(image_data.read(), filename)

        super(Menu, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    def image_tag(self):
        return mark_safe('<img src="{}" width="30" height="30" />'.format(self.image.url))

    image_tag.short_description = 'Image'
