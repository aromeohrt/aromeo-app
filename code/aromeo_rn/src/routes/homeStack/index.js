import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../../components';
import {
  ConnectionScreen,
  HowToConnect,
  ModuleScreen,
  FocusModuleScreen,
  RelaxModuleScreen,
  SleepModuleScreen,
  ProfileScreen,
  GenderScreen,
  NameScreen,
  MyAccount,
  ResetPassword,
  ForgotPassword,
  AboutScreen,
  DeviceSettings,
  ModeButtonSettings,
  DiffusionSettingScreen,
  SetNewPasswordScreen,
  SignUpScreen,
  SignInScreen,
  ConfirmEmailDefaultScreen,
  FirstForgotPassword
} from '../../containers';
import TabStack from '../homeTabStack';
import { TransitionPresets } from '@react-navigation/stack';
import styles from '../style';
const Stack = createStackNavigator();

function HomeStack() {
  const screenOpts = (type) => {
    let options = {
      header: () => null, gestureEnabled: false
    }
    if (type === 'bottomUp')
      options = { ...options, ...TransitionPresets.ModalSlideFromBottomIOS }
    return options
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
        name="HomeScreen"
        component={TabStack}
        options={screenOpts}
      />
      <Stack.Screen
        name="ConnectionScreen"
        component={ConnectionScreen}
        options={screenOpts('bottomUp')}
      />
      <Stack.Screen
        name="HowToConnect"
        component={HowToConnect}
        options={screenOpts}
      />
      <Stack.Screen
        name="FocusModuleScreen"
        component={FocusModuleScreen}
        options={screenOpts('bottomUp')}
      />
      <Stack.Screen
        name="RelaxModuleScreen"
        component={RelaxModuleScreen}
        options={screenOpts('bottomUp')}
      />
      <Stack.Screen
        name="SleepModuleScreen"
        component={SleepModuleScreen}
        options={screenOpts('bottomUp')}
      />
      <Stack.Screen
        name="ModuleScreen"
        component={ModuleScreen}
        options={screenOpts}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={screenOpts}
      />
      <Stack.Screen
        name="GenderScreen"
        component={GenderScreen}
        options={screenOpts}
      />
      <Stack.Screen
        name="NameScreen"
        component={NameScreen}
        options={screenOpts}
      />
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={screenOpts}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={screenOpts}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={screenOpts}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={screenOpts}
      />
      <Stack.Screen
        name="DeviceSettings"
        component={DeviceSettings}
        options={screenOpts}
      />
      <Stack.Screen
        name="ModeButtonSettings"
        component={ModeButtonSettings}
        options={screenOpts}
      />
      <Stack.Screen
        name="DiffusionSettingScreen"
        component={DiffusionSettingScreen}
        options={screenOpts}
      />
      <Stack.Screen
        name="SetNewPasswordScreen"
        component={SetNewPasswordScreen}
        options={screenOpts}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={screenOpts}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={screenOpts}
      />
      <Stack.Screen
        name="ConfirmEmailDefaultScreen"
        component={ConfirmEmailDefaultScreen}
        options={screenOpts}
      />
      <Stack.Screen
        name="FirstForgotPassword"
        component={FirstForgotPassword}
        options={screenOpts}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
