//import liraries
import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import * as AppActionTypes from '../../actions/app-actions-types';
import { connect } from 'react-redux';
import constants from '../../constants';
import {
  HeaderWithTitle
} from '../../components';
import styles from './style';

type Props = {
  navigation: Object,
};

// create a component
const AboutScreen = ({ navigation, saveConnectionStatus }: Props) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      saveConnectionStatus(true)
    });

    return unsubscribe;
  }, [navigation]);

  const navigateTo = (url) => {
    Linking.openURL(`${url}`).catch(err =>
      {}
    );
  }

  const BackButton = () => {
    navigation.goBack()
  }

  const Divider = () => {
    return (
      <View style={styles.divider} />
    )
  }

  const Options = (props) => {
    let component = null
    if (props.text === 'Website')
      component = <Text style={[styles.nameText, styles.brandPurple, styles.nameTextWidth]}>www.aromeodiffuser.com</Text>
    else
      component = <Image source={props.image} style={styles.profileImage} />

    return (
      <TouchableOpacity style={[styles.optionContainer, styles.optionBorder]} onPress={() => navigateTo(props.url)}>
        <Text style={[styles.nameText, styles.textDarkBlue]}>{props.text}</Text>
        <View style={styles.optionTextWrapper}>
          {component}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'About App'}
        iconColor={'black'}
      />
      <Image source={constants.Images.Example} style={styles.appImage} />
      <Text style={[styles.forgotText, styles.textDarkBlue]}>
        Aromeo v 2.0.0
      </Text>
      <Divider />
      <Options text='Terms of Use' image={constants.Images.MoreRight} url='https://aromeodiffuser.com/policies/terms-of-service' />
      <Options text='Privacy Policy' image={constants.Images.MoreRight} url='https://aromeodiffuser.com/policies/privacy-policy' />
      <Options text='Website' url='https://aromeodiffuser.com/' />
      <Divider />
      <View style={{ justifyContent: 'flex-end', flex: 1 }}>
        <Text style={[styles.nameText, styles.textGrey2]}>
          Copyright © 2020 Miscato Limited.
      </Text>
      </View>
    </View>
  );
};

//make this component available to the app
export default connect(
  null,
  { ...AppActionTypes }
)(AboutScreen);
