//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, ImageBackground, } from 'react-native';
import {
  HeaderWithTitle,
  RectangleButton,
  Message
} from '../../components';
import * as AppActionTypes from '../../actions/app-actions-types';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import constants from '../../constants';
import styles from './styles';

type Props = {
  navigation: Object,
};

// create a component
const ConfirmEmailDefault = ({ route, navigation, saveConnectionStatus }: Props) => {
  const [error, setError] = useState('');
  const [timerValue, setTimerValue] = useState(120);
  const [errorCode, setErrorCode] = useState('');
  let email = route?.params?.email
  let username = route?.params?.username

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      saveConnectionStatus(true)
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (timerValue > 0) {
      let timer = setInterval(tick, 1000);
      return () => clearInterval(timer)
    }
  }, [timerValue])

  tick = () => {
    setTimerValue(timerValue - 1)
  }

  resendEmail = () => {
    setError('')
    Auth.resendSignUp(username)
      .then((data) => setTimerValue(120))
      .catch((err) => {
        setError(err.message)
        setErrorCode(err.code)
      });
  }

  const BackButton = () => {
    navigation.goBack();
  };

  const emptyError = () => {
    setError('')
  }

  return (
    <ImageBackground
      source={constants.Images.ConfirmEmailBg}
      style={styles.container}>
      <View style={styles.container}>
        <HeaderWithTitle onPressBackButton={BackButton} iconColor={'black'} />
        <Text style={[styles.nameText, styles.textDarkBlue, styles.nameWidth]}>
          Check your inbox
        </Text>
        <View style={styles.ImageContainer}>
          <Image
            source={constants.Images.ConfirmEmail}
            style={styles.image}
            resizeMode='contain'
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTxt}>
            We have sent an email to {email}. Please check your email, follow the instructions to verify your email address.
        </Text>
        </View>
        {
          timerValue === 0 ?
            <TouchableOpacity onPress={() => resendEmail()}>
              <Text style={[styles.forgotText, styles.underline]}>Resend Email</Text>
            </TouchableOpacity>
            :
            <Text style={styles.forgotText}>Resend after {timerValue}s</Text>
        }
        {
          error ?
            <Message message={error} customColor="#ada5b1" code={errorCode} emptyError={emptyError} />
            :
            null
        }
        <RectangleButton
          title={'Email has been verified '}
          onPressButton={() => {
            setError('')
            navigation.navigate('SignInScreen')
          }}
          blueButton={true}
        />
      </View>
    </ImageBackground>
  );
};

export default connect(
  null,
  { ...AppActionTypes }
)(ConfirmEmailDefault);