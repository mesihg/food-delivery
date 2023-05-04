import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const RestaurantItem = React.memo(({item}: any) => {
  const navigation = useNavigation();
  const goRestaurant = useCallback((item: any) => {
    navigation.navigate('menus', {id: item.id});
  }, []);
  return (
    <TouchableOpacity
      onPress={() => goRestaurant(item)}
      style={{
        marginVertical: 32,
      }}>
      <Image
        style={{
          height: height / 5,
          width: width,
          resizeMode: 'contain',
        }}
        source={{uri: `http://10.0.2.2:8000/${item.image}`}}
      />
      <View
        style={{
          width: '90%',
          marginTop: -20,
          marginRight: 16,
          marginLeft: 20,
          padding: 8,
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderRadius: 12,
          shadowColor: '#9a9a9a',
          shadowOffset: {width: 0, height: 2},

          shadowRadius: 2,
          elevation: 2,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              width: '60%',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              {item.name}
            </Text>

            <Text
              style={{
                color: '#9a9a9a',
                fontSize: 14,
              }}>
              {item.description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#000',
                marginRight: 20,
              }}>
              {item.prep_time} min
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#000',
              }}>
              ${item.price_range}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: '#9a9a9a',
            fontSize: 12,
          }}>
          {item.restaurant_type}
        </Text>

        {item.active ? (
          <View
            style={{
              marginTop: 6,

              borderWidth: 1,
              borderColor: '#8f44fd',
              borderRadius: 8,
              height: Platform.OS === 'ios' ? 30 : 25,
              paddingHorizontal: 20,
              alignItems: 'center',
              shadowColor: '#fff',
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 2,
              elevation: 2,
            }}>
            <Text
              style={{
                color: '#333',
                fontSize: 12,
                fontWeight: '700',
              }}>
              open
            </Text>
          </View>
        ) : (
          <View
            style={{
              marginTop: 6,
              backgroundColor: '#e7d9d9',
              borderWidth: 1,
              borderColor: '#e7d9d9',
              borderRadius: 8,
              height: Platform.OS === 'ios' ? 30 : 25,
              paddingHorizontal: 20,
              alignItems: 'center',
              shadowColor: '#fff',
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 2,
              elevation: 2,
            }}>
            <Text
              style={{
                color: '#E10600',
                fontSize: 12,
                fontWeight: '700',
              }}>
              Closed
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

export default RestaurantItem;
