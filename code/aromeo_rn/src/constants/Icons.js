import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const myIcon = (props) => {
  return (
    <Icon
      name="home"
      size={props.size ? props.size : 10}
      color={props.color ? props.color : '#900'}
      light
    />
  );
};
export default {
  myIcon,
};
