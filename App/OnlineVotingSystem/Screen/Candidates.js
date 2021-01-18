/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState,useEffect } from 'react';
import {COLORS} from '../asset/colors';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { baseUrl } from '../asset/urls';



//Import all required component
import { View, Text,FlatList,TouchableOpacity,StyleSheet,Image,ScrollView } from 'react-native';

const candidates = ({navigation}) => {


  useEffect(() => {
    // Update the document title using the browser API
   let did = navigation.state.params.passed_department
   let oid = navigation.state.params.passed_organization
   console.log("departemnt id : "+did)
   console.log("organization id : "+oid)

   getCandidateList(oid,did)
   
  },[isPanelActive]);

const getCandidateList=(organ,depart)=>{
  fetch(''+baseUrl.base+'candidate/'+organ+'/'+depart+'/1')
  .then((response) => response.json())
  .then((json) => {
    // return json.movies;
    console.log(json)
    setCandidatesList(json)
    
  })
  .catch((error) => {
    console.error(error);
  });
}

const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton:false,
    onlyLarge:true,
    closeOnTouchOutside:true,
    style:{height:'90%'},
    
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

  
const openProfile = (id)=>{
  console.log(id)
  getDetails(id)
 
}

const getDetails=(id)=>{
  fetch(''+baseUrl.base+'candidate/single/'+id+'/1')
  .then((response) => response.json())
  .then((json) => {
    // return json.movies;
    console.log(json.message)
    if(json.message=="ok"){
      console.log("candidate details ",  json.candidate)
      setDetails(json.candidate)
      setIsPanelActive(true);
    }
    
     
  })
  .catch((error) => {
    console.error(error);
  });
}

    const [candidatesList, setCandidatesList] = useState([ 
   
]);
const [details,setDetails]=useState(
  [
    {
      "Name": "", 
      "Symbol": "", 
      "__v": 0, 
      "_id": "", 
      "department_id": "", 
      "email": "", 
      "organization_id": "", 
      "phone_no": "", 
      "post": {"EndDate": "", "SDate": "", "__v": 0, "_id": "", "name": "", "organization_id": ""}, 
      "votes": 0
    }
  ]
);
  

const displayProfile =()=>{
  var profile = 
  <View style={{width:'95%',alignSelf:"center"}}>
  <Text style={{fontSize:20,alignSelf:"center",color:COLORS.PrimaryOne,marginTop:12}}>Candidate Details</Text>

   <View style={{borderWidth:2,borderRadius:12,borderColor:COLORS.PrimaryOne,marginTop:16,padding:16}}>
   <View style={{flexDirection:"row"}}>
   <View style={{height:80,width:80,borderRadius:80/2,borderColor:COLORS.PrimaryOne,borderWidth:2,elevation:5,marginTop:-50}}>
           <Image source = {{uri:baseUrl.base+details[0].Symbol}}
               style={{ width: 76,height: 76,alignSelf:"center",borderRadius:76/2}}/>
           </View>
           <Text style={{marginLeft:12,fontSize:26,color:COLORS.PrimaryOne}}>{details[0].Name}</Text>
   </View>


   <View style={{flexDirection:"row",margin:6}}>
  <Text style={{fontSize:20}}>Post : </Text>
<Text style={{borderBottomWidth:1,fontSize:22}}>{details[0].post.name}</Text>
</View>

 



<Text style={{fontSize:20,alignSelf:"center",color:COLORS.PrimaryOne,marginTop:12}}>Personal Info</Text>

<View style={{alignSelf:"center"}}> 
<View style={{flexDirection:"row",margin:6}}>
  <Text style={{fontSize:20}}>Email: </Text>
<Text style={{borderBottomWidth:1,fontSize:22}}>{details[0].email}</Text>
</View>

<View style={{flexDirection:"row",margin:6}}>
  <Text style={{fontSize:20}}>Contact: </Text>
<Text style={{borderBottomWidth:1,fontSize:22}}>{details[0].phone_no}</Text>
</View>





</View>
  

   </View>

  </View>
  return profile
}

  return (
    <View>
       <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38,flexDirection:"row",alignItems:"center"}}>
       <TouchableOpacity  onPress={navigation.navigate.bind(this,'Departments')}>
       <Image source={require('../asset/iconBack.png')} style={{height:12, width: 18,tintColor:COLORS.backgroundColor,marginLeft:22}}/>
       </TouchableOpacity>       
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         View Candidates {navigation.state.params.passed_id}
       </Text>
      </View>

      <ScrollView style={{height:'100%'}} >
    {
           candidatesList.map((item, key) => (
          <View style={styles.itemBox} >
           <View style={{height:40,width:40,borderRadius:40/2,borderColor:COLORS.PrimaryOne,borderWidth:2,margin:8,elevation:5}}>
           <Image source = {{uri:baseUrl.base+item.Symbol}}
               style={{ width: '100%',height: '100%',alignSelf:"center",borderRadius:42/2}}/>
           </View>
          
                <View style={{marginLeft:12}}>
                <Text style={styles.title} >{item.Name}</Text>
                <TouchableOpacity onPress={openProfile.bind(this,item._id)}>
                <Text>View Profile of  {item.Name}</Text>
                </TouchableOpacity>
                </View>
                
           </View>
          ))      
   }
       
                 
    </ScrollView>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
       {displayProfile()}
      </SwipeablePanel>
        
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
   alignItems:"center"
  },

});
export default candidates;