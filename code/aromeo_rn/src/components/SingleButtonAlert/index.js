//import liraries
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import RectangleButton from '../RectangleButton';
import styles from './style';

type Props = {
  modalVisible: boolean,
  closeModal: Object,
};
const SingleButtonAlert = ({ message, modalVisible, closeModal }: Props) => {
  return (
    <Modal
      animationType={'fade'}
      animated
      transparent
      visible={modalVisible}
      onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal} style={styles.flex1}>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} style={styles.alertContainer}>
            {
              message === undefined && (
                <Text style={styles.alertHeading}>
                  The device is connected with another phone now.
                </Text>
              )
            }
            <Text style={styles.alertMsg}>
              {
                message ?
                  message :
                  'Please try again later.'
              }
            </Text>
            <View style={styles.buttonWrapper}>
              <RectangleButton
                title={'OK'}
                onPressButton={closeModal}
                blueButton={true}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SingleButtonAlert;
