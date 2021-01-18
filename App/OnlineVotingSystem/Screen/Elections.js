/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState,useEffect } from 'react';
import {COLORS} from '../asset/colors'
import Modal from 'react-native-modal';


//Import all required component
import { View, Text,FlatList,TouchableOpacity,StyleSheet,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SwipeablePanel } from 'rn-swipeable-panel';
import Ballot from './Ballot';
import { baseUrl } from '../asset/urls';
import AsyncStorage from '@react-native-community/async-storage';




const ElectionsScreen = ({navigation}) => {

  useEffect(() => {
    // Update the document title using the browser API
   
    setOrganizationList()
  },[openPanel]);

const setOrganizationList = async()=>{

  let organizationID = await AsyncStorage.getItem('user_organization_id')
     // console.log("id = "+organizationID)
  fetch(''+baseUrl.base+'organization/'+organizationID+'/1')
    .then((response) => response.json())
    .then((json) => {
      // return json.movies;
      console.log(json)
      setOrganizationData(json.organization)
    })
    .catch((error) => {
      console.error(error);
    });


}


  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    noBar:true,
    showCloseButton:false,
    onlyLarge:true,
    closeOnTouchOutside:true,
    style:{height:'80%'},
    
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
 
  const openPanel = () => {
    setIsPanelActive(true);
  };
 
  const closePanel = () => {
    setIsPanelActive(false);
  };

  
const openBallot = ()=>{
  setModalVisible(false);
  navigation.navigate('Ballot',{
    passed_id : organizationId
  });
  // setIsPanelActive(true);
}



const displayBallot = () =>{
  var ballot = <View>
    <Text style={{fontSize:28,alignSelf:"center",color:COLORS.PrimaryOne,marginTop:12}}>Ballot</Text>
    <Ballot></Ballot>
  </View>
  return ballot
}


const [modalVisible, setModalVisible] = useState(false);
let [organizationData, setOrganizationData] = useState([]);

let [organizationId, setOrganizationId] = useState("");
   


       
const electionClicked =(id)=>{
  console.log(id)
      setOrganizationId(id)
     
     setModalVisible(!modalVisible);
}

const viewCandidatesClicked =()=>{
  setModalVisible(!modalVisible);
  navigation.navigate('Departments',{
passed_id : organizationId
  });
  
}

const viewResultsClicked =()=>{
  setModalVisible(!modalVisible);
  navigation.navigate('Posts',{
    passed_id : organizationId});
  
}

  return (
    <View style={{height:'100%'}} >
       <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38,flexDirection:"row",alignItems:"center"}}>
       <TouchableOpacity  onPress={navigation.navigate.bind(this,'Home')}>
       <Image source={require('../asset/iconBack.png')} style={{height:12, width: 18,tintColor:COLORS.backgroundColor,marginLeft:22}}/>
       </TouchableOpacity>
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         Organizations
       </Text>
      </View>


     <ScrollView style={{height:'100%'}}>
     <View style={{flexDirection:"row",justifyContent:"space-evenly",flexWrap:'wrap',alignSelf:"center",marginTop:8}}>
{
  organizationData.map((item, key) => (
    <TouchableOpacity style ={styles.GridViewBlockStyle}
    onPress={electionClicked.bind(this,item._id)}>
               <Text style={styles.GridViewInsideTextItemStyle}> {item.organization_name} </Text> 
               <Text>View Details</Text>
    </TouchableOpacity>
  ))
}
</View>
     </ScrollView>




           <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            presentationStyle={"overFullScreen"} >
       
          <View style={{elevation:10,width:'80%',height:'40%',backgroundColor:'#FFFFFF',borderRadius:22,alignSelf:"center"}} >
            
            <View style={{width:'100%',padding:8,backgroundColor:COLORS.PrimaryOne,opacity:1,borderBottomRightRadius:18}}>
             <Text style={{fontSize:24,alignSelf:"center",color:'#FFFFFF'}}>Details</Text>
            </View>
            
            <TouchableOpacity style={{padding:8,width:'80%',borderColor:COLORS.PrimaryOne,borderRadius:18,alignSelf:"center",marginTop:8,elevation:2}}
            onPress={viewCandidatesClicked.bind(this,)}
            >
               <Text style={{color:COLORS.PrimaryOne,fontSize:20,alignSelf:"center"}}>View Candidates</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:8,width:'80%',borderColor:COLORS.PrimaryOne,borderRadius:18,alignSelf:"center",marginTop:4,elevation:2}}
            onPress={openBallot.bind(this)}
            >
               <Text style={{color:COLORS.PrimaryOne,fontSize:20,alignSelf:"center"}}>Submit Vote</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:8,width:'80%',borderColor:COLORS.PrimaryOne,borderRadius:18,alignSelf:"center",marginTop:4,elevation:2}}
            onPress={viewResultsClicked.bind(this,)}
            >
               <Text style={{color:COLORS.PrimaryOne,fontSize:20,alignSelf:"center"}}>View Results</Text>
            </TouchableOpacity>

            

            <TouchableOpacity style={{backgroundColor: COLORS.PrimaryOne,padding:4,width:'50%',alignSelf:"center",borderTopLeftRadius:4,borderBottomLeftRadius:4,borderTopRightRadius:12,borderBottomRightRadius:12,justifyContent:"center" ,marginTop:12}}
              onPress={() => { setModalVisible(!modalVisible); }} >
              <Text style={{color:'#FFFFFF',fontSize:16,alignSelf:"center"}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        
      </Modal>


      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
       {displayBallot()}
      </SwipeablePanel>

    </View>
  );
};


const styles = StyleSheet.create({

  title: {

    fontSize: 20,
    color: COLORS.PrimaryOne,
    alignSelf:"center",
    fontWeight: "bold",
    alignSelf:"center",
    width:'80%'
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
export default ElectionsScreen;