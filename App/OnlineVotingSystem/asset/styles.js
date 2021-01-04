import {StyleSheet} from 'react-native'
import {COLORS} from '../asset/colors';

export default StyleSheet.create({

    notificationitemBox: {
        width: '90%',
        marginTop: 14,
        maxWidth: '100%',
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
        flex:1,
        justifyContent:"space-around"
    
      },
      notificationContent: {
        width: '60%',
        height:'80%',
        margin:8, 
        
    
      },
      notificationName: {
    
        fontSize: 18,
        fontWeight: "bold",
       
      },

      activeNotificationName: {
    
        fontSize: 18,
        fontWeight: "bold",
        color:"#ffffff"
       
      },
    
      userImage:{
        width: 54, 
        height: 54, 
        borderRadius: 50/ 2,
        margin:10,
        borderColor:'#FFFFFF',
        borderWidth:2,
        elevation:5,
        shadowOpacity:0.3,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      },
        activeNotificationitemBox: {
          width: '90%',
          marginTop: 14,
          maxWidth: '100%',
          borderRadius: 16,
          shadowOpacity:0.3,
          elevation:5,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          
          backgroundColor:COLORS.PrimaryBlue,
          alignSelf:"center",
          flexDirection:"row",
          flex:1,
          justifyContent:"space-around"
      
        },
       
        
       
      
        activeUserImage:{
          width: 54, 
          height: 54, 
          borderRadius: 50/ 2,
          margin:10,
          borderColor:COLORS.PrimaryBlue,
          borderWidth:2,
          shadowOpacity:0.3,
          elevation:5,
          shadowOffset: {
            width: 0,
            height: 4,
          },
       
      }


});