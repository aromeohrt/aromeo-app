//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from './style';

type Props = {
  message: String
};

const Toast = ({ headingText, message, customColor, removeToast }: Props) => {
  const [timerValue, setTimerValue] = useState(10);

  useEffect(() => {
    if (timerValue > 0) {
      let timer = setInterval(tick, 1000);
      return () => clearInterval(timer)
    } else if(timerValue === 0 && removeToast) {
      removeToast()
    }
  }, [timerValue])

  const tick = () => {
    setTimerValue(timerValue - 1)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.buttonWrapper, customColor !== undefined && { backgroundColor: customColor }]}>
        <Text style={[styles.headingTitleText, styles.boldText]}>
          {headingText}
        </Text>
        <Text style={[styles.headingTitleText, styles.lightText]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

export default Toast;
