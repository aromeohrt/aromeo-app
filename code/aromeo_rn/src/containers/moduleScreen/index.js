//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

// create a component

type props = {
  navigation: Object,
  route: Object,
};

const ModuleScreen = ({navigation, route}: props) => {
  const {screenName} = route.params;
  return (
    <ImageBackground
      source={{
        uri:
          screenName === 'Focus'
            ? 'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?ixlib=rb-1.2.1&w=1000&q=80'
            : screenName === 'Relax'
            ? 'https://recoverit.wondershare.com/uploads/image-15-5.jpg'
            : screenName === 'Sleep'
            ? 'https://fsb.zobj.net/crop.php?r=hSjpokrlMkODoVC6ZHGiVNzhoCBnuw4fKaDANWoADHWr5ljzduu6zxB_vtFrCp09Xu7e7iyZNofVbCrVXMNGUbzrUytkWE00l5M7WG_An-51rU_eTIEQMrG0f-mlfXrQ_onLv4S5jTnNqcUa:'
            : '',
      }}
      resizeMode={'cover'}
      style={styles.container}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default ModuleScreen;
