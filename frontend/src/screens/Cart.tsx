import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import CartItem from '../components/items/CartItem';

const Cart = React.memo(({menuCart}) => {
  console.log(menuCart);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        {menuCart.map(item => (
          <CartItem item={item} key={item.id} />
        ))}
        {menuCart.length <= 0 && (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Your cart is empty
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
});

export default Cart;
