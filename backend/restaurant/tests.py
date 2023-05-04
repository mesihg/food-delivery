from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import Restaurant
from user.models import User
import io
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import base64
from base64 import decodebytes


class RestaurantTests(APITestCase):
    client = APIClient()
    def setUp(self):
        self.italian_restaurant = Restaurant.objects.create(
            name='Pasta Palace',
            description='Authentic Italian pasta dishes',
            restaurant_type='italian',
            phone_number='555-1234',
            address='123 Main St, Anytown USA',
            location= '[37.7749, 9.4194]',
            price_range='200-300',
            active=True
        )


        self.user = User.objects.create_user(
            first_name="John",
            last_name="Doe",
            password="1234567890",
            email="johndoe@example.com",
            phone="1234567890",
            dob="1990-01-01",
            gender="male",
            address="123 Main St",
            role="user"
        )
        self.client.force_authenticate(user=self.user)

    def test_list_restaurants(self):
        url = reverse('restaurant-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_restaurant(self):
        url = reverse('restaurant-list')
        data = {
            'name': 'Test Restaurant',
            'description': 'This is a test restaurant',
            'restaurant_type': 'italian',
            'phone_number': '1234567890',
            'address': '123 Test Address',
            'location': '[38.7128,  9.0061]',
            'price_range': '200-400',
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # self.assertEqual(Restaurant.objects.count(), 2)
        # restaurant = Restaurant.objects.first()
        # self.assertEqual(restaurant.name, 'Test Restaurant')
        # self.assertEqual(restaurant.description, 'This is a test restaurant')
        # self.assertEqual(restaurant.restaurant_type, 'italian')
        # self.assertEqual(restaurant.phone_number, '1234567890')
        # self.assertEqual(restaurant.address, '123 Test Address')
        # self.assertEqual(restaurant.location, [38.7128, 9.0061])
        # self.assertEqual(restaurant.price_range, '200-400')
        # self.assertIsNotNone(restaurant.image)

    def test_retrieve_restaurant(self):
        url = reverse('restaurant-detail', args=[self.italian_restaurant.id])
        response = self.client.get(url, format='json')
        restaurant = Restaurant.objects.get(name=self.italian_restaurant.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertQuerysetEqual(
            Restaurant.objects.filter(name='Pasta Palace'),
            [restaurant]
        )

    def test_update_restaurant(self):
        url = reverse('restaurant-detail', args=[self.italian_restaurant.id])
        data = {'name': 'Hela Restaurant'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotEqual(Restaurant.objects.get(
            id=self.italian_restaurant.id).name, 'Hela Restaurant')

    def test_delete_restaurant(self):
        url = reverse('restaurant-detail', args=[self.italian_restaurant.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Restaurant.objects.count(), 0)


