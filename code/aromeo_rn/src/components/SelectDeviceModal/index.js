import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import constants from '../../constants';
import styles from './style';

type Props = {
  visible: boolean,
  hideModal: Object,
  data: Object,
  openConnectionScreen: Object,
  selectDevice: Object,
};
const SelectDeviceModal = ({
  visible,
  hideModal,
  openConnectionScreen,
  data,
  selectDevice,
}: Props) => {
  return (
    <Modal animationType={'none'} transparent visible={visible}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={hideModal}
          style={styles.flex1}
        />
        <View activeOpacity={0.9} style={styles.modalSubContainer}>
          <View style={styles.cardHeaderView}>
            <Text style={styles.textStyle}>Select Device</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.deviceID}
            extraData={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => selectDevice(item)}
                  style={[
                    styles.listTextView,
                    item.isSelected && styles.selectedColor,
                  ]}>
                  <Text
                    style={[
                      styles.textStyle1,
                      item.isSelected && styles.textWhite,
                    ]}>
                    {item.deviceName}
                  </Text>
                  {item.isSelected && (
                    <View style={styles.wrapperImage}>
                      <Image
                        style={styles.selectedImage}
                        source={constants.Images.CellSelect}
                        resizeMode={'contain'}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity
            onPress={openConnectionScreen}
            activeOpacity={0.9}
            style={styles.ConnectButton}>
            <Text style={styles.textStyle1}>Connect Your Aromeo</Text>
            <Image source={constants.Images.AddIcon} resizeMode={'contain'} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectDeviceModal;
