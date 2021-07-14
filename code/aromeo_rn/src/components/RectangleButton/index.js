//import liraries
import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import constants from '../../constants';
import style from '../InitialModal/style';
import styles from './style';
import group2 from '../../assets/images/group2.png'
type props = {
  title: String,
  onPressButton: Object,
  blueButton: Boolean,
  disable: Boolean
};

const RectangleButton = ({ title, onPressButton, blueButton, addBorder, disable, loading,addShadow,connected }: props) => {
  let gif = constants.Images.BlueGIF
  if (blueButton)
    gif = constants.Images.WhiteGIF

    if(connected == false || connected == undefined){
      return (
        <TouchableOpacity
          disabled={disable}
          onPress={onPressButton}
          activeOpacity={0.8}
          style={[
            styles.startBtn1,
            styles.justifyAlignCenter,
            disable ?
              styles.disableBrandPurple
              :
              (blueButton ? styles.brandPurple : styles.whiteColor),
            addBorder && styles.whiteButtonBorder,
           addShadow && !loading ? styles.withShadow : null ,
          loading ? styles.withBorder : null
          ]}>
          <Text
            numberOfLines={1}
            style={[styles.buttonText, !blueButton && styles.textDarkBlue]}>
            {title}
          </Text>
          {
            loading &&
            <Image
              style={{ width: 22, height: 22, position: 'absolute', right: 20 }}
              source={gif}
            />
          }
        </TouchableOpacity>
      );
    }
     else {
 return (
  <TouchableOpacity
  activeOpacity={0.8}
  style={[
    styles.connectedButton,
    styles.justifyAlignCenter,
  ]}>
  <Text style={styles.buttonText}>
   Connected
  </Text>
  {
    <Image
      style={{ width: 22, height: 22, position: 'absolute', right: 20 }}
      source={group2}
    />
  }
</TouchableOpacity> 
 )
     }
 
};

export default RectangleButton;
