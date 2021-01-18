/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState,useEffect } from 'react';
import {COLORS} from '../asset/colors'
import { baseUrl } from '../asset/urls';



//Import all required component
import { View, Text,FlatList,TouchableOpacity,StyleSheet,Image,ScrollView } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'


const results = ({navigation}) => {

  useEffect(() => {
    // Update the document title using the browser API
   let p_id = navigation.state.params.passed_post
   let o_id = navigation.state.params.passed_organization
   console.log("passed_post : "+p_id+" passed organization"+o_id)
   getResults(o_id,p_id)
  
  },[modalVisible]);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);

    const [resultsList, setResultsList] = useState([ 
    
]);


const getResults=(organ,post)=>{
  fetch(''+baseUrl.base+'candidate/post/'+organ+'/'+post+'/1')
  .then((response) => response.json())
  .then((json) => {
    // return json.movies;
    console.log(json.message)
    if(json.message=="ok"){
      setTotalUsers(json.TotalUser)
      setResultsList(json.candidate)
    }
    
     
  })
  .catch((error) => {
    console.error(error);
  });
}
  
const convertPercent =(vote)=>{
  if(vote == 0){
    return 0
  }
  console.log(vote+" "+totalUsers)
  let perc = (vote/totalUsers)*100
  perc = Math.round(perc)
 
  return perc
}

  return (
    <View style={{height:'100%'}}>
       <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38,flexDirection:"row",alignItems:"center"}}>
       <TouchableOpacity  onPress={navigation.navigate.bind(this,'Posts')}>
       <Image source={require('../asset/iconBack.png')} style={{height:12, width: 18,tintColor:COLORS.backgroundColor,marginLeft:22}}/>
       </TouchableOpacity>       
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         View Results
       </Text>
      </View>

      <ScrollView style={{height:'100%'}}>
    {
           resultsList.map((item, key) => (
          <View style={styles.itemBox} >
           <View style={{height:40,width:40,borderRadius:40/2,borderColor:COLORS.PrimaryOne,borderWidth:2,margin:8,elevation:5}}>
           <Image source = {{uri:baseUrl.base+item.Symbol}}
               style={{ width: '100%',height: '100%',alignSelf:"center",borderRadius:42/2}}/>
           </View>
          
                <View style={{marginLeft:4}}>
                <Text style={styles.title} >{item.Name}</Text>
                <TouchableOpacity>
                <Text>{item.email}</Text>
                </TouchableOpacity>
                </View>
                
                <View style={{margin:4}}>
                <ProgressCircle
                    percent={convertPercent(item.votes)}
                    radius={30}
                    borderWidth={4}
                    color={COLORS.PrimaryOne}
                    bgColor="#fff"
                    outerCircleStyle={20}
                    >

                  <Text style={{ fontSize: 14 }}>{convertPercent(item.votes)}%</Text>
                  <Text style={{ fontSize: 12 }}>Votes</Text>
                  </ProgressCircle> 
                </View>
               
                
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
   margin:8,
   alignItems:"center",
   justifyContent:"space-between"
  },

});
export default results;