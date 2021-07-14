import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  BackHandler,
  findNodeHandle,
} from 'react-native';
import {Auth, nav} from 'aws-amplify';
import * as AppActionTypes from '../../actions/app-actions-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {
  HeaderWithTitle,
  CustomTextInput,
  RectangleButton,
  Message,
  ExitAlert,
} from '../../components';

import styles from './styles';
import constants from '../../constants';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {BlurView} from '@react-native-community/blur';
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const validPass = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/;
const ERR_MSG_PASS =
  'Password should be 8+ characters/at least 8 characters long. - At least 1 uppercase, at least 1 lowercase and at least 1 digit.';
const ERR_MSG_EMAIL = 'Invalid Email';

const SignInScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let [error, setError] = useState('');
  let [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passErrorMsg, setPassErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [networkError, setNetworkError] = useState(false);
  const [viewRef, setViewRef] = useState(null);
  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (props.route?.params?.username) {
      setUsername(props.route?.params?.username);
    }
  }, [props.route?.params]);

  const BackButton = () => {
    if (props.route?.params?.redirectToHome) {
      props.navigation.navigate('HomeScreen');
    } else props.navigation.goBack();
  };

  const resendEmail = () => {
    setError('');
    Auth.resendSignUp(username)
      .then((data) => {
        let sendData = {
          email: data?.CodeDeliveryDetails?.Destination,
          username,
        };
        props.navigation.navigate('ConfirmEmailDefaultScreen', sendData);
      })
      .catch((err) => {
        setError(err.message);
        setErrorCode(err.code);
      });
  };

  const signIn = () => {
    if (!validEmail.test(username) && !validPass.test(password)) {
      setEmailErrorMsg(ERR_MSG_EMAIL);
      setPassErrorMsg(ERR_MSG_PASS);
    } else if (!validPass.test(password)) {
      setEmailErrorMsg('');
      setPassErrorMsg(ERR_MSG_PASS);
    } else if (!validEmail.test(username)) {
      setEmailErrorMsg(ERR_MSG_EMAIL);
      setPassErrorMsg('');
    } else {
      setLoading(true);
      setPassErrorMsg('');
      Auth.signIn(username, password)
        .then((data) => {
          Auth.signOut({global: true}).then((res) => {
            Auth.signIn(username, password).then((data) => {
              setLoading(false);
              Auth.currentAuthenticatedUser({
                bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
              })
                .then((user) => {
                  AsyncStorage.setItem(
                    'Token',
                    user?.signInUserSession?.idToken?.jwtToken,
                  );
                  props.navigation.navigate('HomeScreen'); // login
                })
                .catch((err) => {
                  // console.warn(err);
                });
            });
          });
        })
        .catch((err) => {
          setLoading(false);
          if (err.message == 'Network error') {
            setNetworkError(true);
          } else {
            if (err.code === 'UserNotConfirmedException') {
              setError(err.code);
              setModal(true);
            } else setError(err.message);
            setErrorCode(err.code);
          }
        });
    }
  };

  setValues = (text, type) => {
    if (type === 'name') setUsername(text);
    else if (type === 'password') setPassword(text);
    emptyError();
  };

  const emptyError = () => {
    setError('');
    setEmailErrorMsg('');
    setPassErrorMsg('');
  };

  const forgotPassword = () => {
    setPassword('');
    props.navigation.navigate('FirstForgotPassword');
  };

  const emptyInternetError = () => {
    props.saveConnectionStatus(true);
    setNetworkError(false);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      props.saveConnectionStatus(state.isConnected);
    });

    return unsubscribe;
  }, []);

  return (
    <ImageBackground source={constants.Images.LoginBg} style={styles.container}>
      <View style={styles.container}>
        <HeaderWithTitle onPressBackButton={BackButton} iconColor={'black'} />
        {props.internetConnection === false || networkError == true ? (
          <View style={styles.subHeaderContainer}>
            <Text style={styles.blurText}>Welcome Back</Text>
          </View>
        ) : (
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderTxt}>Welcome Back</Text>
          </View>
        )}

        <KeyboardAwareScrollView>
          <CustomTextInput
            label="Email"
            changeText={(text) => setValues(text, 'name')}
            value={username}
            placeholder="Enter your email address"
            placeholderTextColor="#c9c3cc"
            errorMsg={emailErrorMsg}
          />
          <CustomTextInput
            label="Password"
            changeText={(text) => setValues(text, 'password')}
            value={password}
            placeholder="Enter your password"
            placeholderTextColor="#c9c3cc"
            visible={true}
            errorMsg={passErrorMsg}
            itsPassword={true}
          />
          <TouchableOpacity onPress={forgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <RectangleButton
            disable={username !== '' && password !== '' ? false : true}
            title={loading ? 'Loading...' : 'Log In'}
            onPressButton={() => signIn()}
            blueButton={true}
            loading={loading}
          />
        </KeyboardAwareScrollView>
        {error ? (
          error !== 'UserNotConfirmedException' ? (
            <Message
              message={error}
              customColor="#ada5b1"
              code={errorCode}
              emptyError={emptyError}
            />
          ) : (
            <ExitAlert
              modalVisible={modal}
              title={
                'The account has not been confirmed yet. Please confirm your email to continue.'
              }
              messageText={''}
              Button1Text={'Cancel'}
              Button2Text={'Confirm'}
              closeModal={() => setModal(false)}
              exitConfirm={() => resendEmail()}
            />
          )
        ) : null}
      </View>
      {(props.internetConnection === false || networkError == true) && (
        <Message
          message={`No network connection.
      Please try later.`}
          customColor="#e17b7bf2"
          emptyError={emptyInternetError}
          forConnection={true}
        />
      )}
    </ImageBackground>
  );
};

export default connect(
  (state) => ({
    internetConnection: state.app.internetConnection,
  }),
  {...AppActionTypes},
)(SignInScreen);
