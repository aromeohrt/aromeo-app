import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import RectangleButton from '../RectangleButton';
import I18n from '../../utilities/locale';

type guidepage = {
  image: String,
  step: Number,
  title: string,
  showSteps: Boolean,
  headingText: String,
  onPressFunction: Object,
  nodeviceFound: Boolean,
  nodeviceText: String,
  onTop: Boolean
};
const GuidePages = ({
  image,
  step,
  title,
  showSteps,
  headingText,
  onPressFunction,
  nodeviceFound,
  nodeviceText,
  onTop
}: guidepage) => {
  return (
    <View style={styles.Flex1}>
       
      {
        onTop && (
          <View style={[styles.IntroWrapper, showSteps && step === 1 && styles.topSpace]}>
            <View style={styles.Flex1}>
              {showSteps === true ? (
                <Text style={[styles.titleText, styles.TextCenter]}>
                  {nodeviceFound ? step : `STEP ${step}:`}
                </Text>
              ) : (
                  <Text style={[styles.titleText1, styles.TextCenter]}>
                    {headingText}
                  </Text>
                )}
              <Text style={styles.DescriptionText}>{title}</Text>
            </View>
          </View>
        )
      }
     <View style={styles.upContainer}>
        <View style={styles.upperImageContainer}>

          <Image source={image} resizeMode={'contain'}  />
        </View>
      </View>
      {
        onTop === undefined && title && (
          <View style={styles.IntroWrapper}>
            <View style={styles.Flex1}>
              {showSteps === true ? (
                <Text style={[styles.titleText, styles.TextCenter]}>
                  {nodeviceFound ? step : `STEP ${step}:`}
                </Text>
              ) : (
                  headingText &&
                  <Text style={[styles.titleText1, styles.TextCenter]}>
                    {headingText}
                  </Text>
                )}
              {
                title &&
                <Text style={styles.DescriptionText}>{title}</Text>
              }
            </View>
          </View>
        )
        
      }
    </View>
  );
};

export default GuidePages;
