from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from rest_framework import status
from .models import User


class UserTests(APITestCase):
    client = APIClient()

    def setUp(self):
        self.user = User.objects.create(
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
        self.admin_user = User.objects.create(
            first_name="Admin",
            last_name="User",
            email="admin@example.com",
            phone="1234567890",
            dob="1990-01-01",
            password="1234567890",
            gender="male",
            address="456 Main St",
            role="admin",
            is_staff=True,
            is_superuser=True
        )
        self.url = reverse('user-list')
        self.register_url = reverse('register')
        self.login_url = reverse('login')

    def test_list_users(self):
        self.client.force_login(self.admin_user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_user(self):
        self.client.force_login(self.admin_user)
        data = {
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "janedoejane@example.com",
            "password": "0123456789",
            "phone": "1234567890",
            "dob": "1990-01-01",
            "gender": "female",
            "address": "789 Main St",
            "role": "user"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user(self):
        self.client.force_login(self.admin_user)
        data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.com",
            "password": "0123456789",
            "phone": "1234567890",
            "dob": "1990-01-01",
            "gender": "other",
            "address": "123 Main St",
            "role": "user"
        }
        response = self.client.put(
            self.url + f'{self.user.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.get(id=self.user.id).gender, "male")

    def test_delete_user(self):
        self.client.force_login(self.admin_user)
        response = self.client.delete(self.url + f'{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 1)

    def test_register_user(self):
        data = {
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "janedoe@example.com",
            "password": "0123456789",
            "phone": "1234567890",
            "dob": "1990-01-01",
            "gender": "female",
            "address": "789 Main St",
            "role": "user",
            "password": "password123"
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 3)
        self.assertEqual(User.objects.get(
            email="janedoe@example.com").first_name, "Jane")

    def test_login_user(self):

        user_data = {
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "janedoe@example.com",
            "password": "0123456789",
            "phone": "1234567890",
            "dob": "1990-01-01",
            "gender": "female",
            "address": "789 Main St",
            "role": "user",
            "password": "password123"
        }
        response = self.client.post(
            self.register_url, user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        login_data = {
            "email": "janedoe@example.com",
            "password": "password123"
        }
        response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)
