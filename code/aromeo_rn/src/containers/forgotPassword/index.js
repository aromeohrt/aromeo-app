//import liraries
import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Auth } from 'aws-amplify';
import constants from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {
  HeaderWithTitle,
  CustomTextInput,
  RectangleButton,
  Message
} from '../../components';
import styles from './style';

type Props = {
  navigation: Object,
};

const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const ERR_MSG_EMAIL = 'Invalid Email'

// create a component
const ForgotPassword = ({ navigation }: Props) => {
  let [username, setUsername] = useState('');
  let [errorMsg, setErrorMsg] = useState('');
  let [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState('');

  const BackButton = () => {
    navigation.goBack()
  }

  const forgotPass = () => {
    if (validEmail.test(username) == false) {
      setErrorMsg(ERR_MSG_EMAIL);
    } else {
      setErrorMsg('');
      setLoading(true)
      Auth.forgotPassword(username)
        .then((data) => {
          setLoading(false)
          navigation.navigate('SetNewPasswordScreen', { data, username });
        })
        .catch((err) => {
          setLoading(false)
          setError(err.message)
          setErrorCode(err.code)
        });
    }
  };

  const setValues = (text) => {
    setUsername(text)
    emptyError()
  }

  const emptyError = () => {
    setError('')
    setErrorMsg('')
  }

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'Reset Password'}
        iconColor={'black'}
      />
      <KeyboardAwareScrollView>
        <Text style={[styles.forgotText, styles.textDarkBlue, styles.nameWidth]}>
          Check Your Email
      </Text>
        <Text style={[styles.nameText, styles.textDarkBlue, styles.nameWidth]}>
          We will send verification code
          to the below email.
      </Text>
        <CustomTextInput
          changeText={text => setValues(text)}
          value={username}
          placeholder='Enter email'
          placeholderTextColor='#c9c3cc'
          errorMsg={errorMsg}
        />
        <View style={{ paddingTop: 50 }}>
          <RectangleButton
            title={'Next'}
            onPressButton={() => forgotPass()}
            blueButton={true}
            loading={loading}
            disable={username !== '' ? false : true}
          />
        </View>
      </KeyboardAwareScrollView>
      {
        error ?
          <Message message={error} customColor="#ada5b1" code={errorCode} emptyError={emptyError} />
          :
          null
      }
    </View>
  );
};

//make this component available to the app
export default ForgotPassword;
