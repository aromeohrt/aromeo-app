//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {openComposer} from 'react-native-email-link';
import {Auth} from 'aws-amplify';
import constants from '../../constants';
import {InitialModal, LoadingModal} from '../../components';
import {connect} from 'react-redux';
import * as AppActionTypes from '../../actions/app-actions-types';
import styles from './style';
import {MyStatusBar} from '../../utilities/statusBar';
import BleManager from 'react-native-ble-manager';
import NetInfo from '@react-native-community/netinfo';
// create a component
const UserProfileScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  let [gender, setGender] = useState('');
  const [initialModal, setInitialModal] = useState(false);
  let [loggedIn, setLoggedIn] = useState(false);
  const {navigation} = props;
  let img = constants.Images.Logout;

  if (gender === 'FEMALE') img = constants.Images.Female;
  else if (gender === 'OTHER') img = constants.Images.Other;
  else if (gender === 'MALE') img = constants.Images.Male;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // do something
      setLoading(true);
      getName();

      getGender();
    });

    return unsubscribe;
  }, [navigation]);

  const getName = () => {
    Auth.currentUserInfo({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(async (user) => {
        if (user == null) {
          setLoggedIn(false);
          setLoading(false);
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

          img = constants.Images.Logout;
        } else if (Object.keys(user).length == 0) {
          NetInfo.fetch().then(async (state) => {
            setLoading(false);
            // console.warn("Is connected?", state.isConnected);
            if (state.isConnected == true) {
              setLoggedIn(false);
              setLoading(false);
              await AsyncStorage.removeItem('Token');
              await AsyncStorage.removeItem('Light');
              await AsyncStorage.removeItem('deviceData');
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
            } else {
              setLoading(false);
            }
          });

          img = constants.Images.Logout;
        } else {
          getGender();
          Auth.currentAuthenticatedUser({
            bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
          })
            .then((user) => {
              // console.warn(user)

              setLoggedIn(true);
              setEmail(user?.attributes?.email);
              setName(user?.attributes?.name);
            })
            .catch((err) => setLoggedIn(false));
        }
      })
      .catch((err) => {
        // console.warn('err', err);
      });
  };

  const getGender = async () => {
    fetch(
      'https://syxvq38szb.execute-api.ap-southeast-1.amazonaws.com/prod/get-gender',
      {
        method: 'GET',
        headers: {
          Authorization: await AsyncStorage.getItem('Token'),
        },
      },
    )
      .then(async (response) => {
        // console.warn(response);
        setLoading(false);
        const data = await response.json();
        setGender(data?.gender);
      })
      .catch((err) => {
        setLoading(false);
        // console.warn(err);
      });
  };

  const Divider = () => {
    return <View style={styles.divider} />;
  };

  const navigateTo = (type) => {
    if (type === 'My Account') navigation.navigate('MyAccount', {email});
    else if (type === 'Sign up / Log in') toggleInitialModal();
    else if (type === 'About App') navigation.navigate('AboutScreen');
    else if (type === 'Help & Feedback')
      openComposer({
        to: 'support@miscato.com',
      });
    else if (type === 'Aromeo Store')
      Linking.openURL('https://aromeodiffuser.com/collections/all').catch(
        (err) =>
          // Linking.openURL('https://aromeodiffuser.com.au/shop').catch(err =>

          {
            // console.error('An error occurred maps', err);
          }
      );
  };

  const Options = (props) => {
    return (
      <TouchableOpacity
        style={[
          styles.optionContainer,
          props.text !== 'About App' && styles.optionBorder,
        ]}
        onPress={() => navigateTo(props.text)}>
        <View style={styles.optionTextWrapper}>
          <Image source={props.image} />
          <Text style={[styles.headingText, styles.optionText]}>
            {props.text}
          </Text>
        </View>
        <Image source={constants.Images.MoreRight} />
      </TouchableOpacity>
    );
  };

  const profileClicked = () => {
    if (loggedIn) navigation.navigate('ProfileScreen', {gender, name});
    else toggleInitialModal();
  };

  const toggleInitialModal = () => {
    setInitialModal(!initialModal);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Aromeo</Text>
      <View style={styles.imageContainer}>
        <View style={styles.commonImageContainer}>
          <TouchableOpacity onPress={() => profileClicked()}>
            <Image style={styles.profileImage} source={img} />
          </TouchableOpacity>
          {loggedIn && (
            <TouchableOpacity
              style={styles.addImageContainer}
              onPress={() =>
                navigation.navigate('ProfileScreen', {gender, name})
              }>
              <Image source={constants.Images.ProfileSetting} />
            </TouchableOpacity>
          )}
        </View>
        {loggedIn ? (
          <View>
            <Text style={styles.nameText}>{name}</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={toggleInitialModal}>
            <Text style={[styles.nameText, styles.underline]}>Join Aromeo</Text>
          </TouchableOpacity>
        )}
      </View>
      <Divider />
      <Options
        text={loggedIn ? 'My Account' : 'Sign up / Log in'}
        image={constants.Images.SignupLogin}
      />
      <Options text="Aromeo Store" image={constants.Images.SignupStore} />
      <Options text="Help & Feedback" image={constants.Images.SignupHelp} />
      <Options text="About App" image={constants.Images.SignupAbout} />
      <Divider />
      <InitialModal
        modalVisible={initialModal}
        closeModal={toggleInitialModal}
        navigation={navigation}
      />
      {loading === true && <LoadingModal loading={loading} />}
    </View>
  );
};

//make this component available to the app
export default connect(null, {...AppActionTypes})(UserProfileScreen);
