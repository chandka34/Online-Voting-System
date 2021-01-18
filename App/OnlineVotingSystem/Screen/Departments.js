/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState,useEffect } from 'react';
import {COLORS} from '../asset/colors'
import Modal from 'react-native-modal';
import { baseUrl } from '../asset/urls';


//Import all required component
import { View, Text,FlatList,TouchableOpacity,StyleSheet,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const DepartmentScreen = ({navigation}) => {
const [modalVisible, setModalVisible] = useState(false);
const [organization_id, setOrganziation_id] = useState("");

useEffect(() => {
  // Update the document title using the browser API
 let id = navigation.state.params.passed_id
 console.log("passed id : "+id)
 setOrganziation_id(id)
 getDepartments(id)
},[modalVisible]);


const getDepartments=(id)=>{
  fetch(''+baseUrl.base+'department/'+id+'/1')
  .then((response) => response.json())
  .then((json) => {
    // return json.movies;
    console.log(json)
     setDepartmentList(json)
  })
  .catch((error) => {
    console.error(error);
  });
}
 
const [departmentList, setDepartmentList] = useState([ 
  
]);

       
  return (
    <View style={{height:'100%'}}>
       <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38,flexDirection:"row",alignItems:"center"}}>
       <TouchableOpacity  onPress={navigation.navigate.bind(this,'Elections')}>
       <Image source={require('../asset/iconBack.png')} style={{height:12, width: 18,tintColor:COLORS.backgroundColor,marginLeft:22}}/>
       </TouchableOpacity>
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         View Candidates
       </Text>
      </View>


      
<ScrollView style={{height:'100%'}}>
<View style={{flexDirection:"row",justifyContent:"space-evenly",flexWrap:'wrap',alignSelf:"center",marginTop:8}}>
{
  departmentList.map((item, key) => (
    <TouchableOpacity style={styles.GridViewBlockStyle} onPress={navigation.navigate.bind(this,'Candidates',{
      passed_department: item._id,
      passed_organization:organization_id
    })} >
            <Text style={styles.GridViewInsideTextItemStyle}> {item.department_name} </Text>
            
    </TouchableOpacity>
  ))
}
</View>
</ScrollView>



   


    </View>
  );
};


const styles = StyleSheet.create({

  title: {

    fontSize: 20,
    color: COLORS.PrimaryOne,
    alignSelf:"center",
    fontWeight: "bold",
    alignSelf:"center"
  },

  itemBox: {
    width: '90%',
    height:70,
    margin: 8,
    maxWidth: '100%',
    borderRadius: 16,
    shadowOpacity:0.3,
    elevation:5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
   justifyContent:"center",
    backgroundColor:'#FFFFFF',
    alignSelf:"center"

  },

  GridViewBlockStyle: {
    alignSelf:"center",
    padding:30,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:12,
    marginBottom:10,
    marginRight:10,
    backgroundColor:'#FFFFFF',
   
    elevation:5,
    shadowOpacity:0.3,
    shadowRadius:5,
    shadowOffset:{height:10,width:0}
   
  },
   
  GridViewInsideTextItemStyle: {
   
     color: COLORS.PrimaryOne,
     margin:2,
     fontSize: 16,
     justifyContent: 'center',
     alignSelf:"center"
     
     
   },

});
export default DepartmentScreen;