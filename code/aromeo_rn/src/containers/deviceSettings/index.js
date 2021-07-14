//import liraries
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  NativeModules,
  NativeEventEmitter,
  Platform,
  AppState,
} from 'react-native';
import constants from '../../constants';
import I18n from '../../utilities/locale';
import {connect} from 'react-redux';
import * as AppActionTypes from '../../actions/app-actions-types';
import BleManager from 'react-native-ble-manager';
import {BluetoothStatus} from 'react-native-bluetooth-status';
import {useFocusEffect} from '@react-navigation/native';
import batteryRed from '../../assets/images/batteryRed.png'
import {HeaderWithTitle, RectangleButton, ExitAlert} from '../../components';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

type Props = {
  navigation: Object,
};
var disconnectStateListener;
// create a component
const DeviceSettings = ({
  route,
  navigation,
  diffusion,
  saveConnectionStatus,
}: Props) => {
  let [deviceName, setDeviceName] = useState('Aromeo Alpha');
  let [deviceId, setDeviceId] = useState('aromeoalpha001');
  let [disconnectModal, setDisconnectModal] = useState(false);
  let [reconnectModal, setReconnectModal] = useState(false);
  let [disconnected, setDisconnected] = useState(false);
  let [batttery,setBattery] = useState(0)
  let [changeBatteryIcon,setChangeBatteryIcon]= useState(false)
  useEffect(() => {
    setDeviceName(route.params.peripherals.name);
    setDeviceId(route.params.peripherals.id);
    var service = '1D85DF88-8B57-4C49-89E2-FA80E020C04E';
    var characteristicUUID = 'bfebc03c-b717-4df1-b294-d1dec74bf9ec';
    setTimeout(() => {
      BleManager.read(route.params.peripherals.id, service, characteristicUUID)
        .then((readData) => {
          const buffer = new Uint8Array(readData).buffer;
          let batteryLevel = hex_to_ascii(buf2hex(buffer))
          let split = batteryLevel.split(" ")
          let level = parseInt(split[3])
          if(level <=20){
            setChangeBatteryIcon(true)
          }
     
          setBattery(level)
        })
        .catch((error) => {
          console.warn(error, 'NOTIFICATION ERROR');
        });
    }, 200);
  }, []);

  useFocusEffect(
    useCallback(() => {
      AppState.addEventListener('change', handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    }, []),
  );

  const handleAppStateChange = async (currentAppState) => {
    if (navigation.isFocused()) {
      if (currentAppState == 'active') {
        if (Platform.OS == 'ios') {
          const isEnabled = await BluetoothStatus.state();
          reconnectFunction(isEnabled);
        }
      }
    }
  };

  const reconnectFunction = async (value) => {
    if (value == false) {
      setReconnectModal(true);
      await AsyncStorage.removeItem('deviceData');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      disconnectStateListener = bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        async (arg) => {
          if (disconnected !== true) {
            setReconnectModal(true);
          }
          await AsyncStorage.removeItem('deviceData');
        },
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      saveConnectionStatus(true);
      setReconnectModal(false);
      disconnectStateListener.remove();
    });

    return unsubscribe;
  }, [navigation]);

  if (Platform.OS == 'android') {
    useEffect(() => {
      disconnectStateListener = bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        async (arg) => {
          setReconnectModal(false);
          await AsyncStorage.removeItem('deviceData');
        },
      );
    }, [disconnected]);
  }

  const navigateTo = (type) => {
    if (type === 'Diffusion Settings')
      navigation.navigate('DiffusionSettingScreen');
    if (type === 'Mode Button Settings')
      navigation.navigate('ModeButtonSettings');
  };

  const BackButton = () => {
    navigation.goBack();
  };

  const Divider = () => {
    return <View style={styles.divider} />;
  };

  const Options = (props) => {
    let component = null;
    let borderStyle = null;
    if (props.text === 'Device Name') {
      borderStyle = styles.optionBorder;
      component = (
        <Text
          style={[styles.nameText, styles.brandPurple, styles.nameTextWidth]}
          numberOfLines={1}>
          {deviceName}
        </Text>
      );
    } else if (props.text === 'Device ID')
      component = (
        <Text
          style={[styles.nameText, styles.brandPurple, styles.nameTextWidth]}
          numberOfLines={1}>
          {deviceId}
        </Text>
      );
    else if (props.text === 'Diffusion Settings') {
      borderStyle = styles.optionBorder;
      component = <Image source={props.image} style={styles.profileImage} />;
    } else
      component = <Image source={props.image} style={styles.profileImage} />;

    return (
      <TouchableOpacity
        style={[styles.optionContainer, borderStyle]}
        onPress={() => navigateTo(props.text)}>
        <Text style={[styles.nameText, styles.textDarkBlue]}>{props.text}</Text>
        <View style={styles.optionTextWrapper}>{component}</View>
      </TouchableOpacity>
    );
  };

  const disconnect = async () => {
    // setDisconnected(true);
    await AsyncStorage.removeItem('Light');
    await AsyncStorage.removeItem('deviceData');
    BleManager.disconnect(deviceId)
      .then(() => {
        setDisconnected(true);
        setDisconnectModal(false);
        setReconnectModal(false);
        navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        // Failure code
        setReconnectModal(false);
        setDisconnected(true);
        setDisconnectModal(false);
        navigation.goBack();
        alert(error);
      });
  };

  const reconnect = () => {
    setReconnectModal(false);
    navigation.replace('ConnectionScreen');
  };

  const closeReconnect = async () => {
    await setReconnectModal(false);
    navigation.goBack();
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

  // useEffect(() => {
  //   console.warn('in useeffecr',deviceId);
  //   // BleManager.retrieveServices(deviceId)
  //   //   .then((readData) => {
  //   //     console.warn(readData, 'in retrice');
       
  //     // })
  //     // .catch((err) => {
  //     //   console.warn(err, 'Error');
  //     // });
  // }, [deviceId]);

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'Device Settings'}
        iconColor={'black'}
      />
      <View style={styles.batteryContainer}>
        <Image
          source={constants.Images.Diffuser}
          style={styles.diffuserImage}
        />
        <View>
          <View style={styles.batteryContainer}>
            <Text
              style={[styles.forgotText, styles.textDarkBlue]}
              numberOfLines={1}>
              {deviceName}
            </Text>
            {/* <View style={styles.deviceStatusWrapper}>
              <View style={[styles.deviceStatusLight, diffusion ? styles.greenLight: styles.grayLight]} />
              <Text style={[styles.deviceStatusText, diffusion ? styles.greenText: styles.grayText]}>{diffusion ? I18n.en.Diffusing: 'Not Diffusing'}</Text>
            </View> */}
          </View>
          <View style={styles.batteryContainer}>
            <Image
              source={ changeBatteryIcon == false ? constants.Images.BatteryFullGreen : batteryRed}
              style={styles.batteryImage}
            />
            <Text style={[styles.nameText, styles.textDarkBlue]}>{batttery}%</Text>
          </View>
        </View>
      </View>
      <Divider />
      <Options text="Diffusion Settings" image={constants.Images.MoreRight} />
      <Options text="Mode Button Settings" image={constants.Images.MoreRight} />
      <Divider />
      <Options text="Device Name" />
      <Options text="Device ID" />
      <Divider />
      <View style={{justifyContent: 'flex-end', flex: 1, paddingBottom: 27}}>
        <RectangleButton
          title={'Disconnect'}
          onPressButton={() => {
            setDisconnectModal(true);
            setDisconnected(true);
          }}
          blueButton={false}
          addBorder={true}
        />
      </View>
      <ExitAlert
        modalVisible={disconnectModal}
        title={'Are you sure you want to disconnect?'}
        btn2Color={styles.warningRedBg}
        messageText={''}
        Button1Text={'Cancel'}
        Button2Text={'Disconnect'}
        closeModal={() => setDisconnectModal(false)}
        exitConfirm={() => {
          disconnect();
          setDisconnected(true);
        }}
      />

      <ExitAlert
        modalVisible={reconnectModal}
        title={deviceName + ' is disconnected'}
        // btn2Color={styles.warningRedBg}
        messageText={''}
        Button1Text={'Back'}
        Button2Text={'Reconnect'}
        closeModal={() => {
          closeReconnect();
        }}
        exitConfirm={() => reconnect()}
      />
    </View>
  );
};

//make this component available to the app
export default connect(
  (state) => ({
    diffusion: state.app.diffusion,
  }),
  {...AppActionTypes},
)(DeviceSettings);
