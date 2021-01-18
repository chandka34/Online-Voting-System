/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/loader';
import { COLORS } from '../asset/colors';
import { baseUrl } from '../asset/urls';

const LoginScreen = props => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    setLoading(true);
    fetch(''+baseUrl.base+'users/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: userEmail,
    password: userPassword
  })
}).then(response => response.json())
.then(responseJson => {
  //Hide Loader
  setLoading(false);
 console.log(responseJson);
  // If server response message same as Data Matched
  if (responseJson.message==="Login Successfull") {
    AsyncStorage.setItem('user_id', responseJson.Users._id);
    AsyncStorage.setItem('user_organization_id', responseJson.Users.organization);
   props.navigation.navigate("Home");
  } else {
    setErrortext("Please check your email id or password");
    console.log('Please check your email id or password');
  }
}).catch(error => {
  //Hide Loader
  setLoading(false);
  console.log(error);
});



    // if(userEmail ==="areebah@gmail.com" && userPassword ==="12345"){
    //   props.navigation.navigate('Home');
    // }
  //  setLoading(true);
  //   var dataToSend = { user_email: userEmail, user_password: userPassword };
  //   var formBody = [];
  //   for (var key in dataToSend) {
  //     var encodedKey = encodeURIComponent(key);
  //     var encodedValue = encodeURIComponent(dataToSend[key]);
  //     formBody.push(encodedKey + '=' + encodedValue);
  //   }
  //   formBody = formBody.join('&');

    // fetch('https://aboutreact.herokuapp.com/login.php', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // }).then(response => response.json())
    //   .then(responseJson => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status == 1) {
    //       AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
    //       console.log(responseJson.data[0].user_id);
    //       props.navigation.navigate('Home');
    //     } else {
    //       setErrortext('Please check your email id or password');
    //       console.log('Please check your email id or password');
    //     }
    //   })
    //   .catch(error => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };

  return (
    <View style={styles.mainBody}>
       <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38}}>
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         Login
       </Text>
      </View>

      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 60 }}>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../Image/icon.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
            
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
               
                placeholder="Username" //dummy@abc.com
                placeholderTextColor={COLORS.PrimaryOne}
                autoCapitalize="none"
                keyboardType="email-address"
               
              />
              <Image source = { require('../asset/iconfullname.png') } style = { {height:16,width:18,margin:12,tintColor:COLORS.PrimaryOne} } />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
               
                placeholder="Password" //12345
                placeholderTextColor={COLORS.PrimaryOne}
                keyboardType="default"
               
                secureTextEntry={true}
              />
              <Image source = { require('../asset/iconlock.png') } style = { {height:18,width:16,margin:12,tintColor:COLORS.PrimaryOne} } />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}

            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('Forget')}>
              Forget password?
            </Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('Signup')}>
              Signup
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundColor,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    justifyContent:"space-between",
    borderWidth: 1,
    borderBottomRightRadius:22,
    borderTopRightRadius:22,
    borderRadius: 10,
    borderColor: COLORS.PrimaryOne
  },
  buttonStyle: {
    backgroundColor: COLORS.PrimaryOne,
    borderWidth: 0,
   elevation:5,
    height: 40,
    alignItems: 'center',
    borderBottomRightRadius:22,
    borderTopRightRadius:22,
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
    width:'50%',
    alignSelf:"center"
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: COLORS.PrimaryOne,
    paddingLeft: 15,
    paddingRight: 15,
   
  },
  registerTextStyle: {
    color: COLORS.PrimaryOne,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});