import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import TextInput from '../components/inputs/TextInput';
import jwt_decode from 'jwt-decode';
import Toast from 'react-native-tiny-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthActions} from '../contexts/AuthContext';
import {userLogin} from '../hooks/users';
import {setAuthConfigToken} from '../utils/setAuthConfigToken';
import DismissKeyboard from '../components/keyboard/DismissKeyboard';
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(15, 'Too Long')
    .required('Password is required'),
});

interface Props {
  navigation: any;
}
interface LoginType {
  email: string;
  password: string;
}
const Login: React.FC<Props> = ({navigation}) => {
  const [passvisible, setPassVisible] = useState(true);
  const {setUser, setIsAuthenticated} = useAuthActions();
  const customerLogin = userLogin();
  const handlePasswordVisiblity = () => {
    setPassVisible(passvisible ? false : true);
  };
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            const loginData: LoginType = {
              email: values.email,
              password: values.password,
            };
            customerLogin.mutate(loginData, {
              onSuccess: async (data: {token?: string}) => {
                if (data?.token) {
                  const tokenData = data?.token;
                  setAuthConfigToken(tokenData?.token);
                  const decoded: object = jwt_decode(tokenData?.token);
                  setUser(decoded);
                  setIsAuthenticated(true);
                  await AsyncStorage.setItem(
                    'token',
                    JSON.stringify(tokenData?.token),
                  );
                }
              },
              onError: (err: Error) => {
                setIsAuthenticated(false);
                Toast.show('Could not authenticate user');
              },
            });
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            errors,
            touched,
          }) => (
            <>
              <View
                style={{
                  paddingHorizontal: 32,
                  marginBottom: 25,
                }}>
                <TextInput
                  icon="envelope"
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                />
                {errors.email && touched.email && (
                  <Text
                    style={{
                      color: '#FF0D10',
                      fontSize: 10,
                      textAlign: 'center',
                    }}>
                    {errors.email}
                  </Text>
                )}
              </View>

              <View
                style={{
                  paddingHorizontal: 32,
                  marginBottom: 16,
                }}>
                <TextInput
                  icon="lock"
                  placeholder="Enter your password"
                  secureTextEntry={passvisible}
                  autoComplete="password"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                />

                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 15,
                    right: 45,
                  }}
                  onPress={handlePasswordVisiblity}>
                  <FIcon
                    name={!passvisible ? 'eye' : 'eye-slash'}
                    color="#223e4b"
                    size={20}
                  />
                </TouchableOpacity>
                {errors.password && touched.password && (
                  <Text
                    style={{
                      color: '#FF0D10',
                      fontSize: 10,
                      textAlign: 'center',
                    }}>
                    {errors.password}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor:
                    !isValid || customerLogin.isLoading ? '#9a9a9a' : '#8f44fd',
                  justifyContent: 'center',
                  marginHorizontal: 25,
                  marginTop: 15,
                }}
                disabled={!isValid || customerLogin.isLoading}
                onPress={handleSubmit}>
                {!customerLogin.isLoading ? (
                  <Text style={styles.loginTxt}>Login</Text>
                ) : (
                  <ActivityIndicator size="small" color="#fff" />
                )}
              </TouchableOpacity>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 16, color: '#9a9a9a'}}>
                  Don't have account?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('register')}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#8f44fd',
                      paddingLeft: 5,
                    }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </DismissKeyboard>
  );
};

export default Login;

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },

  forgotPassword: {
    marginTop: 20,
    marginHorizontal: 25,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  btnLogin: {
    padding: 10,
    backgroundColor: '#8f44fd',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginTop: 25,
  },

  forgotTxt: {
    color: '#8f2c2d',
    fontSize: 14,
  },
  loginTxt: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
