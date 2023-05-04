import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput as TextInputRN,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/inputs/TextInput';
import jwt_decode from 'jwt-decode';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Toast from 'react-native-tiny-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthActions} from '../contexts/AuthContext';
import {setAuthConfigToken} from '../utils/setAuthConfigToken';
import DismissKeyboard from '../components/keyboard/DismissKeyboard';
import {userSignUp} from '../hooks/users';
import PhoneTextInput from '../components/inputs/PhoneTextInput';
const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, ({min}) => `password must be at least${min} characters`)
    .required('Password is required'),
  password1: Yup.string()
    .oneOf([Yup.ref('password')], 'password do not  match')
    .required('confirm password is required'),
  firstName: Yup.string()
    .min(2, 'Too Short')
    .max(15, 'Too Long')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short')
    .max(15, 'Too Long')
    .required('Last Name is required'),

  phone: Yup.string()
    .matches(/(09)\d{8}/, 'Enter a valid phone number\n Eg. 0911xxxxxx')
    .length(10)
    .required('Phone number is required'),

  dob: Yup.date()
    .min(new Date('1920-01-02'))
    .max(new Date())
    .required('Birth date is required.'),

  address: Yup.string()
    .min(1, 'Too Short')
    .max(100, 'Too Long')
    .required('Address is required'),

  gender: Yup.string().required('Gender is required'),
});

interface Props {
  navigation: any;
}

