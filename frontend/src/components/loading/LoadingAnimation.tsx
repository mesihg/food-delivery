import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingAnimation = () => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <LottieView
        source={require('../../../assets/splash/splash.json')}
        style={{
          width: 200,
          aspectRatio: 50 / 100,
          flexGrow: 1,
          alignSelf: 'center',
        }}
        resizeMode="contain"
        loop={true}
        autoPlay
      />
    </View>
  );
};

export default LoadingAnimation;
