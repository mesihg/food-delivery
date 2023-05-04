import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCartDispatch} from '../../contexts/CartContext';

const {width} = Dimensions.get('screen');
const IMG_WIDTH = width / 4;
const IMG_HEIGHT = width / 4.5;

const CartItem = ({item}) => {
  const {removeMenuFromCart, incrementMenuCart, decrementMenuCart} =
    useCartDispatch();
  return (
    <>
      <View
        style={{
          flex: 1,
          zIndex: -100,
          marginHorizontal: 10,
          height: 110,
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
          paddingHorizontal: 10,
          borderRadius: 5,
          marginTop: 5,
        }}>
        <View style={{width: '35%', height: '100%', alignItems: 'flex-start'}}>
          <Image
            style={{
              width: IMG_WIDTH,
              height: IMG_HEIGHT,
            }}
            source={{uri: `http://10.0.2.2:8000/${item.image}`}}
          />
        </View>
        <View
          style={{
            width: '65%',
            paddingLeft: 15,
            height: 90,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '80%'}}>
              <Text style={{fontSize: 14, fontWeight: '700'}}>{item.name}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => removeMenuFromCart(item)}>
                <Icon name="close" size={20} color="#8f44fd" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{fontSize: 12, color: '#9a9a9a'}}>
            {item.count}X{item.price} ETB
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 5,
                paddingHorizontal: 10,
                marginTop: 5,
              }}>
              <TouchableOpacity
                style={{
                  width: '35%',
                  borderColor: '#9a9a9a',
                  borderWidth: 1,
                  alignItems: 'center',
                }}
                onPress={() => decrementMenuCart(item)}>
                <Icon name="minus" size={21} color="#9a9a9a" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '35%',
                  borderColor: '#9a9a9a',
                  borderWidth: 1,
                  alignItems: 'center',
                }}
                onPress={() => incrementMenuCart(item)}>
                <Icon name="plus" size={21} color="#9a9a9a" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
export default CartItem;
