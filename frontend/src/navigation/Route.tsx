import {NavigationContainer} from '@react-navigation/native';
import {useAuthStates} from '../contexts/AuthContext';
import {StatusBar, Text} from 'react-native';
import SplashScreen from './SplashScreen';
import MainRoute from './MainRoute';
import AuthRoute from './AuthRoute';

const Route = () => {
  const {isAuthenticated} = useAuthStates();
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <NavigationContainer>
        <SplashScreen />
        {isAuthenticated ? <MainRoute /> : <AuthRoute />}
      </NavigationContainer>
    </>
  );
};

export default Route;
