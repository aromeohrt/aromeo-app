import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import {
  HeaderWithTitle,
  CustomTextInput,
  RectangleButton,
  Message
} from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import styles from './styles'

const validPass = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/;
const ERR_MSG_PASS = 'Please enter valid password.'

const SetNewPassword = ({ route, navigation }) => {
  const [code, setVerification] = useState('');
  const [new_password, setPass] = useState('');
  let [error, setError] = useState('');
  const [timerValue, setTimerValue] = useState(120);
  const [passError, setPassError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [errorCode, setErrorCode] = useState('');
  let email = route.params.data.CodeDeliveryDetails.Destination
  let username = route.params.username

  useEffect(() => {
    if (timerValue > 0) {
      let timer = setInterval(tick, 1000);
      return () => clearInterval(timer)
    }
  }, [timerValue])

  tick = () => {
    setTimerValue(timerValue - 1)
  }

  const BackButton = () => {
    navigation.goBack();
  };

  const resendCode = () => {
    Auth.forgotPassword(username)
      .then(data => {
        setTimerValue(120)
      })
      .catch(err => {
        setError(err.message)
        setErrorCode(err.code)
      });
  }

  const confirmForgotPassword = () => {
    if (validPass.test(new_password) === false) {
      setVerificationError('');
      setPassError(ERR_MSG_PASS);
    } else {
      setVerificationError('');
      setPassError('');
      setLoading(true)
      Auth.forgotPasswordSubmit(username, code, new_password)
        .then(resp => {
          setLoading(false)
          navigation.navigate('SignInScreen', { username })
          // setError('Password changed successfully.')
          setErrorCode('')
        })
        .catch(err => {
          setLoading(false)
          setError(err.message)
          setErrorCode(err.code)
        });
    }
  }

  const setValues = (text, type) => {
    if (type === 'verify')
      setVerification(text)
    else if (type === 'pass')
      setPass(text)
    emptyError()
  }

  const emptyError = () => {
    setError('')
    setVerificationError('')
    setPassError('')
  }

  return (
    <View style={styles.container}>
      <HeaderWithTitle onPressBackButton={BackButton} iconColor={'black'} />
      <KeyboardAwareScrollView>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderTxt}>Set New Password</Text>
        </View>
        <Text style={styles.subHeaderTxt2}>We have sent a code to {email}</Text>
        <CustomTextInput
          label="Verification Code"
          changeText={(text) => setValues(text, 'verify')}
          value={code}
          autoFocus={true}
          placeholder="Enter the code"
          placeholderTextColor="#c9c3cc"
          keyboardType='number-pad'
          errorMsg={verificationError}
        />
        {error ?
        <Text style={{color:"red",  fontFamily: 'Montserrat-Light',textAlign:"center"}}>{error}</Text>:null}
        <CustomTextInput
          label="New Password"
          changeText={(text) => setValues(text, 'pass')}
          value={new_password}
          placeholder="8+ characters"
          placeholderTextColor="#c9c3cc"
          visible={true}
          errorMsg={passError}
        />
        {
          timerValue === 0 ?
            <TouchableOpacity onPress={() => resendCode()}>
              <Text style={[styles.resendText, styles.underline]}>Resend code</Text>
            </TouchableOpacity>
            :
            <Text style={styles.resendText}>Resend code after {timerValue}s</Text>
        }
        <RectangleButton
          title={'Next'}
          onPressButton={() => confirmForgotPassword()}
          blueButton={true}
          loading={loading}
          disable={email !== '' && code !== '' ? false : true}
        />
      </KeyboardAwareScrollView>
      {/* {
        error ?
          <Message message={error} customColor="#ada5b1" code={errorCode} emptyError={emptyError} />
          :
          null
      } */}
    </View>
  );
};

export default connect(
  null,
  null
)(SetNewPassword);