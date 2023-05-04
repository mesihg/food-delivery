import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {useCartDispatch} from '../../contexts/CartContext';
const {width, height} = Dimensions.get('window');
const RestaurantMenuItem = React.memo(({item}: any) => {
  const {addToCart} = useCartDispatch();
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginLeft: 10,
        marginTop: Platform.OS === 'ios' ? 40 : 20, //remember this
        width: '90%',
      }}>
      <Image
        style={{
          width: width / 3,
          height: width / 3.4,
        }}
        source={{uri: `http://10.0.2.2:8000/${item.image}`}}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{marginLeft: 10}}>
          <View style={{marginRight: 10, width: width / 3}}>
            <Text style={{fontWeight: '700', fontSize: 16}}>{item.name}</Text>
          </View>
          <View style={{marginRight: 10, width: width / 3}}>
            <Text
              style={{
                fontSize: 11,
                color: '#9a9a9a',
              }}>
              {item.menu_ingredients}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
            }}>
            {item.price} ETB
          </Text>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: '#8f44fd',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              width: 70,
              marginTop: 5,
              padding: 5,
            }}
            onPress={() => {
              addToCart(item);
              Toast.show('Item added successfuly.');
            }}>
            <Text style={{fontSize: 10, fontWeight: 'bold', color: '#fff'}}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

export default RestaurantMenuItem;
