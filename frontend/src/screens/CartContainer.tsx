import React, {memo} from 'react';
import {SafeAreaView} from 'react-native';
import RestHeader from '../components/headers/RestHeader';
import Cart from './Cart';
import {useCartState} from '../contexts/CartContext';
interface CartType {
  menuCart: {};
  menuCartTotal: number;
}
const CartContainer = () => {
  const {menuCart, menuCartTotal} = useCartState();
  return <CartList menuCart={menuCart} menuCartTotal={menuCartTotal} />;
};

const CartList = ({menuCart, menuCartTotal}: CartType) => (
  <SafeAreaView style={{flex: 1}}>
    <RestHeader />
    <Cart menuCart={menuCart} menuCartTotal={menuCartTotal} />
  </SafeAreaView>
);

export default CartContainer;
