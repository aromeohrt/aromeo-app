import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  StatusBar,
  Platform
} from 'react-native';
import styles from './style';
import {RectangleButton} from '../../components';
import {connect} from 'react-redux';
import * as AppActionTypes from '../../actions/app-actions-types';
import constants from '../../constants';

let InitialModal = (props) => {
  let {navigation, closeModal, modalVisible, openSound,redirectToHome} = props;

  const navigateTo = (type) => {
    // console.warn("type",redirectToHome)
    if(redirectToHome !== undefined && redirectToHome == true){
      navigation.navigate(type,{redirectToHome : "HomeScreen"});
    }
    else {
      navigation.navigate(type);
    }
    closeModal();
  };

  const offModal = () => {
    closeModal();
    if (openSound !== undefined) {
      openSound(true);
    }
  };
  return (
    <Modal
      animationType={'slide'}
      animated
      transparent
      visible={modalVisible}
      onRequestClose={() => offModal()}>
     {Platform.OS === 'android' ?
         <StatusBar backgroundColor="#f5dae0"/>
         : null
    } 
      <ImageBackground
        source={constants.Images.StartScreenBg}
        style={styles.container}
        >
           
        <TouchableOpacity onPress={() => offModal()} style={styles.header}>
          <Image
            source={require('../../assets/images/cross.png')}
            style={styles.cross}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={constants.Images.Logo} />
        </View>
        <View style={styles.centerContainer}>
          <View style={styles.textContent}>
            <Text style={styles.centerTXt}>Discover</Text>
            <Text style={styles.centerTXt}>Smart </Text>
            <Text style={styles.centerTXt}>Aromatherapy.</Text>
          </View>
          <View style={styles.footerContainer}>
            <RectangleButton
              title={'Sign Up'}
              onPressButton={navigateTo.bind(this, 'SignUpScreen')}
            />
            <TouchableOpacity onPress={navigateTo.bind(this, 'SignInScreen')}>
              <Text style={styles.footerTxt}>
                Have an account?{' '}
                <Text style={{textDecorationLine: 'underline'}}>Log in </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    
    </Modal>
  );
};

export default connect(null, {...AppActionTypes})(InitialModal);
