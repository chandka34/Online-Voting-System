//This is an example code for Bottom Navigation//
//Icons Used in this example is from local directory//
import React from 'react';
import { Button, Image } from 'react-native';
import {COLORS} from './asset/colors';
//Import React Navigation
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from '../OnlineVotingSystem/Screen/SplashScreen';
import HomeScreen from './Screen/HomeScreen';
import LoginScreen from './Screen/LoginScreen';
import ForgetScreen from './Screen/ForgetPassword'
import RegisterScreen from './Screen/RegisterScreen';
import EventScreen from './Screen/EventScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ElectionsScreen from './Screen/Elections';
import DepartmentScreen from './Screen/Departments';
import CandidatesScreen from './Screen/Candidates';
import results from './Screen/Results';
import ComplaintsScreen from './Screen/Complaints'
import SettingsScreen from './Screen/SettingsScreen';
import Ballot from './Screen/Ballot';
import PostScreen from './Screen/PostScreen';
import VideoPlay from './Screen/video';

console.disableYellowBox = true;


const HomeStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Home: { screen: HomeScreen , navigationOptions:()=>{},
  },

  Event: { screen: EventScreen , navigationOptions:({navigation})=>{  }, 
  },

  videoScreen: { screen: VideoPlay , navigationOptions:({navigation})=>{  }, 
},

  Setting: { screen: SettingsScreen , navigationOptions:({navigation})=>{  }, 
  },

  Complaint: { screen: ComplaintsScreen , navigationOptions:({navigation})=>{  }, 
  },

  Elections: { screen: ElectionsScreen , navigationOptions:({navigation})=>{  }, 
  },

  Departments: { screen: DepartmentScreen , navigationOptions:({navigation})=>{  }, 
},

Candidates: { screen: CandidatesScreen , navigationOptions:({navigation})=>{  }, 
},
Posts: { screen: PostScreen , navigationOptions:({navigation})=>{  }, 
},
Results: { screen: results , navigationOptions:({navigation})=>{  }, 
},

Ballot: { screen: Ballot , navigationOptions:({navigation})=>{  }, 
},
     
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerShown:false,
      title:'Online Voting System'
      
    },
  }
);


const AuthStack = createStackNavigator(
  {
    //Defination of Navigaton from login screen
    Login: { screen: LoginScreen , navigationOptions:()=>{
      return {
        tabBarOptions:{
          tabBarVisible:false,
          headerShown:false,
        },
       
      };
    }},
    Signup: { screen: RegisterScreen, navigationOptions:()=>{
    
    return {
      tabBarVisible:false,
      headerShown: false,
    };
    
    } },
    Forget: { screen: ForgetScreen, navigationOptions:()=>{
    
      return {
        tabBarVisible:false,
        headerShown: false,
      };
      
      } }
      
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerShown:false,
      tabBarVisible:false
    },
  }
);



// const ProfileStack = createStackNavigator(
//   {
//     //Defination of Navigaton from home screen
//     Profile: { screen: ProfileScreen },
    
//   },
//   {
//     defaultNavigationOptions: {
//       //Header customization of the perticular Screen
//       headerShown:false,
//       tabBarVisible:false
//       //Header title
//     },
//   }
// );






// const NotificationStack = createStackNavigator(
//   {
//     //Defination of Navigaton from home screen
//     Notifications: { screen: NotificationScreen },
    
//   },
//   {
//     defaultNavigationOptions: {
//       //Header customization of the perticular Screen
//       headerStyle: {
//         backgroundColor: '#ffffff',
//       },
//       headerTintColor: COLORS.PrimaryBlue,
//       title: '',
//       headerLeft: () => (
        
//          <Image source={require('../Tuitify/asset/logo.png')} style={{width: 76, resizeMode: 'contain',margin:22}}/>
          
//       ),
//       headerRight: () => (
        
//         <Image source={require('../Tuitify/asset/iconSearch.png')} style={{height: 20, width: 20, resizeMode: 'contain',margin:22}}/>
         
//      ),
//       //Header title
//     },
//   }
// );







const App = createSwitchNavigator(
  {
    Splash:{screen:SplashScreen},
   
    Auth:{screen:AuthStack},
   
    Home:{screen:HomeStack},
   // Profile:{screen:ProfileStack}
   
  },
  {
    initialRouteName:'Splash',
  }
);




export default createAppContainer(App);