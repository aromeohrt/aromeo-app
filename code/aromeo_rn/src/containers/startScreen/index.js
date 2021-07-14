import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './style';
import {
  RectangleButton,
} from '../../components';
import { connect } from 'react-redux';
import * as AppActionTypes from '../../actions/app-actions-types';
import constants from '../../constants';

let startScreen = (props) => {
  let { navigation } = props
  return (
    <ImageBackground
      source={constants.Images.StartScreenBg}
      style={styles.container}>
      <TouchableOpacity onPress={() => props.showLoader()} style={styles.header}>
        <Image
          source={require('../../assets/images/cross.png')}
          style={styles.cross}
        />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={constants.Images.Logo}
        />
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
            onPressButton={() => navigation.navigate('SignUpScreen')}
          />
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={styles.footerTxt}>
              Have an account?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Log in </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default connect(
  null,
  { ...AppActionTypes }
)(startScreen);
