/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';


//Import all required component
import { View, Text ,ScrollView,TouchableOpacity ,StyleSheet,FlatList,Image} from 'react-native';
import { COLORS } from '../asset/colors';

const HomeScreen = ({navigation}) => {
global.currentScreenIndex = 'HomeScreen';


 const logout=()=>{
  AsyncStorage.clear();
  navigation.navigate('Auth');
 } 
  
 
  return (
    <View style={{height:'100%',backgroundColor:'#FFFFFF'}}>
      <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38}}>
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         Online Voting System
       </Text>
      </View>


      <View>
      <TouchableOpacity style={styles.itemBox} onPress={navigation.navigate.bind(this,'Event')}>
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <Image source={require('../asset/iconNotification.png')} style={{height:44, width: 30,tintColor:COLORS.PrimaryOne}}/>
        <Text style={styles.title}>Events/Notifictaions</Text>
        <Image source={require('../asset/iconArrow.png')} style={{height:12, width: 18,tintColor:COLORS.PrimaryOne,marginLeft:22,marginTop:16}}/>

        </View>
       
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemBox} onPress={navigation.navigate.bind(this,'Elections')}>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <Image source={require('../asset/elections.png')} style={{height:34, width: 34,tintColor:COLORS.PrimaryOne}}/>
        <Text style={styles.title}>Organizations</Text>
        <Image source={require('../asset/iconArrow.png')} style={{height:12, width: 18,tintColor:COLORS.PrimaryOne,marginLeft:22,marginTop:10}}/>

        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemBox} onPress={navigation.navigate.bind(this,'Complaint')} >
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <Image source={require('../asset/complaints.png')} style={{height:44, width: 30,tintColor:COLORS.PrimaryOne}}/>
        <Text style={styles.title}>Submit Complaints</Text>
        <Image source={require('../asset/iconArrow.png')} style={{height:12, width: 18,tintColor:COLORS.PrimaryOne,marginLeft:22,marginTop:16}}/>

        </View>
      </TouchableOpacity>


      <TouchableOpacity style={styles.itemBox} onPress={navigation.navigate.bind(this,'Setting')} >
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <Image source={require('../asset/settings.png')} style={{height:30, width: 30,tintColor:COLORS.PrimaryOne}}/>
        <Text style={styles.title}>Account Settings</Text>
        <Image source={require('../asset/iconArrow.png')} style={{height:12, width: 18,tintColor:COLORS.PrimaryOne,marginTop:10}}/>

        </View>
      </TouchableOpacity>


      <TouchableOpacity style={styles.itemBox} onPress={navigation.navigate.bind(this,'videoScreen')} >
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <Image source={require('../asset/guide.png')} style={{height:32, width: 30,tintColor:COLORS.PrimaryOne}}/>
        <Text style={styles.title}>Voting Guide</Text>
        <Image source={require('../asset/iconArrow.png')} style={{height:12, width: 18,tintColor:COLORS.PrimaryOne,marginLeft:22,marginTop:10}}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemBox} onPress={logout} >
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <Image source={require('../asset/logout.png')} style={{height:30, width: 30,tintColor:COLORS.PrimaryOne}}/>
        <Text style={styles.title}>Logout</Text>
        <Image source={require('../asset/iconArrow.png')} style={{height:12, width: 18,tintColor:COLORS.PrimaryOne,marginTop:10}}/>

        </View>
      </TouchableOpacity>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({

  title: {

    fontSize: 20,
    color: COLORS.PrimaryOne,

    fontWeight: "bold",
    alignSelf:"center",
   
  },

  itemBox: {
    width: '90%',
    height:70,
    margin: 8,
    borderColor:COLORS.PrimaryOne,
    borderWidth:2,
    maxWidth: '100%',
    borderRadius: 16,
    shadowOpacity:0.3,
    borderBottomRightRadius:42,
    borderTopRightRadius:42,
    elevation:5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
   justifyContent:"center",
    backgroundColor:'#FFFFFF',
    alignSelf:"center"

  },

  
   
 

});
export default HomeScreen;