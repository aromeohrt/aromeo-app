import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Switch,
  Dimensions,
  Platform,
} from 'react-native';
import styles from './style';
import BlurBackground from '../BlurBackground';
import constants from '../../constants';
import * as AppActionTypes from '../../actions/app-actions-types';
import {stringToBytes} from 'convert-string';
import {connect} from 'react-redux';
import BleManager from 'react-native-ble-manager';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {
  modalVisible: boolean,
  closeModal: Object,
  backgroundImage: String,
};

const ScreenWidth = Dimensions.get('window').width;

const SettingModal = (props) => {
  let {modalVisible, closeModal, backgroundImage, device} = props;
  let [selectedTab, setTab] = useState(0);
  let [selectedIntensity, setSelectedIntensity] = useState(10);
  let [connectedDevice, setConnectedDevice] = useState('');
  let [light,setLight]=useState(true)
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
      scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false});
    else
     scrollViewRef.current?.scrollToEnd({animated: false});
  };

  useEffect(() => {
    setTab(props.selectedTab);
    scrollValues();
  }, [props.selectedTab]);

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
    setIntensity(intensity);
  }, [props.diffusionInten]);

  useEffect(() => {
    setConnectedDevice(device.params.peripherals);
  }, []);

  const TabContainer = () => {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => {
            setTab(0)
              scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false});
          }}
          style={[
            styles.tabHeadingContainer,
            selectedTab === 0 && styles.selectedTab,
          ]}>
          <Text
            style={[
              styles.headingTitleText,
              selectedTab === 0 && styles.mediumFont,
            ]}>
            Aroma
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab(1)
             scrollViewRef.current?.scrollToEnd({animated: false});
          }}
          style={[
            styles.tabHeadingContainer,
            selectedTab === 1 && styles.selectedTab,
          ]}>
          <Text
            style={[
              styles.headingTitleText,
              selectedTab === 1 && styles.mediumFont,
            ]}>
            Light
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const IntensityContainer = () => {
    const updateDiffuserIntensity = () => {
      BleManager.retrieveServices(connectedDevice.id).then((peripheralInfo) => {
        var service = '1d85df88-8b57-4c49-89e2-fa80e020c04e';
        var characteristicUUID = '34dc1c36-2e36-4aa5-a480-5d0929a6bd47';

        let stringData = '00001 00600';
        if (selectedIntensity === 15) stringData = '00002 00900';
        else if (selectedIntensity === 20) stringData = '00003 01200';
        let data = stringToBytes(stringData);

        setTimeout(() => {
          BleManager.write(
            connectedDevice.id,
            service,
            characteristicUUID,
            data,
          ).then(() => {});
        }, 500);
      });
    };

    const intensityClicked = (index) => {
      updateDiffuserIntensity();
      intensity = intensity.map((item, i) => {
        if (index === i) {
          setSelectedIntensity(item.time);
          props.saveDiffusionInten(item.time);
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
                  item.selected
                    ? styles.whiteBackground
                    : styles.darkBackground,
                ]}>
                <Image
                  style={
                    item.selected
                      ? {tintColor: '#000000B3'}
                      : {tintColor: 'white'}
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
        setTimeout(() => {
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
       }
      else
       { props.ledOn()
        setLight(true)
        await AsyncStorage.setItem("Light","true")
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
                led ? styles.lightBackground : styles.darkBackground,
              ]}>
              <Switch
                style={{transform: [{scaleX: 1}, {scaleY: 1}]}}
                // trackColor={{true: '#fefcfb4d', false: '#00000033'}}
                thumbColor="#ffffff"
                trackColor={{true: Platform.OS=="android"?'transparent':'#fefcfb4d', false: Platform.OS=="android"?'transparent':'#00000033'}}
                // thumbColor="white"
                ios_backgroundColor={led ? '#fefcfb4d' : '#00000033'}
                onValueChange={() => toggleLight()}
                value={led}
              />
           
            </View>
          </View>

          <Text style={[styles.headingTitleText, styles.fullWidth]}>
            Mood light will turn {led ? 'on' : 'off'} during aroma diffusion
          </Text>
        </View>
      </View>
    );
  };

  let handleScroll = (event) => {
    // let x = event.nativeEvent.contentOffset.x

    // if (x = ScreenWidth || x > ScreenWidth){

    //   setTab(1)
    // }

    // else{

    //   setTab(0)
    // }
    if (selectedTab == 1) {
      setTab(0);
    } else if (selectedTab == 0) {
      setTab(1);
    }
  };

  return (
    <Modal
      animationType={'fade'}
      animated
      transparent
      visible={modalVisible}
      onRequestClose={closeModal}>
      <BlurBackground backgrounImage={backgroundImage} extradark={true}>
        <SafeAreaView style={styles.container}>
          <View style={styles.crossBtnWrapper}>
            <TouchableOpacity activeOpacity={0.8} onPress={closeModal}>
              <Image
                style={styles.crossBtn}
                resizeMode={'cover'}
                source={constants.Images.CrossBtn}
              />
            </TouchableOpacity>
          </View>
          <TabContainer />
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              ref={scrollViewRef}
              onContentSizeChange={() => scrollValues()}
              onMomentumScrollEnd={handleScroll}>
              <IntensityContainer />
              <LightContainer />
            </ScrollView>
          </View>
        </SafeAreaView>
      </BlurBackground>
    </Modal>
  );
};

export default connect(
  (state) => ({
    led: state.app.led,
    diffusion: state.app.diffusion,
    diffusionInten: state.app.diffusionInten,
  }),
  {...AppActionTypes},
)(SettingModal);
