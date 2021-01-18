import React, { useState,useEffect } from 'react';
import { View, Text, Image,TouchableOpacity,ScrollView,StyleSheet } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from "accordion-collapse-react-native";
import { COLORS } from '../asset/colors';
import { baseUrl } from '../asset/urls';
import AsyncStorage from '@react-native-community/async-storage';





export default function Ballot({navigation}) {
const [selectedName, setSelectedName] = useState("Select Name");
const [selectedNameID, setSelectedNameID] = useState("");
const [selectedPost, setSelectedPost] = useState("Select Post");
const [selectedPostID, setSelectedPostID] = useState("");
const [organizationID, setOrganizationID] = useState("");

useEffect(() => {
  // Update the document title using the browser API
 let id = navigation.state.params.passed_id
 console.log("passed id : "+id)
 setOrganizationID(id)
 getPostData(id)
},[]);

const getPostData =(id)=>{
  fetch(''+baseUrl.base+'posts/'+id+'/1')
  .then((response) => response.json())
  .then((json) => {
    // return json.movies;
    console.log(json)
     setPostData(json)
  })
  .catch((error) => {
    console.error(error);
  });
}

const setSelectedPostData=(name,id)=>{
  setSelectedName("Select Name")
  setSelectedNameID("")
  setSelectedPost(name)
  setSelectedPostID(id)
  getNameData(id)
}

const setSelectedNameData=(name,id)=>{
 
  setSelectedName(name)
  setSelectedNameID(id)
 
}


const getNameData=(id)=>{

  fetch(''+baseUrl.base+'candidate/post/'+organizationID+'/'+id+'/1')
  .then((response) => response.json())
  .then((json) => {
    // return json.movies;
    console.log("name data ",json)
    if(json.message =="ok"){
      setNameData(json.candidate)
    }
    
  })
  .catch((error) => {
    console.error(error);
  });
}

 const [nameData, setNameData] = useState([]);

 const [postData, setPostData] = useState([]);
 
 
 const submitVote = async()=>{
  let user_id = await AsyncStorage.getItem('user_id')
   console.log(user_id)
  if(selectedPostID =="" || selectedNameID ==""){
    alert("Please select details!")
  }
  else{


    fetch(''+baseUrl.base+'candidate/vote/'+user_id+'/1', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: selectedNameID
      })
    }).then(response => response.json())
    .then(responseJson => {
     
     console.log(responseJson);
     alert(responseJson.message)
      // If server response message same as Data Matched
      
    }).catch(error => {
      //Hide Loader
     
      console.log(error);
    });

  }

 }

 
  return (
    <View>
         <View style={{backgroundColor:COLORS.PrimaryOne,width:'100%',elevation:5,borderBottomRightRadius:38,flexDirection:"row",alignItems:"center"}}>
      
       <Text style={{margin:20,fontSize:22,color:'#FFFFFF',alignSelf:"center"}}>
         Ballot
       </Text>
      </View>

<View style={{marginTop:10}}>
        





            <Collapse
            elevation={1}
            style={{
              borderRadius: 14,
              marginBottom: 20,
              alignSelf: "center",
              width: "90%",
            }}
          >
            <CollapseHeader style={{ borderRadius: 13}}>
              <View
                style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                   borderWidth:2,
                    borderRadius:13,
                    borderColor:COLORS.PrimaryOne
                  }}
              >
                <Text style={{fontSize: 17,margin:12,color:COLORS.PrimaryOne }}>
                <Text>{selectedPost}</Text>
                </Text>
                <View style={{ alignSelf: "center" }}>
                  <Image
                    style={{ width: 15, height: 15,margin:12,tintColor:COLORS.PrimaryOne }}
                    source={require("../asset/expand.png")}
                  />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody
              style={{ borderRadius: 13, marginTop: 10, width: "100%" }}
            >
                 <ScrollView style={{maxHeight:80}}>
                {
                   postData.map((item, key) => (
                    <View style={{padding:8}} >
                     
                          <TouchableOpacity onPress={setSelectedPostData.bind(this,item.name,item._id)}>
                          <Text>{item.name}</Text>
                          </TouchableOpacity>
                         
                          </View>
                    ))      
                }
                </ScrollView>
            
            </CollapseBody>
            </Collapse>

            {/* select name list */}
    <Collapse
            elevation={1}
            style={{
              borderRadius: 14,
              marginBottom: 20,
              alignSelf: "center",
              width: "90%",
            }}
          >
            <CollapseHeader style={{ borderRadius: 13}}>
              <View
                 style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                   borderWidth:2,
                    borderRadius:13,
                    borderColor:COLORS.PrimaryOne
                  }}
              >
                <Text style={{fontSize: 17,margin:12,color:COLORS.PrimaryOne }}>
                <Text>{selectedName}</Text>
                </Text>
                <View style={{ alignSelf: "center" }}>
                  <Image
                   style={{ width: 15, height: 15,margin:12,tintColor:COLORS.PrimaryOne }}
                    source={require("../asset/expand.png")}
                  />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody
              style={{ borderRadius: 13, marginTop: 10, width: "100%" }}
            >
                <ScrollView style={{maxHeight:80}}>
                {
                   nameData.map((item, key) => (
                    <View style={{padding:8}} >
                     
                          <TouchableOpacity onPress={setSelectedNameData.bind(this,item.Name,item._id)}>
                          <Text>{item.Name}</Text>
                          </TouchableOpacity>
                         
                          </View>
                    ))      
                }
                </ScrollView>
                
            
            </CollapseBody>
            </Collapse>




            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={submitVote.bind(this)}
             >
              <Text style={styles.buttonTextStyle}>Submit Vote</Text>
            </TouchableOpacity>

            </View>
    </View>
  );
}



const styles = StyleSheet.create({
   
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
      marginTop: 10,
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
