import React, {forwardRef} from 'react';
import {View, TextInput as RNTextInput, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  icon: string;
  error?: string;
  touched?: boolean;
} & React.ComponentProps<typeof RNTextInput>;

const PhoneTextInput = forwardRef<RNTextInput, Props>(
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
          borderWidth: 1,
          padding: 4,
        }}>
        <View style={{padding: 8}}>
          <Icon name={icon} color={validationColor} size={20} />
        </View>
        <View
          style={{
            borderRightWidth: 1,
            paddingRight: 5,
            borderRightColor: 'rgba(34,62,75,0.7)',
          }}>
          <Text style={{color: 'rgba(34,62,75,0.7)'}}>+251</Text>
        </View>
        <View style={{flex: 1}}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34,62,75,0.7)"
            ref={ref}
            {...otherProps}
            style={{paddingLeft: 10}}
          />
        </View>
      </View>
    );
  },
);

export default PhoneTextInput;
