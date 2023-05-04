import React, {forwardRef} from 'react';
import {TextInput as RNTextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  icon: string;
  error?: string;
  touched?: boolean;
} & React.ComponentProps<typeof RNTextInput>;

const TextInput = forwardRef<RNTextInput, Props>(
  ({icon, error, touched, ...otherProps}, ref) => {
    const validationColor = !touched
      ? '#223e4b'
      : error
      ? '#FF5A5F'
      : '#223e4b';
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 48,
          borderRadius: 8,
          borderColor: validationColor,
          borderWidth: StyleSheet.hairlineWidth,
          padding: 4,
        }}>
        <View style={{padding: 8}}>
          <Icon name={icon} color={validationColor} size={20} />
        </View>
        <View style={{flex: 1}}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34,62,75,0.7)"
            ref={ref}
            {...otherProps}
          />
        </View>
      </View>
    );
  },
);

export default TextInput;
