import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  AppState,
  Platform,
  NativeModules,
  NativeEventEmitter,
  StatusBar,
  ImageBackground
} from 'react-native';
import Video, {FilterType} from 'react-native-video';
import constants from '../../constants';
import I18n from '../../utilities/locale';
import {useFocusEffect} from '@react-navigation/native';
import {
  SelectDeviceModal,
  BlurRoundButton,
  InitialModal,
  ExitAlert,
} from '../../components';
import NetInfo from "@react-native-community/netinfo";
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import SystemSetting from 'react-native-system-setting';
import {BlurView} from '@react-native-community/blur';
import AsyncStorage from '@react-native-community/async-storage';
import BleManager from 'react-native-ble-manager';
import {Auth} from 'aws-amplify';
import batteryRed from '../../assets/images/batteryRed.png'
import {connect} from 'react-redux';
import {stringToBytes} from 'convert-string';
import * as AppActionTypes from '../../actions/app-actions-types';
import Sound from 'react-native-sound';
import {MyStatusBar} from '../../utilities/statusBar';
import {BluetoothStatus} from 'react-native-bluetooth-status';
import background from './background.png'
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

var Buffer = require('buffer/').Buffer;
type Props = {
  navigation: Object,
};
var sound1;
var disconnectStateListener;
var timer1;
var timer2;
var timer3;

