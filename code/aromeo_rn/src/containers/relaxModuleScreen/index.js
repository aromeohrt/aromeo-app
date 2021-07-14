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
import {BASE_URL} from '../../utilities/Connetion';
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
import styles from './style';
import DeviceInfo from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import BleManager from 'react-native-ble-manager';
import {Auth} from 'aws-amplify';
import {connect} from 'react-redux';
import * as AppActionTypes from '../../actions/app-actions-types';
import MusicControl from 'react-native-music-control';
import {BluetoothStatus} from 'react-native-bluetooth-status';
import NetInfo from '@react-native-community/netinfo';
import BackgroundTimer from 'react-native-background-timer';
import { stringToBytes } from "convert-string";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const SceenWidth = Dimensions.get('window').width;
const hasNotch = DeviceInfo.hasNotch();

type Props = {
  navigation: Object,
};

const RelaxModuleScreen = (props) => {
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
  let [selectedTab, setTab] = useState(0);
  const [tap, setTap] = useState(true);
  const [returnState, setreturnState] = useState(null);
  let [toast, setToast] = useState(false);
  const [clickableOrNot,setClickableOrNot] = useState(false)
  let [goBack, setGoback] = useState(false);
  const [onceDisplayed, setOnceDisplayed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [moduleTheme, setModuleTheme] = useState([
    {
      background: constants.Images.RelaxBackground,
      blur: true,
      backgroundVideo: constants.Video.RelaxScreenVideo,
      music: constants.Music.RelaxScreenMusic,
    },
    {
      background: {uri: `${BASE_URL}/chill-Relax/Relax_chill_preImg.jpeg`},
      blur: true,
      backgroundVideo: {
        uri: `${BASE_URL}/chill-Relax/Relax_chill_portrait.mp4`,
      },
      music: {uri: `${BASE_URL}/chill-Relax/Relax_chill_sound.mp3`},
    },
  ]);
  let [timeLeft, setTimeLeft] = useState();
  const deviceIdRef = React.useRef(deviceId)
  const timeLeftRef = React.useRef(timeLeft);
  var timer2;
  var disconnectStateListener;
  var intervalId;
  let timeRemaining ;
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
                  console.warn(stringData)
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
      //  console.warn("ios check")
      if (currentAppState == 'active') {
        // console.warn(deviceIdRef.current,"Relac")
        if(deviceIdRef.current){
          const isEnabled = await BluetoothStatus.state();
          reconnectFunction(isEnabled);
        }
      }
     }
   
    }

  useEffect(() => {
    musicTime();
    AsyncStorage.getItem('relaxTimer').then((asyncData) => {
      if (asyncData) {
        props.saveRelaxTimer(parseInt(asyncData));
        setMusicTimes(parseInt(asyncData));
        setCounterTime(parseInt(asyncData) * 60);
      }
    });
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const reconnectFunction = async (value) => {
    if (value == false) {
      setDeviceConnected(false);
      setDeviceNoteConnect(true);
    }
  };

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
          // console.warn('Disconnected');
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
              // console.warn(err, 'error');
            });
        }
        else {
          setClickableOrNot(true)
          setDeviceName("");
          setDeviceId('');
          deviceIdRef.current = ""
        }
      }, 1000);
    });
    return () => {
      unsubscribe;
    };
    //  return ()=>{
    //   window.clearInterval(timer2)
    //  };
  }, []);

  useEffect(() => {
    musicTime();
  }, [timerModalVisible]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setMusicStop(true);
      window.clearInterval(timer2);
      BackgroundTimer.clearInterval(intervalId)
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
    setMusicTimes(props.relaxTimer);
    setCounterTime(props.relaxTimer * 60);
  };

  const onPressConnectionOrSetting = (type) => {
    // setTab(type);
    //     setSettingModalVisible(true)
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
      // <TouchableOpacity
      // style={{flex: 1}}
      // onPress={() => {
      //   setTap(!tap);
      //   setreturnState(null)
      // }}
      // activeOpacity={1}>
      <BlurBackground
        onPress={onPress}
        blur={blurScreen}
        backgroungVideo={item.backgroundVideo}
        backgrounImage={item.background}
      />
      // </TouchableOpacity>
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

  const MessageOnceDisplayed = (data) => {
    // console.warn(data, 'Data');
    if (data == true) {
      setOnceDisplayed(true);
    }
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

  // const checkToken = (index) => {
  //   Auth.currentUserInfo().then(async (res) => {
  //     if (res == null) {
  //       if (index === 1) {
  //         setModalOpen(true);
  //         toggleInitialModal(); //logout
  //       }
  //     } else if (Object.keys(res).length == 0) {

  //         NetInfo.fetch().then(async state => {

  //           // console.warn("Is connected?", state.isConnected);
  //           if(state.isConnected== false){
  //             let login = await AsyncStorage.getItem("Token")
  //             if(login !== null && login !== undefined){
  //               setActiveSlide(index);
  //             }
  //             else {
  //               if (index === 1) {
  //                 setModalOpen(true);
  //                 toggleInitialModal(); //logout
  //               }
  //             }
  //           } else {
  //             if (index === 1) {
  //                 setModalOpen(true);
  //                 toggleInitialModal();
  //              } //logout
  //           }
  //         });
  //       // if (index === 1) {
  //       //   setModalOpen(true);
  //       //   toggleInitialModal(); //logout
  //       // }
  //     } else {
  //       setActiveSlide(index);
  //     }
  //   });
  // };

  const openSound = (data) => {
    if (data == true) {
      // setHasToken(true)
      // setActiveSlide(0)
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

  const timerCheck = (data) => {
    setTimeLeft(data);
    timeLeftRef.current = data;
  };

  return (
    <View style={styles.Flex1}>
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
        source={constants.Images.RelaxBackground}
        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.35)'}}
        blurRadius={10}
        resizeMode={'stretch'}>
        {Platform.OS == 'ios' ? (
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.35)'}}>
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
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.35)'}}>
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
        )}

        <ModuleScreen
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
          blurScreen={blurScreen}
          startCounter={startCounter}
          activeSlide={activeSlide}
          deviceId={deviceId}
          clickableOrNot={clickableOrNot}
          timerCheck={timerCheck}
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
              ? constants.Images.RelaxBackground
              : {uri: `${BASE_URL}/chill-Relax/Relax_chill_preImg.jpeg`}
          }
          modalVisible={timerModalVisible}
          closeModal={() => setTimerModalVisible(false)}
          timer={musicTimes}
          saveTimer={props.saveRelaxTimer}
          theme="relaxTimer"
          tintColor={'white'}
        />
        {deviceNoteConnect && onceDisplayed !== true && (
          <Message
            message="No Aromeo Device has been connected."
            MessageOnceDisplayed={MessageOnceDisplayed}
          />
        )}
        {toast && stopPressed && (
          <Toast
            headingText="Relax Session Finished!"
            message={`You have finished ${musicTimes} min of Relax Session.`}
            customColor="#ffffff"
            removeToast={removeToast}
          />
        )}
        <SettingModal
          backgroundImage={
            activeSlide === 0
              ? constants.Images.RelaxBackground
              : {uri: `${BASE_URL}/chill-Relax/Relax_chill_preImg.jpeg`}
          }
          selectedTab={selectedTab}
          modalVisible={settingModalVisible}
          closeModal={() => {
            setSettingModalVisible(false);
            setTab(null)
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
    relaxTimer: state.app.relaxTimer,
    moduleSound: state.app.moduleSound,
  }),
  {...AppActionTypes},
)(RelaxModuleScreen);
