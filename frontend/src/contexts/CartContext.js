import React, { createContext, useContext, useMemo, useReducer } from 'react';

import {
  ADD_MENU,
  INCREMENT_MENU_CART,
  DECREMENT_MENU_CART,
  cartReducer,
  CLEAR_MENU_CART,
  REMOVE_MENU,
} from './cartReducer';

const initialState = {
  menuCart: [],
  menuCartTotal: 0,
};
const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = item =>
    dispatch({
      type: ADD_MENU,
      payload: item,
    });
  const removeMenuFromCart = item =>
    dispatch({
      type: REMOVE_MENU,
      payload: item,
    });
  const incrementMenuCart = item =>
    dispatch({
      type: INCREMENT_MENU_CART,
      payload: item,
    });
  const decrementMenuCart = item =>
    dispatch({
      type: DECREMENT_MENU_CART,
      payload: item,
    });
  const clearMenuCart = () => dispatch({
    type: CLEAR_MENU_CART,
    payload: [],
  });

  const dispatchValues = useMemo(() => ({
    clearMenuCart,
    addToCart,
    removeMenuFromCart,
    incrementMenuCart,
    decrementMenuCart,
  }));

  const stateValues = useMemo(
    () => ({
      menuCart: cartState.menuCart,
      menuCartTotal: cartState.menuCartTotal,
    })
  );
  return (
    <CartDispatchContext.Provider value={dispatchValues}>
      <CartStateContext.Provider value={stateValues}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
