from django.db import models
from django.utils.safestring import mark_safe
import uuid

from django.core.files.base import ContentFile
from django.utils.text import slugify
from io import BytesIO
from PIL import Image

class Restaurant(models.Model):
    RESTAURANT_TYPE_CHOICES = [
        ('italian', 'Italian'),
        ('mexican', 'Mexican'),
        ('american', 'American'),
        ('asian', 'Asian'),
        ('habesha', 'Habesha'),
        ('other', 'Other'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    # image = models.ImageField(upload_to='uploads/', blank=True)
    image = models.ImageField(upload_to='uploads/', default='default.jpg')
    description = models.TextField()
    restaurant_type = models.CharField(
        max_length=10, choices=RESTAURANT_TYPE_CHOICES)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=200)
    location = models.JSONField(null=True, blank=True)
    price_range = models.CharField(max_length=20, null=True, blank=True)
    active = models.BooleanField(default=True)
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

        super(Restaurant, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    def image_tag(self):
        return mark_safe('<img src="{}" width="30" height="30" />'.format(self.image.url))

    image_tag.short_description = 'Image'
