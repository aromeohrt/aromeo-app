import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import styles from './style';
import BlurBackground from '../BlurBackground';
import AsyncStorage from '@react-native-community/async-storage';
import BlurRectangleButton from '../BlurRectangleButton';
import ExitAlert from '../AlertExitModal';
import Picker from '../Picker';
import constants from '../../constants';

type Props = {
  modalVisible: boolean,
  closeModal: Object,
  backgroundImage: String
};

const SelectTimer = ({
  modalVisible,
  closeModal,
  backgroundImage,
  saveTimer,
  timer,
  theme,
  tintColor
}: Props) => {
  const [selectedItem, setItem] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setItem(timer === 60 ? 3 : timer === 45 ? 2 : timer === 30 ? 1 : 0)
  }, [timer]);

  const onItemSelected = (selectedIndex) => {
    setItem(selectedIndex);
  };

  const saveTime = () => {
    let select = selectedItem === 0 ? 15: selectedItem === 1 ? 30 : selectedItem === 2 ? 45 : 60
    saveTimer(select)
    AsyncStorage.setItem(theme, select.toString())
    closeModal();
    setShowAlert(false);
  };

  const closeModalOnPress = () => {
    let selected = selectedItem === 0 ? 15 : selectedItem === 1 ? 30 : selectedItem === 2 ? 45 : 60
    if (timer !== selected) {
      console.warn("in here")
      setShowAlert(true);
    } else {
      closeModal();
      setShowAlert(false);
    }
  };
 
  return (
    <Modal
      animationType={'fade'}
      animated
      transparent
      visible={modalVisible}
      onRequestClose={closeModalOnPress}>
      <BlurBackground backgrounImage={backgroundImage} extradark={true}>
        <View style={styles.container}>
          <View style={styles.crossBtnWrapper}>
            <TouchableOpacity activeOpacity={0.8} onPress={closeModalOnPress}>
              <Image
                style={[styles.crossBtn,{ tintColor:'#ffffff'}]}
                resizeMode={'cover'}
                source={constants.Images.CrossBtn}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.backgroundImageContainer}>
            <Text style={styles.headingText}>How long are you staying?</Text>
            <Text style={styles.headingTitleText}>
              Choose the duration of music and aroma*.
            </Text>
            <View style={{ marginTop: '14%', justifyContent: 'center' }}>
              <Picker
                dataSource={[
                  '15',
                  '30',
                  '45',
                  '60',
                ]}
                selectedIndex={selectedItem}
                onValueChange={(data, selectedIndex) => {
                  onItemSelected(selectedIndex)
                }}
                wrapperHeight={200}
                wrapperWidth={160}
                wrapperBackground={'transparent'}
                itemHeight={62}
                highlightColor={'white'}
                highlightBorderWidth={1}
                itemTextStyle={{ fontSize: 18, lineHeight: 26, textAlign: 'center', color: 'white', fontFamily: 'Montserrat-Medium' }}
                activeItemTextStyle={{ fontSize: 23, lineHeight: 26, textAlign: 'center', color: '#ffffff', fontFamily: 'Montserrat-Medium' }}
              />
              <Text style={styles.AndroidMin}>min</Text>
            </View>
          </View>
          <View style={styles.bottomWrapper}>
            <Text style={styles.requredText}>
              *Aromeo products are required.
            </Text>
            <BlurRectangleButton
              title={'Save'}
              onPressIcon={() => saveTime()}
            />
          </View>
        </View>
        <ExitAlert
          modalVisible={showAlert}
          title={'Do you want to save your settings before you exit?'}
          messageText={''}
          Button1Text={'Back'}
          Button2Text={'Save'}
          closeModal={() => setShowAlert(false)}
          exitConfirm={saveTime}
        />
      </BlurBackground>
    </Modal>
  );
};

export default SelectTimer;
