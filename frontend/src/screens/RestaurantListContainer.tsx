import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useRestaurants} from '../hooks/useRestaurants';
import Restaurant from './Restaurant';
import RestHeader from '../components/headers/RestHeader';

interface RestType {
  restaurantData: {};
  onRefresh: () => void;
  refreshing: boolean;
  isLoading: boolean;
}
const RestaurantListContainer = React.memo(() => {
  const {data, refetch, isLoading} = useRestaurants();
  const [refreshing, setRfreshing] = useState(false);

  const onRefresh = async () => {
    setRfreshing(true);
    await refetch();
    setRfreshing(false);
  };
  return (
    <RestaurantList
      restaurantData={data}
      onRefresh={onRefresh}
      refreshing={refreshing}
      isLoading={isLoading}
    />
  );
});

const RestaurantList = ({
  restaurantData,
  onRefresh,
  refreshing,
  isLoading,
}: RestType) => (
  <SafeAreaView style={{flex: 1}}>
    <RestHeader />
    <Restaurant
      restaurantData={restaurantData}
      onRefresh={onRefresh}
      refreshing={refreshing}
      isLoading={isLoading}
    />
  </SafeAreaView>
);

export default RestaurantListContainer;
