import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from "@react-native-community/netinfo";
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';

import HomeStack from './homeStack';
import { Message } from '../components';
import * as AppActionTypes from '../actions/app-actions-types';
import BeforeLoginStack from './beforeLoginStack';
import SplashScreen from 'react-native-splash-screen';
const Stack = createStackNavigator();

let Navigator = (props) => {
  useEffect(() => {
    setTimeout(() => { SplashScreen.hide() }, 1000)
    const unsubscribe = NetInfo.addEventListener(state => {
      props.saveConnectionStatus(state.isConnected)
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
    
  //   // Auth.currentUserInfo()
  //   //   .then(user => {
  //   //     console.warn("uSER",user)
  //   //     if(user== null){
  //   //     }
  //   //     else if(Object.keys(user).length==0){
          
  //   //     }
  //   //     else props.showLoader() //login
  //   //   })
  // },[]);


  

 
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {props.loading ? (
          <Stack.Screen name="TabStack" component={HomeStack} />
        ) : (
            <Stack.Screen name="BeforeLoginStack" component={BeforeLoginStack} />
          )}
      </Stack.Navigator>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
  state => ({
    loading: state.app.loading,
    internetConnection: state.app.internetConnection
  }),
  { ...AppActionTypes }
)(Navigator);
