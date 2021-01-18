/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState,useEffect } from 'react';
import {COLORS} from '../asset/colors'
import { baseUrl } from '../asset/urls';


//Import all required component
import { View, Text,FlatList,TouchableOpacity,StyleSheet,Image,ScrollView } from 'react-native';

const EventScreen = ({navigation}) => {

  useEffect(() => {
    // Update the document title using the browser API
   
    setEventList()
  },[electionClicked]);

const setEventList =()=>{
  fetch(''+baseUrl.base+'Event'+'/1')
    .then((response) => response.json())
    .then((json) => {
      // return json.movies;
      console.log(json)
     setEventData(json)
    })
    .catch((error) => {
      console.error(error);
    });


}

const checkDate = (ending)=>{
let now = new Date();
let date = new Date(ending);
if(now < date){
return true
}
else{
return false
}
}

const electionClicked =()=>{

}

  let [eventData, setEventData] = useState([]);
  
    
        


  return (
    <View>
       <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38,flexDirection:"row",alignItems:"center"}}>
       <TouchableOpacity  onPress={navigation.navigate.bind(this,'Home')}>
       <Image source={require('../asset/iconBack.png')} style={{height:12, width: 18,tintColor:COLORS.backgroundColor,marginLeft:22}}/>
       </TouchableOpacity>       
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         Events
       </Text>
      </View>

      <ScrollView >
    {
           eventData.map((item, key) => (
             <View>
               {
                      checkDate(item.EndDate) ? 
                      <TouchableOpacity style={styles.itemBox} key={key}
                     // onPress={checkDate.bind(this,item.ending)}
                       
                      >
                       <View style={{height:40,width:40,borderRadius:40/2,borderColor:COLORS.PrimaryOne,borderWidth:2,margin:8}}>
                       <Image source={ require('../asset/iconNotification.png') }
                           style={{ width: 22,height: 22,tintColor:COLORS.PrimaryOne,alignSelf:"center",margin:6}}/>
                       </View>
                      
                            <View>
                            <Text style={styles.title} >{item.name}</Text>
                            <Text>Ending Date : {item.EndDate}</Text>
                            </View>
                       </TouchableOpacity>
                      :
                      <></>
               }
             </View>
         
          ))      
   }
       
                 
    </ScrollView>
 
        
    </View>
  );
};


const styles = StyleSheet.create({

  title: {

    fontSize: 20,
    color: COLORS.PrimaryOne,
    fontWeight: "bold",
    alignSelf:"center",
    marginRight:22,
    marginTop:8
  },

  itemBox: {
    width: '90%',
    
    borderRadius: 16,
    shadowOpacity:0.3,
    elevation:5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
 
    backgroundColor:'#FFFFFF',
    alignSelf:"center",
   flexDirection:"row",
   margin:8

  },

});
export default EventScreen;