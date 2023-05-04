from .models import Restaurant, Menu
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from rest_framework import status
from decimal import Decimal
from .models import Menu, Restaurant


class MenuTestCase(APITestCase):
    client = APIClient()
    def setUp(self):
        self.restaurant = Restaurant.objects.create(
            name='Pasta Palace',
            description='Authentic Italian pasta dishes',
            restaurant_type='italian',
            phone_number='555-1234',
            address='123 Main St, Anytown USA',
            location= '[37.7749, 9.4194]',
            price_range='200-300',
            active=True
        )
        self.menu = Menu.objects.create(
            restaurant=self.restaurant,
            name="Pasta Salad",
            description="Pasta with salad",
            price=Decimal("9.99"),
            rating=Decimal("4.5"),
            discount=Decimal("0.00"),
            menu_group="Pasta",
            menu_ingredients="Pasta, Salad, Brocoli"
        )

    def test_get_menu_item_list(self):
        """
        Test getting a list of menu items.
        """
        url = reverse('menu-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_menu_item_detail(self):
        """
        Test getting a single menu item.
        """
        url = reverse('menu-detail', args=[str(self.menu.id)])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Pasta Salad')

    def test_create_menu_item(self):
        """
        Test creating a Sandwich.
        """
        url = reverse('menu-list')
        data = {
            'restaurant': self.restaurant.id,
            'name': 'Sandwich',
            'description': 'Sandwich you never had!',
            'price': '8.99',
            'rating': '4.0',
            'discount': '0.50',
            'menu_group': 'Fast Food',
            'menu_ingredients': 'Egg, Bread, Tomato'
        }
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Menu.objects.count(), 2)
        self.assertEqual(Menu.objects.get(
            id=response.data['id']).name, 'Sandwich')

    def test_update_menu_item(self):
        """
        Test updating an existing menu item.
        """
        url = reverse('menu-detail', args=[str(self.menu.id)])
        data = {
            'name': 'Sandwich Shwarma',
            'description': self.menu.description,
            'price': str(self.menu.price),
            'rating': str(self.menu.rating),
            'discount': str(self.menu.discount),
            'menu_group': self.menu.menu_group,
            'menu_ingredients': self.menu.menu_ingredients,
            'active': self.menu.active,
            'restaurant': str(self.menu.restaurant.id),
        }
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.menu.refresh_from_db()
        self.assertEqual(self.menu.name, 'Sandwich Shwarma')

    def test_delete_menu_item(self):
        """
        Test deleting an existing menu item.
        """
        url = reverse('menu-detail', args=[str(self.menu.id)])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Menu.objects.count(), 0)


