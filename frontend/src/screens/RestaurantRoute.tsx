import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RestaurantListContainer from './RestaurantListContainer';
import RestaurantMenuContainer from './RestaurantMenuContainer';

const RestStack = createNativeStackNavigator();

const RestaurantRoute = () => {
  return (
    <RestStack.Navigator screenOptions={{headerShown: false}}>
      <RestStack.Screen name="rest" component={RestaurantListContainer} />
      <RestStack.Screen name="menus" component={RestaurantMenuContainer} />
    </RestStack.Navigator>
  );
};

export default RestaurantRoute;
