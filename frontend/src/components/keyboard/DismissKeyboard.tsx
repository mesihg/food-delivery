import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

export default ({children}: any) => {
  const onPress = () => Keyboard.dismiss();
  return <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>;
};
