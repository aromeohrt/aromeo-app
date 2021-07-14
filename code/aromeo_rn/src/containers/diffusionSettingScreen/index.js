import React, { useState, useEffect, useRef ,useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  Switch,
  NativeModules,NativeEventEmitter,
  AppState
} from 'react-native';
import styles from './style';
import {
  HeaderWithTitle,
  ExitAlert
} from '../../components';
import constants from '../../constants';
import {useFocusEffect} from '@react-navigation/native';
import * as AppActionTypes from '../../actions/app-actions-types';
import { stringToBytes } from "convert-string";
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import BleManager from 'react-native-ble-manager';
import { BluetoothStatus } from 'react-native-bluetooth-status';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
type Props = {
  navigation: Object,
};
var disconnectStateListener;
const ScreenWidth = Dimensions.get('window').width;

const DiffusionSettingScreen = (props) => {
  let { navigation } = props
  let [selectedTab, setTab] = useState(0);
  let [selectedIntensity, setSelectedIntensity] = useState(10);
  let [connectedDevice, setConnectedDevice] = useState('');
  let [reconnectModal, setReconnectModal] = useState(false);
  let [light,setLight]=useState(true)
  let [deviceId, setDeviceId] = useState('aromeoalpha001');
  let [intensity, setIntensity] = useState([
    {
      time: 10,
      selected: true,
      imageLink: constants.Images.Intensity,
    },
    {
      time: 15,
      selected: false,
      imageLink: constants.Images.IntensityMed,
    },
    {
      time: 20,
      selected: false,
      imageLink: constants.Images.IntensityHigh,
    },
  ]);
  let scrollViewRef = useRef();

  let scrollValues = () => {
    if (selectedTab === 0)
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true })
    else
      scrollViewRef.current?.scrollToEnd({ animated: true })
  }



  useFocusEffect(
    useCallback(() => {
      AppState.addEventListener('change', handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    }, []),
  );


  const handleAppStateChange =async (currentAppState) => {
    if (navigation.isFocused()) {
     
      if (currentAppState == 'active') {  
        if(Platform.OS=="ios"){
          const isEnabled = await BluetoothStatus.state();
          reconnectFunction(isEnabled)
         
        }
      }
    }
  };


  const reconnectFunction=async(value)=>{
    if(value == false){
      setReconnectModal(true)
      await AsyncStorage.removeItem('deviceData')
      await AsyncStorage.removeItem("Light")
 
    } 
  }



  useEffect(() => {

    const unsubscribe = navigation.addListener('focus',async () => {
      AsyncStorage.getItem('deviceData').then((deviceData) => {
        const devicedata11 = JSON.parse(deviceData);
        setConnectedDevice(devicedata11)
      });
      const id = await AsyncStorage.getItem("deviceID")
      setDeviceId(id)
        disconnectStateListener = bleManagerEmitter.addListener("BleManagerDisconnectPeripheral",async (arg) => { 
         await AsyncStorage.removeItem('deviceData')
         await AsyncStorage.removeItem("Light")
    
          setReconnectModal(true)    
        });
      })
      return unsubscribe;
   
  }, []);


  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      disconnectStateListener.remove()
      // if(Platform.OS=="ios"){
      //   BluetoothStatus.removeListener()
      //  }
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    intensity = intensity.map((item, i) => {
      if (item.time === props.diffusionInten) {
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    setIntensity(intensity)
  }, [props.diffusionInten]);

  const TabContainer = () => {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => {
            setTab(0)
            scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true })
          }}
          style={[
            styles.tabHeadingContainer,
            selectedTab === 0 && styles.selectedTab,
          ]}>
          <Text style={[styles.headingTitleText, selectedTab === 0 && styles.mediumFont]}>Aroma</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab(1)
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }}
          style={[
            styles.tabHeadingContainer,
            selectedTab === 1 && styles.selectedTab,
          ]}>
          <Text style={[styles.headingTitleText, selectedTab === 1 && styles.mediumFont]}>Light</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const IntensityContainer = () => {
    const updateDiffuserIntensity = () => {
      BleManager.retrieveServices(connectedDevice.id).then(
        (peripheralInfo) => {
          var service = '1d85df88-8b57-4c49-89e2-fa80e020c04e';
          var characteristicUUID =
            '34dc1c36-2e36-4aa5-a480-5d0929a6bd47';

          let stringData = "00001 00600"
          if (selectedIntensity === 15)
            stringData = "00002 00900"
          else if (selectedIntensity === 20)
            stringData = "00003 01200"
          let data = stringToBytes(stringData);

          setTimeout(() => {
            BleManager.write(
              connectedDevice.id,
              service,
              characteristicUUID,
              data,
            ).then(() => {
            });
          }, 500);
        },
      );
    }

    const intensityClicked = (index) => {
      updateDiffuserIntensity()
      intensity = intensity.map((item, i) => {
        if (index === i) {
          setSelectedIntensity(item.time);
          props.saveDiffusionInten(item.time)
          return {
            ...item,
            selected: true,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      });
      setIntensity(intensity);
    };

    return (
      <View style={styles.outerContainer}>
        <View style={[styles.intensityContainer, styles.commonBorder]}>
          <Text style={styles.headingTitleText}>Intensity</Text>
          <View style={[styles.tabContainer, styles.fullWidth]}>
            {intensity.map((item, index) => (
              <TouchableOpacity
                onPress={() => intensityClicked(index)}
                key={index}
                style={[
                  styles.imageWrapper,
                  item.selected ? styles.brandPurple : styles.brandPurpleBorder,
                ]}>
                <Image
                  style={
                    item.selected ? { tintColor: 'white' } : { tintColor: '#6775ac' }
                  }
                  resizeMode={'cover'}
                  source={item.imageLink}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.headingTitleText, styles.fullWidth]}>
            {selectedIntensity} mins diffusion, 5 mins pause cycle
        </Text>
        </View>
      </View>
    );
  };

  toggleMoodLight = () => {
    BleManager.retrieveServices(connectedDevice.id).then(
     async (peripheralInfo) => {
        var service = '1d85df88-8b57-4c49-89e2-fa80e020c04e';
        var characteristicUUID =
          'ee5f11f1-bd3a-4a3c-81ff-10b8d475f302';
        // var stringData
      //   console.warn("Here ", props.diffusion,light)
      //   if(props.diffusion == true){
      //     await AsyncStorage.setItem("Diffusion","true")
      //   }
      //  else {
      //   await AsyncStorage.setItem("Diffusion","false")
      //  }
        // if (props.diffusion) {
        //   console.warn("in true",light)
        //   if (light)
        //     stringData = "1 1 1"
        //   else
        //     stringData = "1 0 1"
        // } else {
        //   console.warn("in false",light)
        //   if (light)
        //     stringData = "0 1 1"
        //   else
        //     stringData = "0 0 1"
        // }
        // if (light)
        //     stringData = "1 1 1"
        //   else
        //     stringData = "1 0 1"
        // let data = stringToBytes(stringData);
        //   console.warn(data,"Data in diffusion")
        setTimeout(() => {
        //   BleManager.read(connectedDevice.id, service, characteristicUUID)
        //     .then(async (readData) => {
        //       // Success code
        //   BleManager.write(
        //     connectedDevice.id,
        //     service,
        //     characteristicUUID,
        //     data,
        //   ).then(() => {
        //   });

        BleManager.read(connectedDevice.id, service, characteristicUUID)
        .then(async (readData) => {
          // Success code
          var stringData;
          if(readData[0]==49){
            if (light)
            stringData = "1 1 1"
          else
            stringData = "1 0 1"
          }
          else {
            if(light){
              stringData = "0 1 1"
            }
            else {
              stringData = "0 0 1"
            }
          }
      let data = stringToBytes(stringData);
       
          BleManager.write(
            connectedDevice.id,
            service,
            characteristicUUID,
            data,
          ).then(() => {
          });
        })
        .catch((error) => {
        });
        }, 500);
      },
    );
  }

  const LightContainer = () => {
    let { led, diffusion } = props
    const toggleLight =async () => {
      if (led)
        {props.ledOff()
          setLight(false)
await AsyncStorage.setItem("Light","false")
        // console.warn("Called off")
      }
      else
       { props.ledOn()
        setLight(true)
        await AsyncStorage.setItem("Light","true")
        // console.warn("Called on")
      }
      toggleMoodLight()
    }


    
    return (
      <View style={styles.outerContainer}>
        <View style={[styles.intensityContainer, styles.commonBorder]}>
          <View style={[styles.switchContainer, styles.fullWidth]}>
            <Text style={styles.headingTitleText}>Light</Text>
            <View
              style={[
                styles.switch,
                led ? styles.brandPurple : styles.lightBackground,
              ]}>
              <Switch
                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                trackColor={{ true: '#6775ac', false: '#d3d3d5' }}
                thumbColor='#ffffff'
                ios_backgroundColor={
                  led ? '#6775ac' : '#d3d3d5'
                }
                onValueChange={() => toggleLight()}
                value={led}
              />
            </View>
          </View>

          <Text style={[styles.headingTitleText, styles.fullWidth]}>
            Light will be {led ? 'on' : 'off'} when diffusing.
        </Text>
        </View>
      </View>
    );
  };

  const BackButton = () => {
    navigation.goBack()
  }

  let handleScroll = event => {
    let x = event.nativeEvent.contentOffset.x
    if (x >= ScreenWidth)
      setTab(1)
    else
      setTab(0)
  }


  const reconnect = ()=>{
    setReconnectModal(false)
    navigation.replace("ConnectionScreen")
   }
   
   
   const closeReconnect =async ()=>{
     await setReconnectModal(false)
     navigation.replace("HomeScreen")
    }


  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'Diffusion Settings'}
        iconColor={'black'}
      />
      <TabContainer />
      <View>
        <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollValues()}
          onMomentumScrollEnd={handleScroll}>
          <IntensityContainer />
          <LightContainer />
        </ScrollView>
      </View>
      <ExitAlert
        modalVisible={reconnectModal}
        title={
          'Device is disconnected'
        }
        // btn2Color={styles.warningRedBg}
        messageText={''}
        Button1Text={'Back'}
        Button2Text={'Reconnect'}
        closeModal={() => {closeReconnect()}}
        exitConfirm={() => reconnect()}
      />
    </View>
  );
};


export default connect(
  state => ({
    led: state.app.led,
    diffusion: state.app.diffusion,
    diffusionInten: state.app.diffusionInten
  }),
  { ...AppActionTypes }
)(DiffusionSettingScreen);
