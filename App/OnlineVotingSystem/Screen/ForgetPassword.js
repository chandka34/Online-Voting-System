/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../asset/urls';



//Import all required component
import { View, Text ,ScrollView,TouchableOpacity ,StyleSheet,FlatList,Image,TextInput} from 'react-native';
import { COLORS } from '../asset/colors';

const ForgetPassword = ({navigation}) => {
   
    let [mailCode, setMailCode] = useState('');
    let [userCode, setUserCode] = useState('');
    let [email, setEmail] = useState('');
    let [mailSent, setMailSent] = useState(false);
    let [verfied, setVerified] = useState(false);
    let [password, setPassword] = useState('');
    

const submitForget =()=>{
  if(email ==''){
    alert("Enter email!")
  }
  else{
  fetch(''+baseUrl.base+'users/forgetPassword/1', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email
    })
  }).then(response => response.json())
  .then(responseJson => {
   
   console.log(responseJson);
    // If server response message same as Data Matched
    if (responseJson.message == "A password reset code has been sent. Kindly check your email") {
      
        setMailCode(responseJson.codes[0])
     alert(responseJson.message)
     setMailSent(true)
    } else {
      alert("Mail not sent")
    }
  }).catch(error => {
    //Hide Loader
   
    console.log(error);
  });
}
}




const verifyPressed =()=>{
    if(userCode == mailCode){
        setVerified(true)
        console.log("good")
    }
    else{
        alert("code did not match!")
    }
}

const changePassword =()=>{
    console.log(mailCode + password )
    fetch(''+baseUrl.base+'users/resetPassword/1', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            resetLink : mailCode,
            newPass : password
        })
      }).then(response => response.json())
      .then(responseJson => {
       
       console.log(responseJson.message);
        // If server response message same as Data Matched
        if(responseJson.message == "Password has been changed successfully"){
            alert(responseJson.message)
            navigation.navigate('Login')
        }
        else{
            alert(responseJson.message)
        }
        
      }).catch(error => {
        //Hide Loader
       
        console.log(error);
      });
}
 
  return (
    <View style={{height:'100%',backgroundColor:'#FFFFFF'}}>
       <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38,flexDirection:"row",alignItems:"center"}}>
       <TouchableOpacity  onPress={navigation.navigate.bind(this,'Login')}>
       <Image source={require('../asset/iconBack.png')} style={{height:12, width: 18,tintColor:COLORS.backgroundColor,marginLeft:22}}/>
       </TouchableOpacity>
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
       Recover Password
       </Text>
      </View>

{
    mailSent ? 
    <View>
        {
            verfied ? 
            <>
              <TextInput
            style={styles.input}
            placeholder={"Enter New password"}
            maxLength={6}
            onChangeText={text=>setPassword(text)}
            underlineColorAndroid='transparent'
           secureTextEntry={true}
           />       
     
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={changePassword.bind(this)}>
              <Text style={styles.buttonTextStyle}>Change Password</Text>
            </TouchableOpacity>
            </>
            :
            <>

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
            </>
        }
     
            

    </View>
    : 
    
       <View> 
         <Text style={{fontSize:16,alignSelf:"center",margin:10,color:COLORS.PrimaryOne}}>Please enter your official "Email Address" which is provided by you during signing-up an account. </Text>
         <Text style={{fontSize:16,alignSelf:"center",margin:10}}>System will send you an official E-mail of verification code! </Text>

           <TextInput
                style={styles.input}
                placeholder={"Enter valid email"}
                onChangeText={text=>setEmail(text)}
                underlineColorAndroid='transparent'
               />       
     
         <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={submitForget.bind(this)}>
              <Text style={styles.buttonTextStyle}>Get Code</Text>
            </TouchableOpacity>
        </View>
}
      
      
    </View>
  );
};

const styles = StyleSheet.create({
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

});
export default ForgetPassword;