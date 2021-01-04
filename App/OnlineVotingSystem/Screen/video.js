// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/

// import React in our code
import React, {useState, useRef} from 'react';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';



const App = () => {
  const videoPlayer = useRef(null);
  const sintel = require('../asset/example.mp4');



  return (
    <View style={{flex: 1}}>
      <Video
     
      ref={videoPlayer}
     resizeMode={'cover'}
     controls={true}
   
     source={sintel}
      // source={{
      //   uri:
      //     'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4'
      // }}
      style={styles.mediaPlayer}
      volume={0}
    />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaPlayer: {
    position: 'absolute',
   
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  
});