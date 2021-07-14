import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../../components';
import {
  SignUpScreen,
  SignInScreen,
  ConfirmEmailDefaultScreen,
  FirstForgotPassword,
  SetNewPasswordScreen,
} from '../../containers';
import styles from '../style';
const Stack = createStackNavigator();

function BeforeLoginStack() {
  const screenOptions = () => {
    return {
      header: () => null, gestureEnabled: false
    }
  }
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => (
          <Header startColor={'#221d67'} endColor={'#ab3c7f'} />
        ),
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleStyle: styles.headerBackTitleStyle,
        headerTintColor: 'white',
        headerPressColorAndroid: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="ConfirmEmailDefaultScreen"
        component={ConfirmEmailDefaultScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="FirstForgotPassword"
        component={FirstForgotPassword}
        options={screenOptions}
      />
      <Stack.Screen
        name="SetNewPasswordScreen"
        component={SetNewPasswordScreen}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}

export default BeforeLoginStack;
