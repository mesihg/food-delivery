import React from 'react';
import {Modal} from 'react-native';
import LottieView from 'lottie-react-native';
const SplashScreen = () => {
  const [loading, setLoading] = React.useState(true);

  const handleLoadingAnimation = () => {
    setLoading(false);
  };
  return (
    <Modal visible={loading} animationType="fade">
      <LottieView
        source={require('../../assets/splash/splash.json')}
        loop={false}
        autoPlay
        onAnimationFinish={handleLoadingAnimation}
      />
    </Modal>
  );
};

export default SplashScreen;
