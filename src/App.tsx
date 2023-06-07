import React,{useState,useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { setupPlayer,addTrack } from '../musicPlayerServices';
import MusicPlayer from './screens/MusicPlayer';

function App(): JSX.Element {

const [isplayerReady,setIsPlayerReady]=useState(false)

async function setup(){
  let isSetup=await setupPlayer()

  if(isSetup){
    await addTrack()
  }

  setIsPlayerReady(isSetup)
}

useEffect(() => {
 setup()
}, [])

//If player is not ready
if(!isplayerReady){
  return(
    <SafeAreaView>
      {/* like a buffering or loading circle */}
      <ActivityIndicator /> 
    </SafeAreaView>
  )
}

//if player is ready it loads this return statement
  return (
   <View style={styles.container}>
    <StatusBar barStyle={'light-content'}/>
    <MusicPlayer/>
   </View>
  );
}

const styles = StyleSheet.create({
 container:{
  flex:1
 }
});

export default App;
