import React, {useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {useCartState} from '../../contexts/CartContext';

const RestHeader = () => {
  const navigation = useNavigation();
  const {menuCart} = useCartState();
  const navigateTo = useCallback(to => {
    navigation.navigate(to);
  }, []);

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.leftContent}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('rest')}>
              <FIcon name="bars" color={'#8f44fd'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightContent}>
          <TouchableOpacity
            style={{marginHorizontal: 10, alignSelf: 'center'}}
            onPress={() => navigateTo('Notification')}>
            <FIcon name="bell" size={30} color="#8f44fd" />
            <View
              style={{
                position: 'absolute',
                top: -13,
                right: -4,
                paddingVertical: 1,
                padding: 5,
                borderRadius: 50,
              }}>
              <Text style={{fontSize: 12, fontWeight: '700', color: '#8f44fd'}}>
                0
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cartIconContainer}
            onPress={() => navigateTo('cart')}>
            <FIcon name="shopping-cart" size={25} color="#8f44fd" />
            <View
              style={{
                position: 'absolute',
                top: -13,
                right: 1,
              }}>
              <Text style={{fontSize: 12, color: '#8f44fd', fontWeight: '700'}}>
                {menuCart.reduce((acc, item) => acc + item.count, 0)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default React.memo(RestHeader);

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 3},

    shadowRadius: 3,
    elevation: 3,
  },

  leftContent: {
    flexDirection: 'row',
  },
  title: {
    color: '#8f44fd',
    fontWeight: 'bold',
    fontSize: 18,
  },
  rightContent: {
    flexDirection: 'row',
    marginRight: 10,
  },

  searchIconContainer: {
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  cartIconContainer: {
    marginHorizontal: 10,
    alignSelf: 'center',
  },

  button: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 90 / 2,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  button1: {
    backgroundColor: '#8f44fd',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 90 / 2,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  buttonIn: {
    backgroundColor: '#f4f5f7',
    width: 50,
    height: 50,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  txt: {
    color: '#8f44fd',
    fontWeight: 'bold',
    fontSize: 7,
  },
});
