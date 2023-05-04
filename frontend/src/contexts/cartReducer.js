export const ADD_MENU = 'ADD_MENU';
export const REMOVE_MENU = 'REMOVE_MENU';
export const INCREMENT_MENU_CART = 'INCREMENT_MENU_CART';
export const DECREMENT_MENU_CART = 'DECREMENT_MENU_CART';
export const CLEAR_MENU_CART = 'CLEAR_MENU_CART';

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_MENU:
      const menuCartItems = state.menuCart.slice();
      let existedItem = menuCartItems.find(
        menu => menu.id === action.payload.id,
      );
      if (existedItem) {
        existedItem.count++;
      } else {
        menuCartItems.push({ ...action.payload, count: 1 });
      }
      return {
        ...state,
        menuCart: menuCartItems,
        menuCartTotal: menuCartItems.reduce(
          (acc, item) =>
            acc +
            item.item_price * item.count -
            (item.item_price * item.count * item.item_discount) / 100,
          0,
        ),
      };
    case REMOVE_MENU:
      const menuCartItemFiltered = state.menuCart
        .slice()
        .filter(item => item.id !== action.payload.id);
      return {
        ...state,
        menuCart: menuCartItemFiltered,
        menuCartTotal: menuCartItemFiltered.reduce(
          (acc, item) =>
            acc +
            item.item_price * item.count -
            (item.item_price * item.count * item.item_discount) / 100,
          0,
        ),
      };
    case INCREMENT_MENU_CART:
      const menuCartItemsIncr = state.menuCart.slice();
      let existItemIncr = menuCartItemsIncr.find(
        item => item.id === action.payload.id,
      );
      if (existItemIncr) {
        existItemIncr.count++;
      }
      return {
        ...state,
        menuCart: menuCartItemsIncr,
        menuCartTotal: menuCartItemsIncr.reduce(
          (acc, item) =>
            acc +
            item.item_price * item.count -
            (item.item_price * item.count * item.item_discount) / 100,
          0,
        ),
      };
    case DECREMENT_MENU_CART:
      const menuCartItemsDecr = state.menuCart.slice();
      let existItemDecr = menuCartItemsDecr.find(
        item => item.id === action.payload.id,
      );
      if (existItemDecr && existItemDecr.count > 1) {
        existItemDecr.count = existItemDecr.count - 1;
      }
      return {
        ...state,
        menuCart: menuCartItemsDecr,
        menuCartTotal: menuCartItemsDecr.reduce(
          (acc, item) =>
            acc +
            item.item_price * item.count -
            (item.item_price * item.count * item.item_discount) / 100,
          0,
        ),
      };
    case CLEAR_MENU_CART:
      return {
        ...state,
        menuCart: action.payload,
        drinkCart: action.payload,
        menuCartTotal: 0,
        drinkCartTotal: 0,
      };
    default:
      return state;
  }
};
