import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  Platform
} from 'react-native';
import styles from './style';
import constants from '../../constants';
import BlurRoundSmallButton from '../BlurRoundSmallButton';
import BlurRectangleButton from '../BlurRectangleButton';
import MusicControl  from 'react-native-music-control';
import SystemSetting from 'react-native-system-setting';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import * as AppActionTypes from '../../actions/app-actions-types';
import CountDown from '../react-native-countdown-component';
import { stringToBytes } from "convert-string";
import Sound from 'react-native-sound';
import BleManager from 'react-native-ble-manager';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundTimer from 'react-native-background-timer';
// const hasNotch = DeviceInfo.hasNotch();

type props = {
  data: Object,
  openSetTimeModal: Object,
  counterTime: Number,
  startTimerOrStop: Object,
  onPressConnectionOrSetting: Object,
  musicStop: Boolean,
  startCounter: Boolean,
  showTime: Number,
  deviceConnected: Boolean,
  blurScreen: Boolean,
  activeSlide: Number,
  completeData: Array,
  clickableOrNot:Boolean
};
var sound1;
var sound2;
var sound3;
const ModuleScreen = ({
  data,
  openSetTimeModal,
  counterTime,
  startTimerOrStop,
  onPressConnectionOrSetting,
  musicStop,
  showTime,
  startCounter,
  deviceConnected,
  blurScreen,
  activeSlide,
  completeData,
  toggleInitialModal,
  deviceId,
  stopDiffusion,
  saveSystemSound,
  systemSound,
  saveModuleSound,
  moduleSound,
  stopWasPressed,
  displayScreen,
  displaySetting,
  removeSound,
  modalOpen,
  timerCheck,
  clickableOrNot
}: props) => {

  // const [blurScreen, setBlurScreen] = useState(false);
  const [musicPlay, setMusicPlay] = useState(false);
  const [timerValue, setTimerValue] = useState(10);
  const [display, setDisplay] = useState(true);
  const [count,setCount] = useState(false)
  const [timeleft,setTimeLeft] = useState(null)
  const fadeAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
   
    if (startCounter) {
      displayScreen(display)
      if (timerValue > 0) {
        let timer = setInterval(tick, 1000);
        
       
        return () => clearInterval(timer)
      } else if (timerValue === 0) {
        
        Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration: 500,
            useNativeDriver:true
          }
        ).start(() => setDisplay(false));
      }
   }

  }, [timerValue, startCounter])



  useEffect(() => {
    MusicControl.on('play', () => {
      SystemSetting.setVolume(systemSound);
      saveModuleSound(true);
      console.warn("Use effect release 1")
      sound1.setNumberOfLoops(10).play(() => {
          sound1.release();
        });
        MusicControl.updatePlayback({
          state: MusicControl.STATE_PLAYING,
          elapsedTime: 0
        })
    })
    MusicControl.on('pause', () => {
      saveModuleSound(false);
      sound1.pause()
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
        elapsedTime: 0
      })
      // SystemSetting.setVolume(volume);
    })
    SystemSetting.getVolume().then((volume) => {
      saveSystemSound(volume)
    });
    sound1 = new Sound(completeData[activeSlide].music, (error, sound) => {
      // console.warn("IN SOUND 1")
      setCount(true)
      if (error) {
        return;
      }
    });
    sound3=sound1
    sound2 = new Sound(completeData[activeSlide+1].music, (error, sound) => {
      // console.warn("IN SOUND 2")
      removeSound(true)
      if (error) {
        // console.warn(error)
        return;
      }
    });
  
  }, []);



  
  useEffect(() => {
    onThemeChange()
  }, [activeSlide, startCounter]);

  useEffect(() => {
    if (stopDiffusion)
      changeDiffusion('stop')
  }, [stopDiffusion]);

  if (startCounter === true) {
    if (musicStop === true && blurScreen === true) {
      sound1.stop(() => {
        setMusicPlay(false);
      });
      // MusicControl.resetNowPlaying()
      // startTimerOrStop();
      // changeDiffusion('stop')
  }
}

  const tick = () => {
    setTimerValue(timerValue - 1)
  }

  const onThemeChange =  () => {
   
    if (startCounter == true || musicStop == true ) {
      sound1.stop();
    
    
       if(activeSlide==0){
      sound1=sound3
      if(moduleSound == true){
        sound1.setNumberOfLoops(10).play(() => {
          sound1.release();
        });
      }
      else {
        sound1.pause();
       
      }
    }
    if(activeSlide ==1){
      sound1= sound2
        if(moduleSound == true){
          // console.warn(" actiuve 2")
          sound1.setNumberOfLoops(10).play(() => {

            sound1.release();
          });
        }
        else {
          sound1.pause();    
        }
   }
  }
}
   
 
  

  const changeDiffusion = (status) => {
    BleManager.isPeripheralConnected(deviceId, [
      '1D85DF88-8B57-4C49-89E2-FA80E020C04E',
    ]).then((isConnected) => {
      if (isConnected) {
        updateDiffuser(deviceId, status)
      }
    });
  }




  const updateDiffuser = (connectedDevice, status) => {
    BleManager.retrieveServices(connectedDevice).then(
    async  (peripheralInfo) => {
        var service = '1d85df88-8b57-4c49-89e2-fa80e020c04e';
        let Light = await AsyncStorage.getItem('Light');
        var characteristicUUID =
          'ee5f11f1-bd3a-4a3c-81ff-10b8d475f302';
          
        let stringData 
        if(Light !== null && Light !== undefined){
          if (status === 'stop'){
           
            if(Light == "true"){
              stringData = "0 1 1" 
            }
            else {
              stringData = "0 0 1"
            }
            
          }
           else  {
           
            if(Light == "true"){
              stringData = "1 1 1" 
            }
            else {
              stringData = "1 0 1"
            }
           }
        }
        else {
          if(status == "stop") {
            stringData = "0 1 1"
          }
          else {
            stringData = "1 1 1"
          }
        }
        
        let data = stringToBytes(stringData);

        setTimeout(() => {
          BleManager.write(
            connectedDevice,
            service,
            characteristicUUID,
            data,
          ).then(() => {
          });
        }, 500);
      },
    );
  }

  const setBlurEffect = () => {
    if(clickableOrNot == true ){
      MusicControl.enableControl('play', true)
      MusicControl.enableControl('pause', true)
      // MusicControl.enableBackgroundMode(true);
      // console.warn("Use effect blurr")
      sound1.setNumberOfLoops(10).play(() => {
        sound1.release();
      });
      MusicControl.setNowPlaying({
        title: 'Aromeo Diffuser',
        duration: counterTime, // (Seconds)
        // description: '', // Android Only
        // color: 0xFFFFFF, // Android Only - Notification Color
        // colorized: true, // Android 8+ Only - Notification Color extracted from the artwork. Set to false to use the color property instead
        // date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
        // rating: 84, // Android Only (Boolean or Number depending on the type)
        // notificationIcon: 'my_custom_icon' // Android Only (String), Android Drawable resource name for a custom notification icon
      })
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
        elapsedTime: 0
      })
      setMusicPlay(false);
      // SystemSetting.setVolume(systemSound)
      startTimerOrStop();
      changeDiffusion('start')
    
    }
   
  };

  const hideBlurEffect = () => {
    displayScreen(display)
    sound1.stop(() => {
      setMusicPlay(false);
    });
    Platform.OS === "ios"?MusicControl.stopControl():null
    MusicControl.resetNowPlaying()
    startTimerOrStop();
    changeDiffusion('stop')
  };



  const finishCycle = () => {
    timerCheck(0)
    displayScreen(display)
    sound1.stop(() => {
      setMusicPlay(false);
    });
    
    Platform.OS === "ios"?MusicControl.stopControl():null
    MusicControl.resetNowPlaying()
    startTimerOrStop();
    changeDiffusion('stop')
    setDisplay(true)
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }
    ).start();
  };



  const musicPlayPause = () => {
  
    if (moduleSound === false ) {
      // SystemSetting.setVolume(systemSound);
      saveModuleSound(true);
      if(startCounter== true){
        // console.warn("Counter relea")
        sound1.setNumberOfLoops(10).play(() => {
          sound1.release();
        });
        MusicControl.updatePlayback({
          state: MusicControl.STATE_PLAYING,
          elapsedTime: 0
        })
      }
      
    }
    if (moduleSound === true ) {
      // SystemSetting.setVolume(0);
      saveModuleSound(false);
     if(startCounter== true){
      sound1.pause()
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
        elapsedTime: 0
      })
     }
      
    
    }
  };

  const lightSettingsClicked = (type) => {
    // onPressConnectionOrSetting(type)
    Auth.currentAuthenticatedUser()
      .then(user => {
        onPressConnectionOrSetting(type)
      })
      .catch(err => {
        sound1.stop(() => {
          setMusicPlay(false);
        });
        Platform.OS === "ios"?MusicControl.stopControl():null
        MusicControl.resetNowPlaying()
        toggleInitialModal() //logout
      });
  }

  const screenClicked = () => {
    if (startCounter) {
      setDisplay(true)
      // displayScreen(true)
      setTimerValue(10)
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      ).start();
    }
  }


  let result = displayScreen()