const HomeScreen = (props) => {
  let {navigation} = props;
  const [currentTime, setCurrentTime] = useState('04:00PM');
  const [modalVisible, setModalVisible] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [changeBatteryIcon,setChangeBatteryIcon]= useState(false)
  const [initialModal, setInitialModal] = useState(false);
  const [soundLoading, setSoundLoading] = useState(false);
  const [reconnectModal, setReconnectModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [deviceIssue, setDeviceIssue] = useState(false);
  const [peripherals, setPeripherals] = useState({});
  let deviceNameRef = React.useRef(deviceName);
  const [allDevice, setAllDevice] = useState([
    // { deviceName: 'Aromeo Alpha 001010105...', deviceId: 9, isSelected: false },
  ]);
  const [diffusionStatus, setDiffusionStatus] = useState('');

  const handleAppStateChange = async (currentAppState) => {
    if (navigation.isFocused()) {
      setCurrentTime(new Date().getHours());
      if (currentAppState == 'background' || currentAppState == 'inactive') {
        sound1.stop();
        setSoundLoading(false);
      }
      if (currentAppState == 'active') {
        sound1.setNumberOfLoops(10).play(() => {
          sound1.release();
        });
        setSoundLoading(true);

        if (Platform.OS == 'ios') {
          // console.warn(deviceNameRef.current)
          // if(deviceNameRef.current){
            const isEnabled = await BluetoothStatus.state();
            reconnectFunction(isEnabled);
          // }
          
        }
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      AppState.addEventListener('change', handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    }, []),
  );
 

  const reconnectFunction = async (value) => {
    let deviceData = await AsyncStorage.getItem('deviceData');
    if (deviceData !== undefined && deviceData !== null && value == false) {
      // console.warn("Recommect")
      setDeviceName('');
      deviceNameRef.current=""
      await AsyncStorage.removeItem('deviceData');
      await AsyncStorage.removeItem('Light');
      setReconnectModal(true);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      SystemSetting.getVolume().then((volume) => {
        props.saveSystemSound(volume);
        SystemSetting.setVolume(volume);
      });
      setCurrentTime(new Date().getHours());
      sound1 = new Sound(
        require('../../assets/music/NewHomePageMusic_01.mp3'),
        (error, sound) => {
          if (error) {
            // console.warn(error);
            return;
          }
          sound1.setCategory('Playback', true);
          sound1.setNumberOfLoops(10).play(() => {
            sound1.release();
          });
          setSoundLoading(true);
        },
      );

      timer1 = window.setInterval(() => {
        Auth.currentUserInfo().then(async (user) => {
          if (user == null) {
          
          } 
          else if (Object.keys(user).length == 0) {
            // console.warn('USER', user);
            NetInfo.fetch().then(async state => {
              // console.warn("Is connected?", state.isConnected);
              if(state.isConnected== true){
                setLogoutModal(true);
                // console.warn("Timer")
                setDeviceName('');
                deviceNameRef.current=""
                await AsyncStorage.removeItem('deviceData');
                await AsyncStorage.removeItem('Light');
                let id = await AsyncStorage.getItem('DeviceId');
                if (id !== null && id !== undefined) {
                  BleManager.disconnect(id)
                    .then(async () => {
                      // console.warn("Disconnect")
                      setDeviceName('');
                      deviceNameRef.current=""
                      await AsyncStorage.removeItem('DeviceId');
                      // await AsyncStorage.clear()
                    })
                    .catch((error) => {
                      // Failure code
                      // alert(error)
                    });
                }
              }
            });
            
       
          }
        });
      }, 4000);

      timer2 = window.setInterval(() => {
        setCurrentTime(new Date().getHours());
      }, 1000);



      disconnectStateListener = bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        async (arg) => {
          // console.warn("BleManagerDisconnectPeripheral")
          setDeviceName('');
          deviceNameRef.current=""
          setReconnectModal(true);
          await AsyncStorage.removeItem('deviceData');
          await AsyncStorage.removeItem('Light');
          let id = await AsyncStorage.getItem('DeviceId');
          if (id !== null && id !== undefined) {
            BleManager.disconnect(id)
              .then(async () => {
                // console.warn("BleManagerDisconnectPeripheral disconnect")
                setDeviceName('');
                deviceNameRef.current=""
                await AsyncStorage.removeItem('DeviceId');
                // await AsyncStorage.clear()
              })
              .catch((error) => {
                // Failure code
                // alert(error)
              });
          }
        },
      );

      await AsyncStorage.getItem('deviceData')
        .then(async (deviceData) => {
          // console.warn("deviceData",deviceData)
          const arr = [];
          const devicedata11 = JSON.parse(deviceData);
          setPeripherals(devicedata11);

          await AsyncStorage.setItem('DeviceId', devicedata11.id);
          BleManager.isPeripheralConnected(devicedata11.id, [
            '1D85DF88-8B57-4C49-89E2-FA80E020C04E',
          ])
            .then((isConnected) => {
              // console.warn(isConnected,"please check")
              if (isConnected) {
                Auth.currentUserInfo({
                  bypassCache: false,
                }).then((user) => {
                  if (user == null) {
                    // console.warn('ERROR');
                  } else if (Object.keys(user).length == 0) {
                    // console.warn('ERROR');

                    
                  } else {
                    // console.warn('USER', user);
                    setDeviceIssue(true);
                    setDeviceName(devicedata11.name);
                    deviceNameRef.current = devicedata11.name
                    const obj = {
                      deviceName: devicedata11.name,
                      deviceId: 1,
                      isSelected: true,
                    };
                    const Final_data = arr.push(obj);
                    setAllDevice(arr);
                    readBattery(devicedata11)
                    updateDiffuserIntensity(devicedata11);
                    sound1.setNumberOfLoops(10).play(() => {
                      sound1.release();
                    });
                    setSoundLoading(true);
                  }
                });
                // Auth.currentAuthenticatedUser({
                //   bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
                // })
                //   .then((user) => {
                //     console.warn("USER",user)
                //     setDeviceName(devicedata11.name);
                //     const obj = {
                //       deviceName: devicedata11.name,
                //       deviceId: 1,
                //       isSelected: true,
                //     };
                //     const Final_data = arr.push(obj);
                //     setAllDevice(arr);
                //     updateDiffuserIntensity(devicedata11);
                //   })
                //   .catch((err) => console.warn("ERROR",err));
              } else {
                // console.warn("isPeripheralConnected")
                setDeviceName('');
                deviceNameRef.current =""
                const obj = {
                  deviceName: devicedata11.name,
                  deviceId: 1,
                  isSelected: false,
                };
                const Final_data = arr.push(obj);
                setAllDevice(arr);
                sound1.setNumberOfLoops(10).play(() => {
                  sound1.release();
                });
                setSoundLoading(true);
              }
            })
            .catch((err) => {
              // console.warn('ERR', err);
            });
        })
        .catch(async (err) => {
          // console.warn("isPeripheralConnected catch")  
          setDeviceName('');
          deviceNameRef.current =""
          await AsyncStorage.removeItem('deviceData');
          let id = await AsyncStorage.getItem('DeviceId');
          if (id !== null && id !== undefined) {
            BleManager.disconnect(id)
              .then(async () => {
                // console.warn("isPeripheralConnected disconnect")  
                setDeviceName('');
                deviceNameRef.current =""
                await AsyncStorage.removeItem('DeviceId');
                // await AsyncStorage.clear()
              })
              .catch((error) => {
                // Failure code
                // alert(error)
              });
          }
        });
    });
    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      sound1.stop();
      setSoundLoading(false);
      disconnectStateListener.remove();
      window.clearInterval(timer1);
      window.clearInterval(timer2);
    });

    return unsubscribe;
  }, [navigation]);

  const updateDiffuserIntensity = (connectedDevice) => {
    BleManager.retrieveServices(connectedDevice.id)
      .then((peripheralInfo) => {
        var service = '1d85df88-8b57-4c49-89e2-fa80e020c04e';
        var characteristicUUID = 'ee5f11f1-bd3a-4a3c-81ff-10b8d475f302';

        setTimeout(() => {
          BleManager.read(connectedDevice.id, service, characteristicUUID)
            .then(async (readData) => {
              // Success code
              setDiffusionStatus(readData[0]);
              let Light = await AsyncStorage.getItem('Light');
              var stringData;
              if (readData[0] == 49) {
                props.diffusionOn();
                if (Light !== undefined && Light !== null) {
                  if (Light == 'true') {
                    stringData = '1 1 1';
                  } else {
                    stringData = '1 0 1';
                  }
                } else {
                  stringData = '1 1 1';
                }
              } else {
                props.diffusionOff();
                if (Light !== undefined && Light !== null) {
                  if (Light == 'true') {
                    stringData = '0 1 1';
                  } else {
                    stringData = '0 0 1';
                  }
                } else {
                  stringData = '0 1 1';
                }
              }

              let data = stringToBytes(stringData);
              // console.warn(data, 'Data');
              BleManager.write(
                connectedDevice.id,
                service,
                characteristicUUID,
                data,
              ).then(() => {
                // props.ledOn();
              });
            })
            .catch((error) => {
              // Failure code
              // console.warn(error, 'help me ');
            });
        }, 500);
      })
      .catch((err) => {
        // console.warn('update err');
        setDeviceName('');
        deviceNameRef.current =""
      });
  };


  const buf2hex = (buffer) => {
    // buffer is an ArrayBuffer
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2))
      .join('');
  };

  const hex_to_ascii = (str1) => {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  };

  const readBattery=(connectedDevice)=>{
    var service = '1D85DF88-8B57-4C49-89E2-FA80E020C04E';
    var characteristicUUID = 'bfebc03c-b717-4df1-b294-d1dec74bf9ec';
    setTimeout(() => {
      BleManager.read(connectedDevice.id, service, characteristicUUID)
        .then((readData) => {
          const buffer = new Uint8Array(readData).buffer;
          let batteryLevel = hex_to_ascii(buf2hex(buffer))
          let split = batteryLevel.split(" ")
          let level = parseInt(split[3])
          if(level <=20){
            setChangeBatteryIcon(true)
          }
     
          console.warn(batteryLevel)
        })
        .catch((error) => {
          console.warn(error, 'NOTIFICATION ERROR');
        });
    }, 200);
  }

  const openConnectionScreen = () => {
    sound1.stop();
    setSoundLoading(false);
    setModalVisible(false);
    setTimeout(()=>{
      openConnection();
    },1000)
    
    // navigation.navigate('FocusModuleScreen');
  };

  const openConnection = () => {
    // if (soundLoading == true) {
    //   setSoundLoading(false)
    // console.warn("Dont go")
      navigation.navigate('ConnectionScreen');
    // }
  };

  const moveToConnectionScreen = () => {
    Auth.currentUserInfo()
      .then((user) => {
        if (user == null) {
          sound1.stop();
          setSoundLoading(false);
          // sound1.pause()

          toggleInitialModal(); //logout
          // openSound()
        }
        if (Object.keys(user).length == 0) {
          sound1.stop();
          setSoundLoading(false);
          // sound1.pause()

          toggleInitialModal(); //logout
          // openSound()
        } else {
          sound1.stop();
          setSoundLoading(false);
          if (deviceName === '' && soundLoading == true ) {
            navigation.navigate('ConnectionScreen');
          } else {
            setModalVisible(true);
          }
        }
      })
      .catch((err) => {
        // console.warn('Error', err);
      });
    // Auth.currentAuthenticatedUser()
    //   .then((user) => {
    //     // console.warn("user",user)
    //     sound1.stop();
    //     setSoundLoading(false)
    //     if (deviceName === '') {
    //       navigation.navigate('ConnectionScreen');
    //     } else {

    //       setModalVisible(true);

    //     }
    //   })
    //   .catch((err) => {
    //     sound1.stop();
    //     setSoundLoading(false)
    //     // sound1.pause()
    //     console.warn(err,"IN MOVEEE")
    //     toggleInitialModal(); //logout
    //     // openSound()
    //   });
  };

  const selectDevice = (selectItem) => {
    // console.warn(selectItem,"Dfksfskf")
    const {isSelected, deviceId} = selectItem;
    BleManager.connect('62546602-E6B5-0BA6-E10C-C54966D5B695')
      .then(() => {
        let peripherals = peripherals;
        let p = peripherals.get('62546602-E6B5-0BA6-E10C-C54966D5B695');
        if (p) {
          p.connected = true;
          peripherals.set('62546602-E6B5-0BA6-E10C-C54966D5B695', p);
          this.setState({peripherals});
        }

        setTimeout(() => {
          BleManager.retrieveServices('62546602-E6B5-0BA6-E10C-C54966D5B695')
            .then((peripheralInfo) => {
              // this.storeData(peripheral);
              // this.props.navigation.navigate('HomeScreen');
              const data = allDevice;
              data.map((item) => {
                if (item.deviceId === deviceId) {
                  item.isSelected = true;
                } else {
                  item.isSelected = false;
                }
              });
              var service = '1D85DF88-8B57-4C49-89E2-FA80E020C04E';
              var bakeCharacteristic = '1D85DF88-8B57-4C49-89E2-FA80E020C04E';
              var crustCharacteristic = '1D85DF88-8B57-4C49-89E2-FA80E020C04E';

              setTimeout(() => {
                BleManager.startNotification(
                  '62546602-E6B5-0BA6-E10C-C54966D5B695',
                  service,
                  bakeCharacteristic,
                )
                  .then(() => {
                    setTimeout(() => {
                      BleManager.write(
                        '62546602-E6B5-0BA6-E10C-C54966D5B695',
                        service,
                        crustCharacteristic,
                        [0],
                      ).then(() => {
                        BleManager.write(
                          '62546602-E6B5-0BA6-E10C-C54966D5B695',
                          service,
                          bakeCharacteristic,
                          [1, 95],
                        ).then(() => {});
                      });
                    }, 500);
                  })
                  .catch((error) => {
                    // console.warn('Notification error', error);
                  });
              }, 200);
            })
            .catch((err) => {
              // console.warn('ble', err);
            });
        }, 900);
      })
      .catch((error) => {
        // alert(error);
      });

    setModalVisible(false);

    // setAllDevice(data);
  };

  const onPressIcon = (iconName) => {
    if (soundLoading == true) {
      sound1.stop();
      setSoundLoading(false);
      if (iconName === 'Focus') {
        navigation.navigate('FocusModuleScreen', {peripherals});
      } else if (iconName === 'Relax') {
        navigation.navigate('RelaxModuleScreen', {peripherals});
      } else if (iconName === 'Sleep') {
        navigation.navigate('SleepModuleScreen', {peripherals});
      }
    }
  };

  const toggleInitialModal = () => {
    setInitialModal(!initialModal);
  };

  const openSound = (data) => {
    if (data == true) {
      sound1 = new Sound(
        require('../../assets/music/NewHomePageMusic_01.mp3'),
        (error, sound) => {
          if (error) {
            // console.warn(error);
            return;
          }
          sound1.setNumberOfLoops(10).play(() => {
            sound1.release();
          });
          setSoundLoading(true);
        },
      );
    }
  };

  const reconnect = async () => {
    setReconnectModal(false);

    let id = await AsyncStorage.getItem('DeviceId');
    if (id !== null && id !== undefined) {
      BleManager.disconnect(id)
        .then(async () => {
          // console.warn("reconnect diconefdfg")  
          setDeviceName('');
          deviceNameRef.current =""
          await AsyncStorage.removeItem('DeviceId');
          // await AsyncStorage.clear()
        })
        .catch((error) => {
          // Failure code
          // alert(error)
        });
    }

    moveToConnectionScreen();
  };

  const closeReconnect = async () => {
    setReconnectModal(false);
    // console.warn(" closeReconnect")  
    setDeviceName('');
    deviceNameRef.current =""
    if (id !== null && id !== undefined) {
      BleManager.disconnect(id)
        .then(async () => {
          await AsyncStorage.removeItem('DeviceId');
          // await AsyncStorage.clear()
        })
        .catch((error) => {
          // Failure code
          // alert(error)
        });
    }
  };

  return (
    <View style={styles.container}>
        {/* <StatusBar hidden={false} /> */}
      {/* <MyStatusBar backgroundColor="transparent"   /> */}
      {/* <ImageBackground source={background} style={{flex:1}}> */}
      <Video
        source={constants.Video.HomeScreenVideo}
        style={styles.backgroundVideo}
        muted={false}
        repeat={true}
        fullscreen={false}
        playInBackground={true}
        volume={1.0}
        resizeMode={'cover'}
        // filterEnabled={true}
        // filter={FilterType.INVERT}
        rate={1.0}
        // ignoreSilentSwitch={'obey'}
      />

      <LinearGradient
        colors={
          currentTime >= 6 && currentTime < 12
            ? ['#6e8c9d4d', '#12273066']
            : currentTime >= 12 && currentTime < 18
            ? ['#886d413d', '#503e2a66']
            : currentTime >= 18 && currentTime < 24
            ? ['#5c5c7d33', '#1b1e3366']
            : ['#5c5c7d33', '#1b1e3366']
        }
        style={styles.container1}>
        <View style={styles.upperContainer}>
          <Text style={styles.headingText}>
            {currentTime >= 6 && currentTime < 12
              ? I18n.en.GoodMorning
              : currentTime >= 12 && currentTime < 18
              ? I18n.en.GoodAfterNoon
              : currentTime >= 18 && currentTime < 24
              ? I18n.en.GoodEvening
              : I18n.en.GoodEvening}
          </Text>
          <View style={styles.titleTextWrapper}>
            <Text style={styles.titleText}>
              {currentTime >= 6 && currentTime < 12
                ? I18n.en.GoodMorningMsg
                : currentTime >= 12 && currentTime < 18
                ? I18n.en.GoodAfterNoonMsg
                : currentTime >= 18 && currentTime < 24
                ? I18n.en.GoodEveningMsg
                : I18n.en.GoodEveningMsg}
            </Text>
          </View>
          <View style={styles.buttonBattery}>
            {Platform.OS === 'ios' ? (
              <BlurView
                blurType="light"
                blurAmount={32}
                blurRadius={22}
                downsampleFactor={20}
                overlayColor={'#fefcfb30'}
                reducedTransparencyFallbackColor={'white'}
                style={[
                  styles.connectButton,
                  deviceName === ''
                    ? styles.blurWidthWithout
                    : styles.blurWidth,
                ]}>
                <TouchableOpacity
                  onPress={moveToConnectionScreen} //setModalVisible(true)}
                  activeOpacity={0.8}
                  style={
                    deviceName === ''
                      ? styles.connectionButtonWithout
                      : styles.connectionButton
                  }>
                  {deviceName === '' ? (
                    <Text numberOfLines={1} style={styles.buttonText}>
                      {I18n.en.ConnectYourAromeo}
                    </Text>
                  ) : (
                    <>
                      <Text numberOfLines={1} style={styles.buttonText}>
                        {deviceName}
                      </Text>
                      <View style={styles.moreIconButton}>
                        <Image source={constants.Images.MoreDown} />
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              </BlurView>
            ) : (
              //connectionButton1
              <TouchableOpacity
                onPress={moveToConnectionScreen} //navigation.navigate('ConnectionScreen')}
                activeOpacity={0.8}
                style={
                  deviceName === ''
                    ? styles.connectionButtonWithout
                    : styles.connectionButton
                }>
                {deviceName === '' ? (
                  <Text numberOfLines={1} style={styles.buttonText}>
                    {I18n.en.ConnectYourAromeo}
                  </Text>
                ) : (
                  <>
                    <Text numberOfLines={1} style={styles.buttonText}>
                      {deviceName}
                    </Text>
                    <View style={styles.moreIconButton}>
                      <Image source={constants.Images.MoreDown} />
                    </View>
                  </>
                )}
              </TouchableOpacity>
            )}

            <View style={styles.batterySetting}>
              <View style={styles.batteryICON}>
                {deviceName !== '' && (
                  <Image
                    source={changeBatteryIcon == false ? constants.Images.BatteryFullGreen : batteryRed}
                    resizeMode="contain"
                  />
                )}
                {/* <Image
                  source={constants.Images.BatteryLow}
                  resizeMode="contain"
                /> */}
              </View>
              <TouchableOpacity
                style={styles.settingBatteryIcon}
                onPress={() =>
                 
                 soundLoading == true ? navigation.navigate('DeviceSettings', {peripherals}) : null
                }>
                {deviceName !== '' && (
                  <Image
                    source={constants.Images.DeviceSetting}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.deviceStatusWrapper}>
            {deviceName !== '' &&
              (diffusionStatus === 49 ? (
                <View style={[styles.deviceStatusLight, styles.greenLight]} />
              ) : (
                <View style={[styles.deviceStatusLight, styles.grayLight]} />
              ))}

            {deviceName !== '' &&
              (diffusionStatus === 49 ? (
                <Text style={styles.deviceStatusText}>{I18n.en.Diffusing}</Text>
              ) : (
                <Text style={styles.deviceStatusText}>Not Diffusing</Text>
              ))}
          </View> */}
        </View>
        <View style={styles.flex1}>
          <View style={styles.flex1} />
          <View style={styles.relaxTypeContainer}>
            <BlurRoundButton
              icon={constants.Images.FocusImageIcon}
              iconName={'Focus'}
              onPressIcon={(iconName) => onPressIcon(iconName)}
            />
            <BlurRoundButton
              icon={constants.Images.RelexImageIcon}
              iconName={'Relax'}
              onPressIcon={(iconName) => onPressIcon(iconName)}
            />
            <BlurRoundButton
              icon={constants.Images.SleepImageIcon}
              iconName={'Sleep'}
              onPressIcon={(iconName) => onPressIcon(iconName)}
            />
          </View>
        </View>
      </LinearGradient>
      <InitialModal
        modalVisible={initialModal}
        closeModal={toggleInitialModal}
        navigation={navigation}
        openSound={openSound}
      />
      <SelectDeviceModal
        visible={modalVisible}
        data={allDevice}
        selectDevice={selectDevice}
        hideModal={() => {
          setModalVisible(false);
          sound1.setNumberOfLoops(10).play(() => {
            sound1.release();
          });
          setSoundLoading(true);
        }}
        openConnectionScreen={openConnectionScreen}
      />

      <ExitAlert
        modalVisible={reconnectModal}
        title={'Device disconnected'}
        // btn2Color={styles.warningRedBg}
        messageText={''}
        Button1Text={'Back'}
        Button2Text={'Reconnect'}
        closeModal={() => {
          closeReconnect();
        }}
        exitConfirm={() => reconnect()}
      />
      {modalOpened == false ? (
        <ExitAlert
          modalVisible={logoutModal}
          title={
            "Your account has been logged in another device. Please reset your password if you don't know this action."
          }
          btn1Color={styles.btn1Color}
          messageText={''}
          Button1Text={'Ok'}
          numberofButton={1}
          closeModal={() => {
            setLogoutModal(false);
            setModalOpened(true);
            setDeviceName('');
            deviceNameRef.current =""
          }}
          // exitConfirm={() => reconnect()}
        />
      ) : null}
      {/* </ImageBackground> */}
    </View>
  );
};

export default connect(
  (state) => ({
    systemSound: state.app.systemSound,
    led: state.app.led,
    diffusion: state.app.diffusion,
  }),
  {...AppActionTypes},
)(HomeScreen);
