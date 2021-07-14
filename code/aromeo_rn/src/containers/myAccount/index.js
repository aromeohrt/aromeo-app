//import liraries
import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-community/async-storage';
import {CognitoUser} from 'amazon-cognito-identity-js';
import constants from '../../constants';
import * as AppActionTypes from '../../actions/app-actions-types';
import {connect} from 'react-redux';
import {
  HeaderWithTitle,
  RectangleButton,
  ExitAlert,
  Message,
} from '../../components';
import styles from './style';
import BleManager from 'react-native-ble-manager';
// create a component
const MyAccount = (props) => {
  let email = props.route.params.email;
  let [logoutModal, setLogoutModal] = useState(false);
  let [deleteAccountModal, setDeleteAccountModal] = useState(false);
  let [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const navigateTo = (type) => {
    if (type === 'Delete Account') setDeleteAccountModal(true);
    if (type === 'Reset Password')
      props.navigation.navigate('ResetPassword', {username: email});
  };

  const BackButton = () => {
    props.navigation.goBack();
  };

  const Divider = () => {
    return <View style={styles.divider} />;
  };

  const logout = async () => {
    setError('');
    setLogoutModal(false);
    try {
      Auth.signOut({global: true})
        .then(async (data) => {
          // console.warn('Sign out', data);
          await AsyncStorage.removeItem('Token');
          await AsyncStorage.removeItem('deviceData');
          await AsyncStorage.removeItem('Light');
          let id = await AsyncStorage.getItem('DeviceId');
          BleManager.disconnect(id)
            .then(async () => {
              setDeviceName('');
              await AsyncStorage.removeItem('DeviceId');
              // await AsyncStorage.clear()
            })
            .catch((error) => {
              // Failure code
              // alert(error)
            });
          // await AsyncStorage.clear()
          BackButton();
        })
        .catch((error) => {
          // console.warn('Error', error);
          // setLoading(false);
        if(error.message == "Network error"){
          setError("No network connection")
          setErrorCode("")
        }
        else { 
          setError(error.message);
          setErrorCode(error.code);
        }
          
        });
    } catch (error) {
      // console.warn('Error', error);
      // setLoading(false);
      setError(error.message);
      // setErrorCode(err.code);
    }
  };

  const deleteAccount = async () => {
    setError('');
    setDeleteAccountModal(false);
    Auth.currentAuthenticatedUser()
      .then(
        (user: CognitoUser) =>
          new Promise((resolve, reject) => {
            user.deleteUser(async (error) => {
              if (error) {
                if(error.message=="Network error"){
                  setError("No network connection");
                }
                else  {
                  setError(error.message);
                }
               
              } else {
                resolve();
                await AsyncStorage.removeItem('Token');
                await AsyncStorage.removeItem('deviceData');
                await AsyncStorage.removeItem('Light');
                let id = await AsyncStorage.getItem('DeviceId');
                BleManager.disconnect(id)
                  .then(async () => {
                    await AsyncStorage.removeItem('DeviceId');
                    // await AsyncStorage.clear()
                  })
                  .catch((error) => {
                    // Failure code
                    // alert(error)
                  });
                //  await AsyncStorage.clear()

                BackButton();
              }
            });
          }),
      )
      .catch((error) => {
        // console.warn('catch error ', error);
      });
  };

  const Options = (props) => {
    let component = null;
    let borderStyle = null;
    if (props.text === 'Email') {
      borderStyle = styles.optionBorder;
      component = (
        <Text
          style={[styles.nameText, styles.brandPurple, styles.nameTextWidth]}
          numberOfLines={1}>
          {email}
        </Text>
      );
    } else if (props.text === 'Reset Password') {
      component = <Image source={props.image} style={styles.profileImage} />;
    } else if (props.text === 'Delete Account') {
      borderStyle = {...styles.optionBorder, ...styles.optionTopBorder};
    }

    return (
      <TouchableOpacity
        style={[styles.optionContainer, borderStyle]}
        onPress={() => navigateTo(props.text)}>
        <Text
          style={[
            styles.nameText,
            props.text === 'Delete Account'
              ? styles.warningRed
              : styles.textDarkBlue,
          ]}>
          {props.text}
        </Text>
        <View style={styles.optionTextWrapper}>{component}</View>
      </TouchableOpacity>
    );
  };

  const emptyError = () => {
    setError('');
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'My Account'}
        iconColor={'black'}
      />
      <Options text="Email" />
      <Options text="Reset Password" image={constants.Images.MoreRight} />
      <Divider />
      <Options text="Delete Account" />
      <Divider />
      <View style={{justifyContent: 'flex-end', flex: 1, paddingBottom: 27}}>
        <RectangleButton
          title={'Log Out'}
          onPressButton={() => setLogoutModal(true)}
          blueButton={false}
          addBorder={true}
        />
      </View>
      {error ? (
        <Message
          message={error}
          customColor="#ada5b1"
          emptyError={emptyError}
        />
      ) : null}
      <ExitAlert
        modalVisible={logoutModal}
        title={'Are you sure want to logout?'}
        messageText={''}
        btn2Color={styles.warningRedBg}
        Button1Text={'No'}
        Button2Text={'Yes'}
        closeModal={() => setLogoutModal(false)}
        exitConfirm={() => logout()}
      />
      <ExitAlert
        modalVisible={deleteAccountModal}
        title={'Notice'}
        messageText={
          'Once the account is deleted, your personal data will be erased and cannot be retrieved.'
        }
        btn1Color={styles.warningRedBg}
        Button1Text={'Delete'}
        Button2Text={'Cancel'}
        exitConfirm={() => deleteAccount()}
        closeModal={() => setDeleteAccountModal(false)}
      />
      {error ? (
        <Message
          message={error}
          customColor="#ada5b1"
          code={errorCode}
          emptyError={emptyError}
        />
      ) : null}
    </View>
  );
};

//make this component available to the app
export default connect(null, {...AppActionTypes})(MyAccount);
