import React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import styles from './style';
import {BlurView} from '@react-native-community/blur';

type props = {
  icon: String,
  iconName: String,
  onPressIcon: Object,
};

const BlurRoundButton = ({icon, iconName, onPressIcon}: props) => {
  return (
    <View>
      {Platform.OS === 'ios' ? (
        <BlurView
          blurType="light"
          blurAmount={20}
          overlayColor={'transparent'}
          reducedTransparencyFallbackColor="white"
          style={styles.relaxButton}>
          <TouchableOpacity
            onPress={() => onPressIcon(iconName)}
            style={[styles.relaxButton, styles.justifyAlignItem]}
            activeOpacity={0.8}>
            <View style={styles.ImageWrapper}>
              <Image
                style={styles.relexButtonImage}
                source={icon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </BlurView>
      ) : (
        <TouchableOpacity
          onPress={() => onPressIcon(iconName)}
          style={[styles.relaxButton1, styles.justifyAlignItem]}
          activeOpacity={0.8}>
          <View style={styles.ImageWrapper}>
            <Image
              // blurRadius={2}
              style={styles.relexButtonImage}
              source={icon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      )}
      <Text style={styles.buttonText}>{iconName}</Text>
    </View>
  );
};

export default BlurRoundButton;
