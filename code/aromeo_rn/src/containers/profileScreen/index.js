//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import constants from '../../constants';
import Amplify, {Auth} from 'aws-amplify';
import {HeaderWithTitle, LoadingModal} from '../../components';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';

// create a component
const ProfileScreen = (props) => {
  const {navigation} = props;
  let [name, setName] = useState('userName');
  let [gender, setGender] = useState('');
  let [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  let [deviceId, setDeviceId] = useState('aromeoalpha001');
  let img = constants.Images.Logout;

  if (gender === 'FEMALE') img = constants.Images.Female;
  else if (gender === 'OTHER') img = constants.Images.Other;
  else if (gender === 'MALE') img = constants.Images.Male;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // do something
      const id = await AsyncStorage.getItem('deviceID');
      setDeviceId(id);
      setLoading(true);
      getGender();
      getUserName();
    });

    return unsubscribe;
  }, [navigation]);

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
        setLoading(false);
        const data = await response.json();
        // console.warn(data,"data")
        setGender(data?.gender);
      })
      .catch((err) => setLoading(false));
  };

  const getUserName = () => {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => setName(user?.attributes?.name))
      .catch((err) => {
        // console.log(err);
      });
  };

  const navigateTo = (type) => {
    navigation.navigate(`${type}Screen`, {gender, name});
  };

  const BackButton = () => {
    navigation.goBack();
  };

  const Options = (props) => {
    return (
      <TouchableOpacity
        style={[styles.optionContainer, styles.optionBorder]}
        onPress={() => navigateTo(props.text)}>
        <Text style={[styles.nameText, styles.textDarkBlue]}>{props.text}</Text>
        <View style={styles.optionTextWrapper}>
          {props.text === 'Name' && (
            <Text
              style={[
                styles.nameText,
                styles.brandPurple,
                styles.nameTextWidth,
              ]}
              numberOfLines={1}>
              {name}
            </Text>
          )}
          <Image source={props.image} style={styles.profileImage} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'Profile'}
        iconColor={'black'}
      />
      <Options text="Gender" image={img} />
      <Options text="Name" image={constants.Images.MoreRight} />
      {loading === true && <LoadingModal loading={loading} />}
    </View>
  );
};

//make this component available to the app
export default ProfileScreen;
