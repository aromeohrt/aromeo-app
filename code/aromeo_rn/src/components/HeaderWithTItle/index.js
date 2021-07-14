import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import constants from '../../constants';

type Props = {
  onPressBackButton: Object,
  title: String,
  iconColor: String,
  saveInfo: Object,

};

const HeaderWithTitle = ({ onPressBackButton, title, iconColor, showSave, saveInfo, type, name ,shadow }: Props) => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressBackButton}
        // activeOpacity={0.8}
        style={styles.BackButton}>
       <View  style={styles.ImageStyle}>
       <Image
          source={type ? constants.Images.BackIcon : constants.Images.BackDarkIcon}
          resizeMode={'cover'}
          style={[shadow ? styles.ShadowImageStyle:styles.ImageStyle, iconColor && { tintColor: iconColor }]}
          
        />
       </View>
      </TouchableOpacity>
      <View style={styles.TitelView}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {
        showSave &&
        <TouchableOpacity style={styles.saveText} onPress={saveInfo}>
          <Text style={[styles.titleText, !name && styles.disable]}>Save</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

export default HeaderWithTitle;