const Register: React.FC<Props> = ({navigation}) => {
  const [date, setDate] = useState(new Date('1980-01-01'));
  const placehold = new Date(date).getFullYear();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const {setUser, setIsAuthenticated} = useAuthActions();
  const userSignUP = userSignUp();
  const onChange = (selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    // setFieldValue('dob', currentDate);
    setDate(currentDate);
    setShow(false);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const lastname = useRef<TextInputRN>(null);
  const email = useRef<TextInputRN>(null);
  const phone = useRef<TextInputRN>(null);
  const password = useRef<TextInputRN>(null);
  const password1 = useRef<TextInputRN>(null);
  const address = useRef<TextInputRN>(null);
  const gender = useRef<TextInputRN>(null);

  return (
    <DismissKeyboard>
      <Formik
        validationSchema={SignUpSchema}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dob: '',
          address: '',
          password: '',
          password1: '',
          gender: '',
        }}
        onSubmit={async values => {
          const profile = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone: values.phone,
            dob: moment(values.dob).format('YYYY-MM-DD'),
            password: values.password,
            password1: values.password1,
            address: values.address,
            gender: values.gender.toLowerCase(),
            role: 'user',
          };

          userSignUP.mutate(profile, {
            onSuccess: async data => {
              if (data?.account_exist) {
                Toast.show(data?.msg);
              } else {
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
            onError: error => {
              console.log(JSON.stringify(error));
              setIsAuthenticated(false);
              Toast.show('Could not authenticate user');
            },
          });
        }}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
          isValid,
          values,
          errors,
          touched,
        }) => (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 30,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  marginLeft: 10 * 1.5,
                  color: '#333',
                  fontWeight: '700',
                  fontFamily: 'times',
                  fontSize: 18,
                  lineHeight: 22,
                }}>
                Register
              </Text>
            </View>
            <ScrollView>
              <View
                style={{
                  paddingHorizontal: 32,
                  marginBottom: 26,
                  flex: 1,
                }}>
                <TextInput
                  icon="user"
                  placeholder="Your First Name"
                  autoCapitalize="none"
                  keyboardType="default"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  error={errors.firstName}
                  touched={touched.firstName}
                  onSubmitEditing={() => lastname.current?.focus()}
                />
                {errors.firstName && touched.firstName && (
                  <Text
                    style={{
                      color: '#FF0D10',
                      fontSize: 10,
                      textAlign: 'center',
                    }}>
                    {errors.firstName}
                  </Text>
                )}
              </View>

              <View
                style={{
                  paddingHorizontal: 32,
                  marginBottom: 16,
                }}>
                <TextInput
                  ref={lastname}
                  icon="user"
                  placeholder="Your Last Name"
                  autoCapitalize="none"
                  keyboardType="default"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  error={errors.lastName}
                  touched={touched.lastName}
                  onSubmitEditing={() => email.current?.focus()}
                />
                {errors.lastName && touched.lastName && (
                  <Text
                    style={{
                      color: '#FF0D10',
                      fontSize: 10,
                      textAlign: 'center',
                    }}>
                    {errors.lastName}
                  </Text>
                )}
              </View>

              <View
                style={{
                  paddingHorizontal: 32,
                  marginBottom: 16,
                }}>
                <TextInput
                  ref={email}
                  icon="envelope"
                  placeholder="Your email"
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
                <PhoneTextInput
                  ref={phone}
                  icon="phone"
                  placeholder="09xxxxxxxx"
                  autoCapitalize="none"
                  autoComplete="tel"
                  keyboardType="phone-pad"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  maxLength={10}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={errors.phone}
                  touched={touched.phone}
                />

                {errors.phone && touched.phone && (
                  <Text
                    style={{
                      color: '#FF0D10',
                      fontSize: 10,
                      textAlign: 'center',
                    }}>
                    {errors.phone}
                  </Text>
                )}
              </View>

              <View
                style={{
                  paddingHorizontal: 32,
                  marginBottom: 16,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 48,
                    borderRadius: 8,
                    borderColor: !touched.dob
                      ? '#223e4b'
                      : errors.dob
                      ? '#FF5A5F'
                      : '#223e4b',
                    borderWidth: StyleSheet.hairlineWidth,
                    padding: 4,
                  }}>
                  <View style={{padding: 8}}>
                    <Icon
                      name="birthday-cake"
                      color={
                        !touched.dob
                          ? '#223e4b'
                          : errors.dob
                          ? '#FF5A5F'
                          : '#223e4b'
                      }
                      size={20}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        {
                          fontSize: 16,
                          color: '#9a9a9a',
                          paddingLeft: 10,
                        },
                        {},
                      ]}
                      onPress={showDatePicker}>
                      {placehold === 1980 ? (
                        <Text>Your birth date</Text>
                      ) : date !== undefined && placehold !== 1980 ? (
                        moment(date).format('DD/MM/YYYY')
                      ) : (
                        moment().format('DD/MM/YYYY')
                      )}
                    </Text>

                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        // mode={mode}
                        style={{backgroundColor: '#fff'}}
                        value={date}
                        display="spinner"
                        onChange={(event, selectedDate) => {
                          const currentDate = selectedDate || date;
                          setShow(Platform.OS === 'ios');
                          setFieldValue('dob', currentDate);
                          setDate(currentDate);
                          setShow(false);
                        }}
                        // onSubmitEditing={() => address.current?.focus()}
                      />
                    )}
                  </View>
                </View>

                {errors.dob && touched.dob && (
                  <Text
                    style={{
                      color: '#FF0D10',
                      fontSize: 10,
                      textAlign: 'center',
                    }}>
                    {errors.dob}
                  </Text>
                )}
              </View>

              <View
                style={{
                  paddingHorizontal: 32,
                  marginBottom: 16,
                }}>
                <TextInput
                  ref={address}
                  icon="map-marker"
                  placeholder="Your address"
                  autoCapitalize="none"
                  keyboardType="default"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  error={errors.address}
                  touched={touched.address}
                  onSubmitEditing={() => password.current?.focus()}
                />
                {errors.address && touched.address && (
                  <Text
                    style={{
                      color: '#FF0D10',
                      fontSize: 10,
                      textAlign: 'center',
                    }}>
                    {errors.address}
                  </Text>
                )}
              </View>

              <View
                style={{
                  paddingHorizontal: 32,
                  marginBottom: 16,
                }}>
                <TextInput
                  ref={password}
                  icon="lock"
                  placeholder="Your password"
                  secureTextEntry
                  autoComplete="password"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                  onSubmitEditing={() => password1.current?.focus()}
                />
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

              <View
                style={{
                  paddingHorizontal: 32,
                  marginBottom: 16,
                }}>
                <TextInput
                  ref={password1}
                  icon="lock"
                  placeholder="Confirm your password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                  keyboardType="default"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  onChangeText={handleChange('password1')}
                  onBlur={handleBlur('password1')}
                  error={errors.password1}
                  touched={touched.password1}
                  onSubmitEditing={() => gender.current?.focus()}
                />
                {errors.password1 && touched.password1 && (
                  <Text
                    style={{
                      color: '#FF0D10',
                      fontSize: 10,
                      textAlign: 'center',
                    }}>
                    {errors.password1}
                  </Text>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 32,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CheckBox
                    tintColors={{true: '#8f44fd', false: '#223e4b'}}
                    value={values.gender === 'Male' ? true : false}
                    onValueChange={() => setFieldValue('gender', 'Male')}
                    // error={errors.gender}
                    // touched={touched.gender}
                  />
                  <Text style={{fontSize: 20, marginLeft: 5, color: '#9a9a9a'}}>
                    Male
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CheckBox
                    tintColors={{true: '#8f44fd', false: '#223e4b'}}
                    value={values.gender === 'Female' ? true : false}
                    onValueChange={() => setFieldValue('gender', 'Female')}
                    // error={errors.gender}
                    // touched={touched.gender}
                  />
                  <Text style={{fontSize: 20, marginLeft: 5, color: '#9a9a9a'}}>
                    Female
                  </Text>
                </View>
              </View>

              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {errors.gender && touched.gender && (
                  <Text
                    style={{
                      color: '#FF0D10',
                      fontSize: 10,
                      textAlign: 'center',
                    }}>
                    {errors.gender}
                  </Text>
                )}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 15,
                backgroundColor: !isValid ? '#9a9a9a' : '#8f44fd',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 25,
              }}
              disabled={!isValid || userSignUP.isLoading}
              onPress={handleSubmit}>
              {!userSignUP.isLoading ? (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  Sign Up
                </Text>
              ) : (
                <ActivityIndicator size="small" color="#fff" />
              )}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{fontSize: 16}}>Already have an account?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('login')}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#8f44fd',
                    paddingLeft: 5,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </DismissKeyboard>
  );
};

export default Register;

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
    color: '#8f44fd',
    fontSize: 14,
  },
  loginTxt: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
