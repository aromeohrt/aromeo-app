//import liraries
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  AppState,
  NativeModules,NativeEventEmitter
} from 'react-native';
import constants from '../../constants';
import {HeaderWithTitle, ExitAlert} from '../../components';
import {connect} from 'react-redux';
import * as AppActionTypes from '../../actions/app-actions-types';
import styles from './style';
import BleManager from 'react-native-ble-manager';
import {BluetoothStatus} from 'react-native-bluetooth-status';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
type Props = {
  navigation: Object,
};

// create a component
const ModeButtonSettings = ({navigation, timer, saveTimer}: Props) => {
  let [reconnectModal, setReconnectModal] = useState(false);
  let [deviceId, setDeviceId] = useState('aromeoalpha001');
  let [timing, setTiming] = useState([
    {
      value: 15,
      selected: false,
    },
    {
      value: 30,
      selected: false,
    },
    {
      value: 45,
      selected: true,
    },
    {
      value: 60,
      selected: false,
    },
  ]);

  const timingClicked = (index) => {
    timing = timing.map((item, i) => {
      if (index === i) {
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
    saveTimer(timing[index].value);
    setTiming(timing);
  };

  const BackButton = () => {
    navigation.goBack();
  };

  const Options = (props) => {
    return (
      <TouchableOpacity
        style={[
          styles.optionContainer,
          styles.optionBorder,
          props.selected && styles.brandPurple,
        ]}
        onPress={() => timingClicked(props.index)}>
        <View style={styles.optionTextWrapper}>
          <Text
            style={[
              styles.nameText,
              props.selected ? styles.textWhite : styles.textDarkBlue,
            ]}>
            {props.text} min
          </Text>
        </View>
        {props.selected && <Image source={constants.Images.CellSelect} />}
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      AppState.addEventListener('change', handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    }, []),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // if(Platform.OS== "ios"){
      //   BluetoothStatus.addListener(blueToothStatus)
      // }
      const id = await AsyncStorage.getItem("deviceID")
      setDeviceId(id)
      timing = timing.map((item, i) => {
        if (timer === item.value) {
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
      setTiming(timing);
      disconnectStateListener = bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        async (arg) => {
          await AsyncStorage.removeItem('deviceData');
          setReconnectModal(true);
        },
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      disconnectStateListener.remove();
      // if(Platform.OS=="ios"){
      //   BluetoothStatus.removeListener()
      //  }
    });

    return unsubscribe;
  }, [navigation]);

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
      await AsyncStorage.removeItem("Light")
     
    }
  };

  const reconnect =async () => {
    setReconnectModal(false)
    navigation.replace('ConnectionScreen');
    await AsyncStorage.removeItem('deviceData');
    await AsyncStorage.removeItem("Light")
    
  };

  const closeReconnect = async () => {
    await setReconnectModal(false);
    navigation.replace('HomeScreen');
    await AsyncStorage.removeItem('deviceData');
    await AsyncStorage.removeItem("Light")
   
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'Mode Button Settings'}
        iconColor={'black'}
      />
      {timing.map((item, index) => (
        <Options
          text={item.value}
          image={item.imageUrl}
          selected={item.selected}
          index={index}
        />
      ))}

      <ExitAlert
        modalVisible={reconnectModal}
        title={'Device is disconnected'}
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
    timer: state.app.timer,
  }),
  {...AppActionTypes},
)(ModeButtonSettings);
