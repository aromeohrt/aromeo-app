import React from 'react';
import {View, Platform, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import {BlurView} from '@react-native-community/blur';

type props = {
  icon: String,
  iconName: String,
  onPressIcon: Object,
};

const BlurRoundSmallButton = ({icon, iconName, onPressIcon}: props) => {
  return (
    <View>
      {Platform.OS === 'ios' ? (
        <BlurView
          blurType='light'
          blurAmount={32}
          blurRadius={22}
          downsampleFactor={20}
          overlayColor={'transparent'}
          reducedTransparencyFallbackColor="black"
          style={styles.blurBottons}>
          <TouchableOpacity
            onPress={onPressIcon}
            activeOpacity={0.8}
            style={styles.blurBottons}>
            <Image resizeMode={'contain'} source={icon} style={styles.images} />
          </TouchableOpacity>
        </BlurView>
      ) : (
        <TouchableOpacity
          onPress={onPressIcon}
          activeOpacity={0.8}
          style={styles.blurBottons1}>
          <Image resizeMode={'contain'} source={icon} style={styles.images} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BlurRoundSmallButton;
