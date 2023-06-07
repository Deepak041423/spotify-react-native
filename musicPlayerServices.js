import TrackPlayer, { Event, RepeatMode } from "react-native-track-player"
import {playListData} from './src/constants' 

export async function setupPlayer(){
    let isSetup=false
    try {
        await TrackPlayer.getCurrentTrack()
        isSetup=true
    } catch (error) {
        //for player when app is getting started
        await TrackPlayer.setupPlayer()
        isSetup=true
    }
    finally{
        return isSetup
    }
}



export async function addTrack(){
    await TrackPlayer.add(playListData)
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)//plays entire playlist on repeat(queue), we can also use off
    
}


//This function provides us to play,pause every other stuff
export async function playbackService(){
    //addEventListener takes two parameters 1.events 2.callbackfunction
    TrackPlayer.addEventListener(Event.RemotePause,()=>{
        TrackPlayer.pause()
    })

    TrackPlayer.addEventListener(Event.RemotePlay,()=>{
        TrackPlayer.play()
    })

    TrackPlayer.addEventListener(Event.RemoteNext,()=>{
        TrackPlayer.skipToNext()
    })

    TrackPlayer.addEventListener(Event.RemotePrevious,()=>{
        TrackPlayer.skipToPrevious()
    })


}