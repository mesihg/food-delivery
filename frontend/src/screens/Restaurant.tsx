import {useCallback, useRef} from 'react';
import {FlatList, View, Text, RefreshControl} from 'react-native';
import RestaurantItem from '../components/items/RestaurantItem';
import LoadingAnimation from '../components/loading/LoadingAnimation';
interface RestType {
  restaurantData: {};
  onRefresh: () => void;
  refreshing: boolean;
  isLoading: boolean;
}

const Restaurant = ({
  restaurantData,
  onRefresh,
  refreshing,
  isLoading,
}: RestType) => {
  const restRef = useRef<FlatList>();

  const renderRestaurantListItem = useCallback(
    ({item}: any) => <RestaurantItem item={item} />,
    [],
  );
  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <FlatList
          data={restaurantData}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => String(item.id)}
          renderItem={renderRestaurantListItem}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                marginTop: 70,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text style={{fontSize: 22}}>No Items Found.</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </>
  );
};

export default Restaurant;
