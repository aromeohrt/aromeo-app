//import liraries
import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './style';

type PageIndicatorProps = {
  stepIndex: Number,
};

const GuidePageIndicator = ({stepIndex}: PageIndicatorProps) => {
  return (
    <View style={styles.stepPostionContainer}>
      <View style={stepIndex === 0 ? styles.activeStep : styles.deActiveStep} />
      <View
        style={
          stepIndex !== 1
            ? [styles.deActiveStep, styles.marginHorizontal10]
            : [styles.activeStep, styles.marginHorizontal10]
        }
      />
      <View style={stepIndex === 2 ? styles.activeStep : styles.deActiveStep} />
    </View>
  );
};
export default GuidePageIndicator;
