import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import constants from '../../constants';

const CustomTextInput = ({
  keyboardType,
  changeText,
  value,
  label,
  visible,
  secureTextEntry,
  placeholder,
  placeholderTextColor,
  errorMsg,
  autoFocus,
  
}: Props) => {
  let [inputStyle, setInputStyle] = useState(styles.grayBorder);
  let [secureText, setSecureText] = useState('Show');
  let [secureTextStatus, setSecureTextStatus] = useState(true);
  
  const textInputStyle = (focus) => {
   if(focus == false && value.length == 0){
    setInputStyle(styles.grayBorder)
   }
   else {
    setInputStyle(styles.purpleBorder)
   }
  }

  const onSecureTextChange = () => {
    if (secureText === 'Show') secureText = 'Hide';
    else secureText = 'Show';
    setSecureText(secureText);
    setSecureTextStatus(!secureTextStatus);
  };

  const onChange = (text) => {
    changeText(text)
    textInputStyle()
  }

  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.input}>{label}</Text>}
      <TextInput
        style={[
          errorMsg ? styles.redBorder :
            inputStyle,
          styles.input
        ]}
        onFocus={() => textInputStyle(true)}
        onBlur={() => textInputStyle(false)}
        onChangeText={(text) => onChange(text)}
        value={value}
        autoFocus={autoFocus ? autoFocus : false}
        autoCapitalize={label !== 'Name' ? "none" : "words"}
        secureTextEntry={visible ? secureTextStatus : false}
        keyboardType={keyboardType && keyboardType}
        placeholder={placeholder && placeholder}
        placeholderTextColor={placeholderTextColor && placeholderTextColor}
      />
      {visible && value ? (
        <TouchableOpacity
          style={[styles.visibleContainer, errorMsg ? styles.addBottom : styles.removeBottom]}
          onPress={() => {
            setSecureText(!secureText)
            onSecureTextChange()
          }}>
          <Text style={styles.input}>{secureText}</Text>
        </TouchableOpacity>
      ) : null}
      {
        errorMsg ?
          <Text style={styles.errorMsgStyle}>{errorMsg}</Text>
          :
          null
      }
    </View>
  );
};

export default CustomTextInput;
