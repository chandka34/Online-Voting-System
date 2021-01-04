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
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../asset/colors';
import Loader from './Components/loader';
import { baseUrl } from '../asset/urls';


const RegisterScreen = props => {
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
  let [mailSent, setMailSent] = useState(false);
  let [mailCode, setMailCode] = useState('');
  let [userCode, setUserCode] = useState('');


  const verifyPressed =()=>{
        if(mailCode == userCode){
           activateAcount()
        }
        else{
          alert("Code did not match")
        }
  }

  const activateAcount=()=>{
    fetch(''+baseUrl.base+'users/ActivateAccount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ActivationCode: userCode
      })
    }).then(response => response.json())
    .then(responseJson => {
     
     console.log(responseJson.message);
      // If server response message same as Data Matched
      if(responseJson.message == "Account activated successfully"){
        setIsRegistraionSuccess(true)
          
      }
      else{
          alert(responseJson.message)
      }
      
    }).catch(error => {
      //Hide Loader
     
      console.log(error);
    });
  }

  const handleSubmitButton = () => {
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



    //Show Loader
   setLoading(true);


   fetch(''+baseUrl.base+'users/register', {
    method: 'POST',
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
    // If server response message same as Data Matched
    if (responseJson.message=="Email activation code is sent to your email. Kindly check your email") {
     setMailCode(responseJson.codes[0])
     setMailSent(true)
      // setIsRegistraionSuccess(true);
    } else {
      setErrortext(responseJson.message);
    }
  }).catch(error => {
    //Hide Loader
    setLoading(false);
    console.log(error);
  });
  


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
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.png')}
          style={{ height: 250, resizeMode: 'contain', alignSelf: 'center',tintColor:COLORS.PrimaryOne }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }



  if (mailSent) {
    return (
      <View style={{
         height:"100%",
          backgroundColor: '#FFFFFF',
         
        }}>

          <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38,flexDirection:"row",alignItems:"center"}}>
       
          <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
            Verify Code
         </Text>
         </View>
           <Text style={{fontSize:16,alignSelf:"center",margin:10,color:COLORS.PrimaryOne}}>Please enter your (6) digit Verification code which is sent to you through your provided E-mail Address. In case of not getting a Verification code, kindly check your "Spam" messages!</Text>
           <TextInput
            style={styles.input}
            placeholder={"Enter 6 digit code"}
            maxLength={6}
            onChangeText={text=>setUserCode(text)}
            underlineColorAndroid='transparent'
            keyboardType={"numeric"}
           />       
     
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={verifyPressed.bind(this)}>
              <Text style={styles.buttonTextStyle}>Verify</Text>
            </TouchableOpacity>
        
      </View>
    );
  }



  

  return (
    
    <View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
      <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38}}>
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         Sign Up
       </Text>
      </View>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
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
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

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
  input: {
    marginTop:12,
    width:'90%',
    borderColor:COLORS.PrimaryOne,
    borderWidth:2,
    alignSelf:"center",
    fontSize:18,
    color:COLORS.PrimaryOne,
    borderRadius:12
},
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: COLORS.PrimaryOne,
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});