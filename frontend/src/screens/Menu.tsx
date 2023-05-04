import ItemSeparator from '../components/ItemSeparator';
import RestaurantMenuItem from '../components/items/RestaurantMenuItem';
import LoadingAnimation from '../components/loading/LoadingAnimation';
import {FlatList, RefreshControl, Text, View} from 'react-native';

interface RestMenuType {
  menuData: {};
  onRefresh: () => void;
  refreshing: boolean;
  isLoading: boolean;
}
const Menu = ({menuData, onRefresh, refreshing, isLoading}: RestMenuType) => {
  const renderItemSeparator = () => <ItemSeparator />;
  const renderRestaurantMenuItem = ({item}: any) => (
    <RestaurantMenuItem item={item} key={item.id} />
  );

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <FlatList
          data={menuData}
          scrollEventThrottle={16}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={renderRestaurantMenuItem}
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
          ItemSeparatorComponent={renderItemSeparator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </>
  );
};

export default Menu;
