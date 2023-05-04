import RestHeader from '../components/headers/RestHeader';
import {useAuthActions, useAuthStates} from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

const Profile = () => {
  const {logout} = useAuthActions();
  const {user} = useAuthStates();
  console.log(user);
  return (
    <SafeAreaView style={{flex: 1}}>
      <RestHeader />
      <View>
        <Icon
          name="user-circle-o"
          size={80}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            color: '#9a9a9a',
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            alignSelf: 'center',
            fontFamily: 'times',
            padding: 8,
            color: '#333',
          }}>
          Name Here
        </Text>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: '#8f44fd',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              width: 70,
              marginTop: 5,
              padding: 5,
            }}
            onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
