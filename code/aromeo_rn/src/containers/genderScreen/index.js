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
import {Auth} from 'aws-amplify';
import {HeaderWithTitle, LoadingModal} from '../../components';
import styles from './style';

type Props = {
  navigation: Object,
};

// create a component
const GenderScreen = ({route, navigation}: Props) => {
  let paramGender = route.params.gender;
  let [gender, setGender] = useState([
    {
      value: 'Male',
      selected: paramGender === 'MALE' ? true : false,
      imageUrl: constants.Images.Male,
    },
    {
      value: 'Female',
      selected: paramGender === 'FEMALE' ? true : false,
      imageUrl: constants.Images.Female,
    },
    {
      value: 'Other',
      selected: paramGender === 'OTHER' ? true : false,
      imageUrl: constants.Images.Other,
    },
  ]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        setToken(user?.signInUserSession?.idToken?.jwtToken);
      })
      .catch((err) => {
        // console.log(err)
      }
    
      );
  }, []);

  const genderClicked = async (index) => {
    gender = gender.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    setGender(gender);
    saveGender();
  };

  const saveGender = () => {
    const SelectedGender = gender.filter((i, index) => i.selected === true);
    fetch(
      'https://syxvq38szb.execute-api.ap-southeast-1.amazonaws.com/prod/set-gender',
      {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: JSON.stringify({
          gender: SelectedGender[0].value.toUpperCase(),
        }),
      },
    )
      .then(async (response) => {
        const message = await response.json();
        setLoading(false);
        navigation.navigate('ProfileScreen');
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const BackButton = () => {
    navigation.goBack();
  };

  const Options = (props) => {
    return (
      <TouchableOpacity
        style={[
          styles.optionContainer,
          styles.optionBorder,
          props.selected && styles.brandPurple,
        ]}
        onPress={() => {
          genderClicked(props.index);
          setLoading(true);
        }}>
        <View style={styles.optionTextWrapper}>
          <Image source={props.image} style={styles.profileImage} />
          <Text
            style={[
              styles.nameText,
              props.selected ? styles.textWhite : styles.textDarkBlue,
            ]}>
            {props.text}
          </Text>
        </View>
        {props.selected && <Image source={constants.Images.CellSelect} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'Gender'}
        iconColor={'black'}
      />
      {gender.map((item, index) => (
        <Options
          text={item.value}
          image={item.imageUrl}
          selected={item.selected}
          index={index}
          key={index}
        />
      ))}
      {loading === true && <LoadingModal loading={loading} />}
    </View>
  );
};

//make this component available to the app
export default GenderScreen;
