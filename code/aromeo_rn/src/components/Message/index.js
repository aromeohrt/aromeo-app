import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import styles from './style';
import constants from '../../constants';
import {ScaledSheet} from 'react-native-size-matters';
type Props = {
  message: String
};

const Message = ({ message, customColor, code, emptyError, forConnection,MessageOnceDisplayed,extradepth }: Props) => {
  const [timerValue, setTimerValue] = useState(2);

  useEffect(() => {
    if (forConnection === undefined) {
      if (timerValue > 0) {
        let timer = setInterval(tick, 1000);
        return () => clearInterval(timer)
      } else if (timerValue === 0 && emptyError) {
        emptyError()
      }
if(MessageOnceDisplayed){
  MessageOnceDisplayed(true)
}
    }
  }, [timerValue])

  tick = () => {
    setTimerValue(timerValue - 1)
  }
 

  return (
    <View style={extradepth ? styles.extradepthContainer  : styles.container}>
      {/* <TouchableOpacity activeOpacity={1} style={[styles.buttonWrapper, customColor !== undefined && { backgroundColor: customColor }, forConnection && styles.connectionBorder]}> */}
      <View style={[styles.buttonWrapper, customColor !== undefined && { backgroundColor: customColor }, forConnection && styles.connectionBorder]}>
     
        <Text style={styles.headingTitleText}>
          {message} {
            code ? `[${code}]` : null
          }
        </Text>
        {forConnection &&
          <TouchableOpacity onPress={emptyError} style={styles.closeIcon}>
            <Image source={constants.Images.CloseBlack} style={{ tintColor: 'white' }} />
          </TouchableOpacity>}
       
      </View>
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default Message;
