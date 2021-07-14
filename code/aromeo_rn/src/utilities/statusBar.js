import React from "react"
import {StatusBar,View,Text,Platform} from "react-native"

 const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 32 : StatusBar.currentHeight;
 export const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{height:STATUSBAR_HEIGHT,  backgroundColor }}>
    <StatusBar hidden={false} barStyle="light-content"  backgroundColor={backgroundColor}/>
  </View>
);
