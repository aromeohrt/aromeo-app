import React from 'react';
import { View, Text, Image, FlatList, SafeAreaView } from 'react-native';
import styles from './style';
import {
  HeaderWithTitle,
  GuidePages
} from '../../components';
import constants from '../../constants';
import I18n from '../../utilities/locale';
const SCREEN_DATA = [
  {
    image: constants.Images.ConnectPhone,
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
]

let howToConnect = (props) => {
  let { navigation } = props

  const BackButton = () => {
    navigation.goBack()
  }

  const renderItem = (item) => {
    return (
      <GuidePages
        image={item.image}
        step={item.step}
        onTop={true}
        showSteps={true}
        title={item.title}
        onPressFunction={this.searchingDeviceFunction}
      />
    )
  }

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'How To Connect'}
      />
      <FlatList
        data={SCREEN_DATA}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.step}
      />
    </View>
  );
};

export default howToConnect;
