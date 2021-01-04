/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../asset/urls';



//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../asset/colors';
import Loader from './Components/loader';

const SettingsScreen = ({navigation}) => {
  let [userFName, setUserFName] = useState('');
  let [userLName, setUserLName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [userOrganizationID, setUserOrganizationID] = useState('');
  let [userDepartmentID, setUserDepartmentID] = useState('');


  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitButton = async() => {
    setErrortext('');
    if (!userFName) {
      alert('Please fill Name');
      return;
    }

    if (!userLName) {
      alert('Please fill last Name');
      return;
    }

    if (!userContact) {
      alert('Please fill Contact');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill password');
      return;
    }
    if (!userOrganizationID) {
      alert('Please fill organization id');
      return;
    }

    if (!userDepartmentID) {
      alert('Please fill department id');
      return;
    }


    setLoading(true);

    let id = await AsyncStorage.getItem('user_id')
    fetch(''+baseUrl.base+'users/'+id, {
     method: 'PUT',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       First_name :userFName,
       Last_name :userLName,
      email :userEmail,
      phone_no:userContact,
      password:userPassword,
      organization_id:userOrganizationID,
      department_id:userDepartmentID
     })
   }).then(response => response.json())
   .then(responseJson => {
     //Hide Loader
     setLoading(false);
    console.log(responseJson);
    alert(responseJson.message)
     // If server response message same as Data Matched
    
   }).catch(error => {
     //Hide Loader
     setLoading(false);
     console.log(error);
   });


    //Show Loader
   // setLoading(true);
    // var dataToSend = {
    //   user_name: userName,
    //   user_email: userEmail,
    //   user_age: userAge,
    //   user_address: userAddress,
    // };
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    // fetch('https://aboutreact.herokuapp.com/register.php', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status == 1) {
    //       setIsRegistraionSuccess(true);
    //       console.log('Registration Successful. Please Login to proceed');
    //     } else {
    //       setErrortext('Registration Unsuccessful');
    //     }
    //   })
    //   .catch(error => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.PrimaryOne,
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Profile Update Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
      <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38,flexDirection:"row",alignItems:"center"}}>
       <TouchableOpacity  onPress={navigation.navigate.bind(this,'Home')}>
       <Image source={require('../asset/iconBack.png')} style={{height:12, width: 18,tintColor:COLORS.backgroundColor,marginLeft:22}}/>
       </TouchableOpacity>
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         Edit Profile
       </Text>
      </View>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
       
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserFName(UserName)}
             
              placeholder="Enter First Name"
              placeholderTextColor={COLORS.PrimaryOne}
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserLName(UserName)}
             
              placeholder="Enter Last Name"
              placeholderTextColor={COLORS.PrimaryOne}
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={contact => setUserContact(contact)}
            
              placeholder="Contact"
              placeholderTextColor={COLORS.PrimaryOne}
              keyboardType="numeric"
              
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
             
              placeholder="Enter Email"
              placeholderTextColor={COLORS.PrimaryOne}
              keyboardType="email-address"
             
            />
          </View>

          <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
               
                placeholder="Password" //12345
                placeholderTextColor={COLORS.PrimaryOne}
                keyboardType="default"
                
              />
              </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={organization => setUserOrganizationID(organization)}
            
              placeholder="Organization ID"
              placeholderTextColor={COLORS.PrimaryOne}
             
              
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={department => setUserDepartmentID(department)}
             
              placeholder="Department ID"
              placeholderTextColor={COLORS.PrimaryOne}
              
             
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Save Changes</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 6,
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});