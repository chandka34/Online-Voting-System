/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../asset/urls';



//Import all required component
import { View, Text ,ScrollView,TouchableOpacity ,StyleSheet,FlatList,Image,TextInput} from 'react-native';
import { COLORS } from '../asset/colors';

const Complaints = ({navigation}) => {
    let [data, setData] = useState('');

const submitFeedback =()=>{
  fetch(''+baseUrl.base+'feedback', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      feedback: data
    })
  }).then(response => response.json())
  .then(responseJson => {
   
   console.log(responseJson.message);
    // If server response message same as Data Matched
    if (responseJson.message) {
     alert(responseJson.message)
    } else {
      alert("feedback not submitted")
    }
  }).catch(error => {
    //Hide Loader
   
    console.log(error);
  });
}


 
  return (
    <View style={{height:'100%',backgroundColor:'#FFFFFF'}}>
       <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38,flexDirection:"row",alignItems:"center"}}>
       <TouchableOpacity  onPress={navigation.navigate.bind(this,'Home')}>
       <Image source={require('../asset/iconBack.png')} style={{height:12, width: 18,tintColor:COLORS.backgroundColor,marginLeft:22}}/>
       </TouchableOpacity>
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         Submit Complaint
       </Text>
      </View>


      <View>
      <TextInput
            style={styles.input}
            placeholder={"Input Complaint .."}
            onChangeText={text=>setData(text)}
            multiline={true}
            underlineColorAndroid='transparent'
    />       
      </View>
      <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={submitFeedback.bind(this)}>
              <Text style={styles.buttonTextStyle}>Submit</Text>
            </TouchableOpacity>
      
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
export default Complaints;