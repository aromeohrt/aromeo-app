import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './style';

type Props = {
  modalVisible: boolean,
  title: String,
  messageText: String,
  Button1Text: String,
  Button2Text: String,
  closeModal: Object,
  exitConfirm: Object,
  btn1Color: Object,
  btn2Color: Object,
};
const ExitAlert = ({
  modalVisible,
  closeModal,
  exitConfirm,
  title,
  messageText,
  Button1Text,
  Button2Text,
  btn1Color,
  btn2Color,
  numberofButton,
}: Props) => {
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
            <View style={styles.paddingHorizontal}>
              <Text style={styles.alertHeading}>{title}</Text>
              {messageText !== '' && (
                <Text style={styles.alertMsg}>{messageText}</Text>
              )}
            </View>
            {numberofButton ? (
              <View style={styles.singleButtonWrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={
                    Button1Text === 'Delete' || Button1Text == 'Exit'
                      ? exitConfirm
                      : closeModal
                  }
                  style={[
                    styles.stayButton,
                    btn1Color ? btn1Color : styles.grayButton,
                  ]}>
                  <Text style={styles.buttonText}>{Button1Text}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={
                    Button1Text === 'Delete' || Button1Text == 'Exit'
                      ? exitConfirm
                      : closeModal
                  }
                  style={[
                    styles.stayButton,
                    btn1Color ? btn1Color : styles.grayButton,
                  ]}>
                  <Text style={styles.buttonText}>{Button1Text}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    Button1Text === 'Delete' || Button1Text == 'Exit'
                      ? closeModal
                      : exitConfirm
                  }
                  activeOpacity={0.8}
                  style={[
                    styles.stayButton,
                    btn2Color ? btn2Color : styles.blueButton,
                  ]}>
                  <Text style={styles.buttonText}>{Button2Text}</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ExitAlert;
