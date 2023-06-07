import React from 'react'
import { View,StyleSheet, Pressable } from 'react-native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import { playbackService } from '../../musicPlayerServices'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ControlCenter=()=>{

//usePlaybackState is a hook that keeps a track that all states that happening
  const playBackState=usePlaybackState()

  //Next Button
  const skipToNext=async()=>{
    await TrackPlayer.skipToNext()
  }

  //Previous Button
  const skipToPrevious=async()=>{
    await TrackPlayer.skipToPrevious()
  }

  //playback is a 'State' by trackplayer suggets what is happening to music currently
  const togglePlayback=async (playback:State)=>{
    const currentTrack=await TrackPlayer.getCurrentTrack()
    
    if(currentTrack!=null){
      if(playback===State.Paused||playback===State.Ready){
        //track player should perform play
        await TrackPlayer.play()
      }else{
        await TrackPlayer.pause()
      }
    }
  }
  return (
   <View style={styles.container}>
    <Pressable onPress={skipToPrevious}>
      <Icon style={styles.icon} name="skip-previous" size={40}/>
    </Pressable>

    <Pressable onPress={()=>{togglePlayback(playBackState)}}>
      <Icon 
      style={styles.icon} 
      //if state is playing then providing pause icon otherwise provide play arrow icon
      name={playBackState===State.Playing?"pause":"play-arrow"}
      size={75}/>
    </Pressable>

    <Pressable onPress={skipToNext}>
      <Icon style={styles.icon} name="skip-next" size={40}/>
    </Pressable>
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControlCenter
