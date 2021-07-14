import React from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import styles from './style';

type props = {
  title: String,
  onPressIcon: Object,
};

const BlurRectangleButton = ({title, onPressIcon}: props) => {
  return (
    <View>
      {Platform.OS === 'ios' ? (
        <BlurView
          blurType="light"
          blurAmount={32}
          reducedTransparencyFallbackColor="black"
          style={styles.startBtn}>
          <TouchableOpacity
            onPress={onPressIcon}
            activeOpacity={0.8}
            style={[styles.startBtn, styles.justifyAlignCenter]}>
            <Text style={styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        </BlurView>
      ) : (
        <TouchableOpacity
          onPress={onPressIcon}
          activeOpacity={0.8}
          style={[styles.startBtn1, styles.justifyAlignCenter]}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BlurRectangleButton;
