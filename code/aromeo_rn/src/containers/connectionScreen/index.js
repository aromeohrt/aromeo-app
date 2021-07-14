import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  AppState,
  FlatList,
  Dimensions,
  Linking,
  SafeAreaView,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import styles from './style';
import constants from '../../constants';
import I18n from '../../utilities/locale';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import AndroidOpenSettings from 'react-native-android-open-settings';
import {BluetoothStatus} from 'react-native-bluetooth-status';
import {
  HeaderWithTitle,
  GuidePageIndicator,
  RectangleButton,
  SingleButtonAlert,
  ExitAlert,
  GuidePages,
  SearchingDevice,
} from '../../components';

const window = Dimensions.get('window');
const SceenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class ConnectionScreen extends Component {
  constructor() {
    super();
    this.state = {
      scanning: false,
      peripherals: new Map(),
      appState: '',
      stepIndex: 0,
      searchingDevice: false,
      bluetoothOFF: false,
      changeDeviceAlert: false,
      resultCome: false,
      loading: false,
      connectAnotherPhoneAlert: false,
      connectedDevice: '',
      introdata: [
        {
          image: constants.Images.ConnectPhone,
          // image : require('../../assets/images/group5.png'),
          step: 1,
          title: I18n.en.CheckPhoneBluetooth,
        },
        {
          image: constants.Images.DeviceTurnOn,
          step: 2,
          title: I18n.en.TurnOnDevice,
        },
        {
          image: constants.Images.CheckDeviceOn,
          step: 3,
          title: I18n.en.ConnectDiffuser,
        },
      ],
      connected: false,
      deviceDisconnected: false,
      responded: false,
      loading: true,
    };

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(
      this,
    );
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(
      this,
    );
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    // this.handleBluetooth = this.handleBluetooth.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 100);
    this.checkBluetooth();
    BluetoothStatus.addListener(this.blueToothStatus);
    this.setState({peripheral: new Map()});
    AsyncStorage.getItem('deviceData').then((deviceData) => {
      const devicedata11 = JSON.parse(deviceData);
      this.setState({connectedDevice: devicedata11}, () => {
        // console.warn('Here in AsyncStorage.getItem');
      });
    });
    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.enableBluetooth()
      .then(() => {
        // Success code
      })
      .catch((error) => {
        // Failure code
        // console.warn('The user refuse to enable bluetooth');
      });
    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral,
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan,
    );
    // this.handlerDisconnect = bleManagerEmitter.addListener(
    //   'BleManagerDisconnectPeripheral',
    //  this.handleDisconnectedPeripheral
    // );
    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic,
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then((result) => {
        if (result) {
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ).then((result) => {
            if (result) {
            } else {
              // console.warn('User refuse');
            }
          });
        }
      });
    }
  }

  blueToothStatus = (status) => {
    this.setState({
      bluetoothOFF: !status,
      searchingDevice: false,
    });
  };

  handleAppStateChange(nextAppState) {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {});
    }
    this.setState({appState: nextAppState});
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    // this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
    BluetoothStatus.removeListener();
  }

  async checkBluetooth() {
    const isEnabled = await BluetoothStatus.state();
    this.setState({bluetoothOFF: !isEnabled});
  }

  handleDisconnectedPeripheral(data) {
    // console.warn("Here in disconnected")
    // // if (peripheral) {
    // //   peripheral.connected = false;
    // //   peripherals.set(peripheral.id, peripheral);
    // //   this.setState({ peripherals,loading : false, resultCome: false, deviceDisconnected : true});
    // // }
    // // this.setState({
    // //   loading : false
    // // },()=>{
    // //   this.noDeviceFound()
    // // })
  }

  handleUpdateValueForCharacteristic(data) {
    // console.warn(
    //   'Received data from ' +
    //     data.peripheral +
    //     ' characteristic ' +
    //     data.characteristic,
    //   data.value,
    // );
  }

  handleStopScan() {
    // console.warn('stop scan');
    // this.setState({scanning: false});
    setTimeout(() => {
      this.setState({resultCome: true, scanning: false});
      // setResultCome(true);
    }, 4000);
  }

  startScan() {
    if (!this.state.scanning) {
      this.setState({peripherals: new Map()});
      BleManager.scan(['1D85DF88-8B57-4C49-89E2-FA80E020C04E'], 10, true).then(
        (results) => {
          this.setState({scanning: false});
        },
      );
    }
  }

  // retrieveConnected() {
  //   console.warn("retrive")
  //   BleManager.getConnectedPeripherals([]).then((results) => {
  //     if (results.length == 0) {
  //     }
  //     var peripherals = this.state.peripherals;
  //     for (var i = 0; i < results.length; i++) {
  //       var peripheral = results[i];
  //       peripheral.connected = true;
  //       peripherals.set(peripheral.id, peripheral);
  //       this.setState({ peripherals });
  //     }
  //   });
  // }

  handleDiscoverPeripheral(peripheral) {
    // console.warn('Here in discover');
    var peripherals = this.state.peripherals;
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripheral.connected = false;
    peripherals.set(peripheral.id, peripheral, peripheral.connected);

    this.setState({peripherals}, () => {
      // console.warn("Discovery", this.state.peripherals)
    });
  }

  storeData = async (value) => {
    // console.warn(value, 'Value');
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('deviceData', jsonValue);
    } catch (e) {
      // console.warn('eerrror', e);
    }
  };

  buf2hex = (buffer) => {
    // buffer is an ArrayBuffer
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2))
      .join('');
  };

  hex_to_ascii = (str1) => {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  };

  test(peripheral) {
    this.setState({
      responded: false,
    });
    // console.warn('Peripheral', peripheral);
    if (peripheral) {
      if (peripheral.connected) {
        BleManager.disconnect(peripheral.id);
        // console.warn('Here in disconnect');
      } else {
        this.setState({loading: true});
        BleManager.connect(peripheral.id)
          .then(() => {
            let peripherals = this.state.peripherals;
            let p = peripherals.get(peripheral.id);
            if (p) {
              p.connected = true;
              peripherals.set(peripheral.id, p);
              this.setState({peripherals});
            }
            this.setState({loading: false, responded: true});
            setTimeout(() => {
              BleManager.retrieveServices(peripheral.id).then(
                (peripheralInfo) => {
                  this.storeData(peripheral);
                  this.setState(
                    {
                      connected: true,
                    },
                    () => {
                      setTimeout(() => {
                        this.setState(
                          {
                            connected: false,
                          },
                          () => {
                            this.props.navigation.navigate('HomeScreen');
                          },
                        );
                      }, 2000);
                    },
                  );
                  var service = '1D85DF88-8B57-4C49-89E2-FA80E020C04E';
                  var characteristicUUID =
                    'bfebc03c-b717-4df1-b294-d1dec74bf9ec';
                  setTimeout(() => {
                    BleManager.read(peripheral.id, service, characteristicUUID)
                      .then((readData) => {
                        const buffer = new Uint8Array(readData).buffer;
                        // console.warn(
                        //   'Started',
                        //   this.hex_to_ascii(this.buf2hex(buffer)),
                        // );
                      })
                      .catch((error) => {
                        // console.warn(error, 'NOTIFICATION ERROR');
                      });
                  }, 200);
                },
              );
            }, 900);
          })
          .catch((error) => {
            this.setState({loading: false}, () => {
              // console.warn(error);
            });
          }),
          setTimeout(() => {
            if (this.state.responded == false) {
              var peripherals = this.state.peripherals;
              peripheral.connected = true;
              peripherals.set(peripheral.id, peripheral, peripheral.connected);
              this.setState({
                deviceDisconnected: true,
                loading: false,
                resultCome: false,
                peripherals,
              });
            }
          }, 15000);
      }
      // }
    }
  }

  searchingDeviceFunction = async () => {
    BleManager.start({showAlert: false});

    const isEnabled = await BluetoothStatus.state();
    this.setState({bluetoothOFF: !isEnabled}, () => {
      if (this.state.bluetoothOFF === false) {
        this.setState({
          searchingDevice: true,
          resultCome: false,
          deviceDisconnected: false,
        });
        this.startScan();
      }
    });
  };
  searchAgainDevice = () => {
    this.setState({resultCome: false});
    this.searchingDeviceFunction();
  };

  BackButton = () => {
    if (this.state.searchingDevice) {
      this.setState({resultCome: false, stepIndex: 0, searchingDevice: false});
    } else {
      this.props.navigation.navigate('HomeScreen');
    }
  };

  _renderItem = ({item, index}) => {
    // console.warn(item,"Image")
    return (
      <View style={{height: ScreenHeight / 2.2}}>
        <GuidePages
          image={item.image}
          step={item.step}
          showSteps={false}
          onPressFunction={this.searchingDeviceFunction}
        />
      </View>
    );
  };

  searchItems(item) {
    let {loading} = this.state;
    return (
      <RectangleButton
        title={item.name}
        loading={loading}
        onPressButton={() => this.test(item)}
        blueButton={false}
        addShadow={true}
        connected={this.state.connected}
      />
    );
  }

  noDeviceFound() {
    return (
      <View style={{height: '100%'}}>
        <GuidePages
          image={constants.Images.NotFindAromeo}
          showSteps={true}
          step={`Oops!`}
          nodeviceFound={true}
          title={'We cannot find Aromeo nearby.'}
          onPressFunction={() => alert('dd')}
        />
      </View>
    );
  }

  render() {
    let {
      searchingDevice,
      resultCome,
      bluetoothOFF,
      stepIndex,
      introdata,
      peripherals,
      scanning,
      connectAnotherPhoneAlert,
      changeDeviceAlert,
      deviceDisconnected,
    } = this.state;
    const list = Array.from(peripherals.values());
    const btnScanTitle = 'Scan Bluetooth (' + (scanning ? 'on' : 'off') + ')';

    return (
      <View style={styles.Flex1}>
        <StatusBar
          hidden={false}
          barStyle="dark-content"
          backgroundColor="white"
        />
        <View style={styles.container}>
          <HeaderWithTitle
            onPressBackButton={this.BackButton}
            title={'Connect Device'}
          />
          {searchingDevice ? (
            <View style={styles.Flex1}>
              {resultCome === true ? (
                <View style={{flex: 1, marginTop: 40}}>
                  {list.length > 0 && (
                    <Text style={styles.selectText}>
                      Select Your Aromeo Diffuser
                    </Text>
                  )}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      marginTop: 45,
                    }}>
                    <FlatList
                      data={list}
                      renderItem={({item}) => this.searchItems(item)}
                      keyExtractor={(item) => item.id}
                      ListEmptyComponent={this.noDeviceFound}
                    />
                  </View>
                  <View style={{paddingBottom: 27}}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        this.props.navigation.navigate('HowToConnect')
                      }>
                      <Text style={styles.notFoundText}>
                        Couldn’t find your device?
                      </Text>
                    </TouchableOpacity>
                    <RectangleButton
                      title={'Search Again'}
                      onPressButton={this.searchAgainDevice} //Linking.openURL('app-settings:') this is for open app setting
                      blueButton={true}
                    />
                  </View>
                </View>
              ) : bluetoothOFF === true ? (
                <View style={styles.container}>
                  <GuidePages
                    image={constants.Images.ConnectPhone}
                    headingText={'Turn on Phone Bluetooth'}
                    showSteps={false}
                    title={I18n.en.CheckPhoneBluetooth}
                    onPressFunction={() => alert('dd')}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 35,
                      left: 0,
                      right: 0,
                    }}>
                    <RectangleButton
                      title={'Go To Settings'}
                      onPressButton={() => {
                        if (Platform.OS === 'ios') Linking.openSettings();
                        else AndroidOpenSettings.generalSettings();
                      }} //Linking.openURL('app-settings:') this is for open app setting
                      blueButton={true}
                    />
                  </View>
                </View>
              ) : deviceDisconnected == true ? (
                <View style={styles.container}>
                  <View
                    style={{
                      flex: 1,
                      // height:'50%',
                      // width:'100%',
                      // backgroundColor:'red',
                      justifyContent: 'center',
                      marginTop: 45,
                      // alignItems: 'center',
                    }}>
                    <GuidePages
                      image={constants.Images.NotFindAromeo}
                      showSteps={true}
                      step={`Oops!`}
                      nodeviceFound={true}
                      title={'Could not connect to Aromeo.'}
                      onPressFunction={() => alert('dd')}
                    />
                  </View>
                  <View style={{paddingBottom: 27}}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        this.props.navigation.navigate('HowToConnect')
                      }>
                      <Text style={styles.notFoundText}>
                        Couldn’t find your device?
                      </Text>
                    </TouchableOpacity>
                    <RectangleButton
                      title={'Search Again'}
                      onPressButton={this.searchingDeviceFunction} //Linking.openURL('app-settings:') this is for open app setting
                      blueButton={true}
                    />
                  </View>
                </View>
              ) : (
                <SearchingDevice />
              )}
            </View>
          ) : (
            <>
              {bluetoothOFF === true ? (
                <View style={styles.container}>
                  <GuidePages
                    image={constants.Images.ConnectPhone}
                    headingText={'Turn on Phone Bluetooth'}
                    showSteps={false}
                    title={I18n.en.CheckPhoneBluetooth}
                    onPressFunction={() => alert('dd')}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 35,
                      left: 0,
                      right: 0,
                    }}>
                    <RectangleButton
                      title={'Go To Settings'}
                      onPressButton={() => {
                        if (Platform.OS === 'ios') Linking.openSettings();
                        else AndroidOpenSettings.generalSettings();
                      }} //Linking.openURL('app-settings:') this is for open app setting
                      blueButton={true}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.container}>
                  <View
                    style={{
                      position: 'absolute',
                      top: ScreenHeight / 2.2 + 15,
                      alignSelf: 'center',
                      width: '100%',
                    }}>
                    <GuidePageIndicator stepIndex={stepIndex} />
                    <View style={styles.stepTextContainer}>
                      <Text style={[styles.titleText, styles.TextCenter]}>
                        {`STEP ${stepIndex + 1}:`}
                      </Text>
                      <Text style={styles.DescriptionText}>
                        {introdata[stepIndex].title}
                      </Text>
                    </View>
                  </View>
                  {this.state.loading == false ? (
                    <>
                      <Carousel
                        layout={'default'}
                        bounces={false}
                        data={introdata}
                        // firstItem={stepIndex}
                        renderItem={this._renderItem}
                        sliderWidth={SceenWidth}
                        itemWidth={SceenWidth}
                        removeClippedSubviews={false}
                        onSnapToItem={(index) =>
                          this.setState({stepIndex: index})
                        }
                      />
                      <View
                        style={{
                          paddingBottom: 35,
                        }}>
                        <RectangleButton
                          title={'Start Searching'}
                          onPressButton={this.searchingDeviceFunction} //Linking.openURL('app-settings:') this is for open app setting
                          blueButton={true}
                        />
                      </View>
                    </>
                  ) : null}
                </View>
              )}
            </>
          )}
        </View>
        <SingleButtonAlert
          modalVisible={connectAnotherPhoneAlert}
          closeModal={() => this.setState({connectAnotherPhoneAlert: false})}
        />
        <ExitAlert
          modalVisible={changeDeviceAlert}
          title={
            'You are already connected to a device. Are you sure you want to connect to another one?'
          }
          messageText={''}
          Button1Text={'OK'}
          Button2Text={'Back'}
          closeModal={() => this.setState({changeDeviceAlert: false})}
          exitConfirm={() => this.setState({changeDeviceAlert: false})}
        />
      </View>
    );
  }
}
