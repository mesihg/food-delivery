import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useRestaurantMenus} from '../hooks/useRestaurants';
import Menu from './Menu';
import RestHeader from '../components/headers/RestHeader';

interface RestMenuType {
  menuData: {};
  onRefresh: () => void;
  refreshing: boolean;
  isLoading: boolean;
}
const RestaurantMenuContainer = React.memo(({route}: any) => {
  const {id} = route.params;
  const {data, refetch, isLoading} = useRestaurantMenus(id);
  const [refreshing, setRfreshing] = useState(false);

  const onRefresh = async () => {
    setRfreshing(true);
    await refetch();
    setRfreshing(false);
  };
  return (
    <RestaurantMenuList
      menuData={data}
      onRefresh={onRefresh}
      refreshing={refreshing}
      isLoading={isLoading}
    />
  );
});

const RestaurantMenuList = ({
  menuData,
  onRefresh,
  refreshing,
  isLoading,
}: RestMenuType) => (
  <SafeAreaView style={{flex: 1}}>
    <RestHeader />
    <Menu
      menuData={menuData}
      onRefresh={onRefresh}
      refreshing={refreshing}
      isLoading={isLoading}
    />
  </SafeAreaView>
);

export default RestaurantMenuContainer;
