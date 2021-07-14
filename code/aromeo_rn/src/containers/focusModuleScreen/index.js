import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  Platform,
  BackHandler,
  AppState,
  TouchableOpacity,
  ImageBackground,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import constants from '../../constants';
import {
  HeaderWithTitle,
  ExitAlert,
  SelectTimer,
  ModuleScreen,
  SettingModal,
  Message,
  Toast,
  InitialModal,
  BlurBackground,
} from '../../components';
import {BASE_URL} from '../../utilities/Connetion';
import styles from './style';
import DeviceInfo from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import BleManager from 'react-native-ble-manager';
import {Auth} from 'aws-amplify';
import {connect} from 'react-redux';
import {BluetoothStatus} from 'react-native-bluetooth-status';
import * as AppActionTypes from '../../actions/app-actions-types';
import {MyStatusBar} from '../../utilities/statusBar';
import MusicControl from 'react-native-music-control';
import BackgroundTimer from 'react-native-background-timer';
import NetInfo from '@react-native-community/netinfo';
import { stringToBytes } from "convert-string";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const SceenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const hasNotch = DeviceInfo.hasNotch();

type Props = {
  navigation: Object,
};

const FocusModuleScreen = (props) => {
  let {route, navigation} = props;
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const [settingModalVisible, setSettingModalVisible] = useState(false);
  const [deviceNoteConnect, setDeviceNoteConnect] = useState(false);
  const [musicTimes, setMusicTimes] = useState('30');
  const [counterTime, setCounterTime] = useState(1800);
  const [activeSlide, setActiveSlide] = useState(0);
  const [musicStop, setMusicStop] = useState(false);
  const [initialModal, setInitialModal] = useState(false);
  const [startCounter, setStartCounter] = useState(false);
  const [blurScreen, setBlurScreen] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [stopPressed, setStopPressed] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [stopDiffusion, setStopDiffusion] = useState(false);
  const [tap, setTap] = useState(true);
  const [clickableOrNot,setClickableOrNot] = useState(false)
  const [returnState, setreturnState] = useState(null);
  let [selectedTab, setTab] = useState(0);
  let [toast, setToast] = useState(false);
  let [goBack, setGoback] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [onceDisplayed, setOnceDisplayed] = useState(false);
  let [timeLeft, setTimeLeft] = useState();

  const timeLeftRef = React.useRef(timeLeft);
  const deviceIdRef = React.useRef(deviceId)
  const [moduleTheme, setModuleTheme] = useState([
    {
      background: constants.Images.ForestBackground,
      blur: true,
      backgroundVideo: constants.Video.FocusScreenVideo,
      music: constants.Music.FocusScreenMusic,
    },
    {
      background: {uri: `${BASE_URL}/cleanse-Focus/Focus_rain_preImg.jpeg`},
      blur: true,
      backgroundVideo: {
        uri: `${BASE_URL}/cleanse-Focus/Focus_rain_portrait.mp4`,
      },
      music: {uri: `${BASE_URL}/cleanse-Focus/Focus_rain_sound.mp3`},
    },
  ]);
  var timer2;
  var disconnectStateListener;
  var intervalId;
  let timeRemaining ;
  const reconnectFunction = async (value) => {
    if (value == false) {
      setDeviceConnected(false);
      setDeviceNoteConnect(true);
    }
  };

  useEffect(() => {
    musicTime();
    AsyncStorage.getItem('focusTimer').then((asyncData) => {
      if (asyncData) {
        props.saveFocusTimer(parseInt(asyncData));
        setMusicTimes(parseInt(asyncData));
        setCounterTime(parseInt(asyncData) * 60);
      }
    });
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = async (currentAppState) => {
    if(Platform.OS=="android"){
      timeRemaining = timeLeftRef.current * 1000;
      if (currentAppState == 'active') {
        if(timeRemaining == 0){
          setMusicStop(false)
        }
      } else {
        intervalId = BackgroundTimer.setTimeout(() => {
          setMusicStop(true);
          // Platform.OS === 'ios' ? MusicControl.stopControl() : null;
          MusicControl.resetNowPlaying();
          timeLeftRef.current = 0;
          timeRemaining = 0
         
            BleManager.retrieveServices(deviceIdRef.current).then(
              async  (peripheralInfo) => {
                  var service = '1d85df88-8b57-4c49-89e2-fa80e020c04e';
                  let Light = await AsyncStorage.getItem('Light');
                  var characteristicUUID =
                    'ee5f11f1-bd3a-4a3c-81ff-10b8d475f302';
                  let stringData 
                  if(Light !== null && Light !== undefined){
                    if(Light == "true"){
                      stringData = "0 1 1" 
                    }
                    else {
                      stringData = "0 0 1"
                    }
                  }
                  else {
                      stringData = "0 1 1"
                  }
                  let data =await stringToBytes(stringData);
                  // console.warn(stringData)
                  BleManager.write(
                    deviceIdRef.current,
                    service,
                    characteristicUUID,
                    data,
                  ).then((res) => {
                    // console.warn(res,"success")
                  })
                  .catch(err=>{
                    // console.warn("fail",err)
                  })
                },
              ).catch(err=>{
                // console.warn("Error",err)
              })
        
        }, timeRemaining);
    }
  }
     else  {
      if (currentAppState == 'active') {
        if (Platform.OS == 'ios') {
          // if(deviceIdRef)
          // if()
          // console.warn(deviceIdRef.current,"Focus")
          if(deviceIdRef.current){
            const isEnabled = await BluetoothStatus.state();
            reconnectFunction(isEnabled);
          }
         
        }
      }
     }
   
    }

  useEffect(() => {
    const backAction = () => {
      BackButton();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      disconnectStateListener = bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        async (arg) => {
          setDeviceConnected(false);
          setDeviceNoteConnect(true);
        },
      );

      timer2 = window.setInterval(async () => {
        let deviceData = await AsyncStorage.getItem('deviceData');
        if (deviceData !== null && deviceData !== undefined) {
          AsyncStorage.getItem('deviceData')
            .then((deviceData) => {
              const devicedata11 = JSON.parse(deviceData);
              BleManager.isPeripheralConnected(devicedata11['id'], [
                '1D85DF88-8B57-4C49-89E2-FA80E020C04E',
              ]).then((isConnected) => {
                if (isConnected) {
                  setDeviceName(devicedata11.name);
                  setDeviceId(devicedata11.id);
                  deviceIdRef.current = devicedata11.id
                  setDeviceConnected(true);
                  setClickableOrNot(true)
                } else {
                  setDeviceConnected(false);
                  setDeviceNoteConnect(true);
                  setDeviceId('');
                  setDeviceName("");
                  setClickableOrNot(true)
                  deviceIdRef.current = ""
                  setTimeout(() => {
                    setDeviceNoteConnect(false);
                  }, 3000);
                }
              });
            })
            .catch((err) => {
              console.warn(err, 'error');
            });
        }
        else {
          setDeviceId('');
          setDeviceName("");
          setClickableOrNot(true)
          deviceIdRef.current = ""
        }
      }, 500);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    musicTime();
  }, [timerModalVisible]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setMusicStop(true);
      BackgroundTimer.clearInterval(intervalId)
      window.clearInterval(timer2);
      disconnectStateListener.remove();
    });

    return unsubscribe;
  }, [navigation]);

  const BackButton = async () => {
    if (startCounter === false) {
      if (goBack == true) {
        Platform.OS === 'ios' ? MusicControl.stopControl() : null;
        MusicControl.resetNowPlaying();
        await setMusicStop(true);
        props.saveModuleSound(true);
        navigation.navigate('HomeScreen');
      }
    } else {
      setExitModalVisible(true);
      props.saveModuleSound(true);
    }
  };

  const exitConfirm = async () => {
    if (goBack == true) {
      Platform.OS === 'ios' ? MusicControl.stopControl() : null;
      MusicControl.resetNowPlaying();
      setExitModalVisible(false);
      await setMusicStop(true);
      setStopDiffusion(true);
      props.saveModuleSound(true);
      navigation.navigate('HomeScreen');
    }
  };

  const stopWasPressed = (value) => {
    setStopPressed(value);
  };

  const startTimerOrStop = () => {
    if (startCounter && stopPressed === false) setToast(true);
    setStartCounter(!startCounter);
    setBlurScreen(!blurScreen);
  };

  const openSetTimeModal = () => {
    if (startCounter === false) {
      setTimerModalVisible(true);
    } else {
      setTimerModalVisible(false);
    }
  };

  const musicTime = () => {
    setMusicTimes(props.focusTimer);
    setCounterTime(props.focusTimer * 60);
  };

  const onPressConnectionOrSetting = (type) => {
    // setTab(type);
    // setSettingModalVisible(true);
    if(clickableOrNot){
      if (deviceName === '') {
        setMusicStop(false)
        Platform.OS === 'ios' ? MusicControl.stopControl() : null;
          MusicControl.resetNowPlaying();
        navigation.navigate('ConnectionScreen');
      } else {
        setTab(type);
        setSettingModalVisible(true);
      }
    }
    
  };

  const removeToast = () => {
    setToast(false);
    setStopPressed(false);
  };

  const toggleInitialModal = () => {
    setMusicStop(true);
    props.saveModuleSound(true);
    setStopDiffusion(true);

    setInitialModal(!initialModal);
  };

  const _renderItem = ({item, index}) => {
    
    return (
      <BlurBackground
        onPress={onPress}
        blur={blurScreen}
        backgroungVideo={item.backgroundVideo}
        backgrounImage={item.background}
      />
    );
  };

  const onPress = () => {
    setTap(!tap);
    setreturnState(null);
  };

  const displayScreen = (data) => {
    if (startCounter) {
      if (tap == false && data == true) {
        setTap(!tap);
        setreturnState(false);
      }
    }
    return returnState;
  };

  const checkToken = (index) => {
    Auth.currentUserInfo().then(async (res) => {
      if (res == null) {
        if (index === 1) {
          setModalOpen(true);
          toggleInitialModal();
        }
      } else if (Object.keys(res).length == 0) {
        if (index === 1) {
          setModalOpen(true);
          toggleInitialModal();
        }
      } else {
        setActiveSlide(index);
      }
    });
  };

  const openSound = (data) => {
    if (data == true) {
      setMusicStop(true);
      props.saveModuleSound(true);
      setStopDiffusion(true);
      return navigation.navigate('HomeScreen');
    }
  };

  const removeSound = (data) => {
    if (data == true) {
      setGoback(true);
    }
  };

  const MessageOnceDisplayed = (data) => {
    if (data == true) {
      setOnceDisplayed(true);
    }
  };

  const timerCheck = (data) => {
    setTimeLeft(data);
    timeLeftRef.current = data;
  };

  return (
    <View style={styles.Flex1}>
      {/* <MyStatusBar backgroundColor="transparent"   /> */}
      <SafeAreaView
        style={{
          position: 'absolute',
          zIndex: 10,
          top: hasNotch
            ? Platform.OS === 'android'
              ? 40
              : 50
            : Platform.OS === 'android'
            ? 20
            : 30,
        }}>
        <HeaderWithTitle
          onPressBackButton={BackButton}
          title={''}
          type="module"
          iconColor={'white'}
          shadow={true}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.IndicatorWrapper}>
        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: activeSlide === 0 ? 'white' : '#fefcfb4D',
          }}
        />
        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: activeSlide === 1 ? 'white' : '#fefcfb4D',
          }}
        />
      </SafeAreaView>
      <ImageBackground
        source={constants.Images.ForestBackground}
        style={{flex: 1, backgroundColor: 'transparent'}}
        blurRadius={7}
        resizeMode={'stretch'}>
        {Platform.OS == 'ios' ? (
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <Carousel
              // scrollEnabled={hasToken}
              inactiveSlideScale={1}
              layout={'default'}
              bounces={false}
              data={moduleTheme}
              firstItem={activeSlide}
              renderItem={_renderItem}
              sliderWidth={SceenWidth}
              itemWidth={SceenWidth}
              onSnapToItem={(index) => {
                checkToken(index);
              }}
              // extraData={moduleTheme}
            />
          </View>
        ) : (
          <Carousel
            // scrollEnabled={hasToken}
            inactiveSlideScale={1}
            layout={'default'}
            bounces={false}
            data={moduleTheme}
            firstItem={activeSlide}
            renderItem={_renderItem}
            sliderWidth={SceenWidth}
            itemWidth={SceenWidth}
            onSnapToItem={(index) => {
              checkToken(index);
            }}
            // extraData={moduleTheme}
          />
        )}
        <ModuleScreen
          // returnFunction={returnFunction}
          // clickableOrNot={}
          modalOpen={modalOpen}
          removeSound={removeSound}
          displayScreen={displayScreen}
          toggleInitialModal={toggleInitialModal}
          completeData={moduleTheme}
          deviceConnected={deviceConnected}
          openSetTimeModal={openSetTimeModal}
          counterTime={counterTime}
          stopWasPressed={stopWasPressed}
          showTime={musicTimes}
          musicStop={musicStop}
          timerCheck={timerCheck}
          blurScreen={blurScreen}
          startCounter={startCounter}
          activeSlide={activeSlide}
          deviceId={deviceId}
          clickableOrNot={clickableOrNot}
          stopDiffusion={stopDiffusion}
          startTimerOrStop={() => startTimerOrStop()}
          onPressConnectionOrSetting={(type) =>
            onPressConnectionOrSetting(type)
          }
        />
        <ExitAlert
          modalVisible={exitModalVisible}
          title={'Leaving now?'}
          messageText={' Sound and aroma will stop after exit.'}
          Button1Text={'Exit'}
          Button2Text={'Stay'}
          closeModal={() => setExitModalVisible(false)}
          exitConfirm={exitConfirm}
        />
        <SelectTimer
          backgroundImage={
            activeSlide === 0
              ? constants.Images.ForestBackground
              : {uri: `${BASE_URL}/cleanse-Focus/Focus_rain_preImg.jpeg`}
          }
          modalVisible={timerModalVisible}
          closeModal={() => setTimerModalVisible(false)}
          timer={musicTimes}
          saveTimer={props.saveFocusTimer}
          theme="focusTimer"
        />
        {deviceNoteConnect && onceDisplayed !== true && (
          <Message
            message="No Aromeo Device has been connected."
            MessageOnceDisplayed={MessageOnceDisplayed}
          />
        )}
        {toast && stopPressed && (
          <Toast
            headingText="Focus Session Finished!"
            message={`You have finished ${musicTimes} min of Focus Session.`}
            customColor="#ffffff"
            removeToast={removeToast}
          />
        )}
        <SettingModal
          backgroundImage={
            activeSlide === 0
              ? constants.Images.ForestBackground
              : {uri: `${BASE_URL}/cleanse-Focus/Focus_rain_preImg.jpeg`}
          }
          selectedTab={selectedTab}
          modalVisible={settingModalVisible}
          closeModal={() => {
            setSettingModalVisible(false);
            setTab(null);
          }}
          device={route}
        />
        <InitialModal
          modalVisible={initialModal}
          closeModal={toggleInitialModal}
          navigation={navigation}
          openSound={openSound}
          redirectToHome={true}
        />
      </ImageBackground>
    </View>
  );
};

export default connect(
  (state) => ({
    focusTimer: state.app.focusTimer,
    moduleSound: state.app.moduleSound,
  }),
  {...AppActionTypes},
)(FocusModuleScreen);
