import {useQuery} from 'react-query';
import {api} from '../utils/api';

export const useRestaurantMenus = (restId: any) =>
  useQuery(['menus', restId], async () => {
    try {
      const response = await api.get(`/menu/restaurants/${restId}/menu/`);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  });

export const useRestaurants = () =>
  useQuery('restaurants', async () => {
    try {
      const response = await api.get('/restaurant/restaurants/');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  });
