//import liraries
import React from 'react';
import {
  View,
  Image,
  Modal
} from 'react-native';
import styles from './style';

type Props = {
  loading: Boolean
};

const LoadingModal = (props) => {
  return (
    <Modal
    // animationType="slide"
    transparent={true}
    visible={props.loading}
   
    // onRequestClose={onRequestClose}
    >
    <View style={styles.container}>
      <Image
        style={{ width: 40, height: 40 }}
        source={require('../../assets/images/loading_blue_336px_bg.gif')}
      />
    </View>
    </Modal>
  );
};

export default LoadingModal;
