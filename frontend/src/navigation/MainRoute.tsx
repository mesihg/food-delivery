import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RestaurantRoute from '../screens/RestaurantRoute';
import {CartProvider} from '../contexts/CartContext';
import CartContainer from '../screens/CartContainer';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const MainRoute = () => {
  return (
    <CartProvider>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="home"
          component={RestaurantRoute}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="cart"
          component={CartContainer}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="shopping-cart" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </CartProvider>
  );
};

export default MainRoute;