useEffect(()=>{

  if(startCounter){
    if(displayScreen() == false){
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver:true
        }
      ).start(() => setDisplay(false));
      displayScreen(display)
    }
  }
  
},[result])



useEffect(()=>{
  if(modalOpen == true){
    Platform.OS === "ios"?MusicControl.stopControl():null
    MusicControl.resetNowPlaying() 
  }
},[modalOpen])



  return (
    <View style={display ? styles.container : styles.touchableView} >
      <Animated.View style={[styles.Flex1, { opacity: fadeAnim }]}>
        <View style={styles.centerTimmerWrapper}>
          {
            startCounter === false?
              <TouchableOpacity onPress={openSetTimeModal} activeOpacity={0.8}>
                <ImageBackground
                  style={styles.centerCircle}
                  source={constants.Images.ModuleScreenCircle}>
                  <View style={styles.FlexDirectionRow}>
                    <Image source={constants.Images.TimerIcon} />
                    <Text style={styles.TimeText}>{showTime}</Text>
                    <Text style={styles.minText}>min</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              :
              <ImageBackground
                style={styles.centerCircle}
                source={constants.Images.ModuleScreenCircle}>
                <View style={styles.FlexDirectionRow}>
                  <CountDown
                    until={counterTime}
                    size={15}
                    onFinish={finishCycle}
                    onChange={(val) => {
                  
                      if (val === 1){
                        stopWasPressed(true)
                      }
                       timerCheck(val)
                    }}
                    digitStyle={{ backgroundColor: 'transparent' }}
                    digitTxtStyle={{ color: '#ffffff', fontSize: 22, fontWeight: '400', fontFamily: 'Montserrat-Medium',
                    // fontSize: '19@ms',
                    // lineHeight: '19@ms',
                  }}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                    separatorStyle={{ color: '#ffffff' }}
                  />
                </View>
              </ImageBackground>
          }

        </View>
        <View style={styles.bottomButtonsWrapper}>
          <View style={styles.smallRoundButtonWrapper}>
            <BlurRoundSmallButton
              icon={
                deviceConnected
                  ? constants.Images.DropWhite
                  : constants.Images.DropGray
              }
              iconName={'Drop'}
              onPressIcon={(iconName) => lightSettingsClicked(0)}
            />
            <BlurRoundSmallButton
              icon={
                deviceConnected
                  ? constants.Images.BulbWhite
                  : constants.Images.BulbGray
              }
              iconName={'Bulb'}
              onPressIcon={(iconName) => lightSettingsClicked(1)}
            />
            <BlurRoundSmallButton
              icon={
                moduleSound ?
                  constants.Images.MusicWhite
                  :
                  constants.Images.muteMusic
              }
              iconName={'Music'}
              onPressIcon={(iconName) => musicPlayPause()}
            />

          </View>
          {}
          <BlurRectangleButton
            title={startCounter === false  ? 'Start' : 'Stop'}
            onPressIcon={startCounter === false?  setBlurEffect : hideBlurEffect} //startTimerOrStop(index)}
          />
         
        </View>
       
      </Animated.View>
      {
        display === false &&
        <TouchableOpacity onPress={screenClicked} style={styles.touchableView} />
      }
    </View>
  );
};

export default connect(
  state => ({
    systemSound: state.app.systemSound,
    moduleSound: state.app.moduleSound
  }),
  { ...AppActionTypes }
)(ModuleScreen);
