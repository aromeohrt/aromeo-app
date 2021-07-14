import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  ImageBackground,
  Linking,
} from 'react-native';
import {Auth} from 'aws-amplify';
import * as AppActionTypes from '../../actions/app-actions-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
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
import {connect} from 'react-redux';

const validName = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const validPass = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/;
const ERR_MSG_PASS =
  'Password should be 8+ characters/at least 8 characters long. - At least 1 uppercase, at least 1 lowercase and at least 1 digit.';
const ERR_MSG_EMAIL = 'Invalid Email';
const ERR_MSG_NAME = 'Name should have letters, numbers and blank spaces.';

const SignUpScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passErrorMsg, setPassErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [networkError, setNetworkError] = useState(false);
  const BackButton = () => {
    if (props.route?.params?.redirectToHome) {
      props.navigation.navigate('HomeScreen');
    } else props.navigation.goBack();
  };

  const signUp = () => {
    if (!validName.test(name)) {
      setNameErrorMsg(ERR_MSG_NAME);
      setPassErrorMsg('');
      setEmailErrorMsg('');
    } else if (!validEmail.test(email)) {
      setEmailErrorMsg(ERR_MSG_EMAIL);
      setPassErrorMsg('');
      setNameErrorMsg('');
    } else if (!validPass.test(password)) {
      setEmailErrorMsg('');
      setNameErrorMsg('');
      setPassErrorMsg(ERR_MSG_PASS);
    } else {
      setLoading(true);
      setPassErrorMsg('');
      Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
        },
      })
        .then((data) => {
          setLoading(false);
          let sendData = {
            email: data?.codeDeliveryDetails?.Destination,
            username: data?.user?.username,
          };
          props.navigation.navigate('ConfirmEmailDefaultScreen', sendData);
        })
        .catch((err) => {
          setLoading(false);
          setLoading(false);
          if (err.message == 'Network error') {
            setNetworkError(true);
          } else {
            if (err.code === 'UsernameExistsException') {
              setError(err.code);
              setModal(true);
            } else setError(err.message);
            setErrorCode(err.code);
          }
        });
    }
  };

  setValues = (text, type) => {
    if (type === 'name') setName(text);
    else if (type === 'email') setEmail(text);
    else if (type === 'pass') setPassword(text);
    emptyError();
  };

  const emptyError = () => {
    setError('');
    setEmailErrorMsg('');
    setNameErrorMsg('');
    setPassErrorMsg('');
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
    <ImageBackground
      source={constants.Images.SignUpBg}
      style={styles.container}>
      <View style={styles.container}>
        <HeaderWithTitle onPressBackButton={BackButton} iconColor={'black'} />
        {props.internetConnection === false || networkError == true ? (
          <View style={styles.subHeaderContainer}>
            <Text style={styles.blurText}>Let’s get started</Text>
          </View>
        ) : (
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderTxt}>Let’s get started</Text>
          </View>
        )}
        <KeyboardAwareScrollView>
          <CustomTextInput
            label="Name"
            changeText={(text) => setValues(text, 'name')}
            value={name}
            keyboardType={
              Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
            }
            placeholder="Enter your name"
            placeholderTextColor="#c9c3cc"
            errorMsg={nameErrorMsg}
          />
          <CustomTextInput
            label="Email"
            changeText={(text) => setValues(text, 'email')}
            value={email}
            placeholder="Enter your email address"
            placeholderTextColor="#c9c3cc"
            errorMsg={emailErrorMsg}
          />
          <CustomTextInput
            label="Password"
            changeText={(text) => setValues(text, 'pass')}
            value={password}
            placeholder="8+ characters"
            placeholderTextColor="#c9c3cc"
            visible={true}
            errorMsg={passErrorMsg}
          />

          <View style={styles.signUpFooter}>
            <RectangleButton
              disable={
                name !== '' && password !== '' && email !== '' ? false : true
              }
              title={loading ? 'Loading...' : 'Next'}
              onPressButton={() => signUp()}
              blueButton={true}
              loading={loading}
            />
            <View style={styles.bottomHeader}>
              <Text style={styles.footerTxt}>
                By creating an account, I accept Miscato Limited’s
                <Text
                  style={styles.footerLinks}
                  onPress={() =>
                    Linking.openURL(
                      'https://aromeodiffuser.com/policies/terms-of-service',
                    ).catch((err) => {
                      // console.error('An error occurred maps', err);
                    })
                  }>
                  {' '}
                  Terms of Service{' '}
                </Text>{' '}
                and
                <Text
                  style={styles.footerLinks}
                  onPress={() =>
                    Linking.openURL(
                      'https://aromeodiffuser.com/policies/privacy-policy',
                    ).catch((err) => {
                      // console.error('An error occurred maps', err);
                    })
                  }>
                  {' '}
                  Privacy Policy.
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {error ? (
          error !== 'UsernameExistsException' ? (
            <Message
              message={error}
              customColor="#ada5b1"
              code={errorCode}
              emptyError={emptyError}
            />
          ) : (
            <ExitAlert
              modalVisible={modal}
              title={'Account already exists. Do you want to log in with it?'}
              messageText={''}
              Button1Text={'Cancel'}
              Button2Text={'Log In'}
              closeModal={() => setModal(false)}
              exitConfirm={() => {
                props.navigation.navigate('SignInScreen', {username: email});
                setModal(false);
              }}
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
)(SignUpScreen);
