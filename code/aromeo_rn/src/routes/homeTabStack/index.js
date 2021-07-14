// import * as React from 'react';
// import {View, TouchableOpacity, Platform, Image} from 'react-native';
// import {ScaledSheet} from 'react-native-size-matters';
// import LinearGradient from 'react-native-linear-gradient';
// import constants from '../../constants';
// import DeviceInfo from 'react-native-device-info';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import {
//   HomeScreen,
//   UserProfileScreen,
//   FocusModuleScreen,
// } from '../../containers';

// const Tab = createBottomTabNavigator();

// const hasNotch = DeviceInfo.hasNotch();

// const styles = ScaledSheet.create({
//   tabBar: {
//     backgroundColor: 'transparent',
//     borderColor: 'red',
//   },
//   tabStyle: {
//     backgroundColor: 'transparent',
//     position: 'relative',
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   customTab: {
//     height: Platform.OS === 'ios' ? '60@ms' : '68@ms',
//     position: 'absolute',
//     width: '100%',
//     backgroundColor: 'transparent',
//     bottom: Platform.OS === 'ios' ? (hasNotch ? 15 : 0) : 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default function TabStack() {
//   return (
//     <Tab.Navigator
//       tabBarOptions={{
//         activeTintColor: 'white',
//         inactiveTintColor: 'red',
//         style: styles.tabBar,
//         tabStyle: styles.tabStyle,
//       }}
//       tabBar={(props) => <MyTabBar {...props} />}>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="UserProfile" component={UserProfileScreen} />
//     </Tab.Navigator>
//   );
// }

// const MyTabBar = ({state, descriptors, navigation}) => {
//   return (
//     <View style={{flexDirection: 'row'}}>
//       {state.routes.map((route, index) => {
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             activeOpacity={0.9}
//             accessibilityRole="button"
//             accessibilityStates={isFocused ? ['selected'] : []}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{
//               flex: 1,
//               backgroundColor: 'transparent',
//               bottom: 0,
//               // backgroundColor: 'transparent',
//             }}>
//             <View style={styles.customTab}>
//               <LinearGradient
//                 colors={[
//                   '#11111101',
//                   '#11111103',
//                   '#11111103',
//                   '#11111109',
//                   '#11111109',
//                   '#11111109',
//                   '#11111112',
//                   '#11111115',
//                   '#11111118',
//                   '#11111121',
//                   '#11111124',
//                   // '#11111127',
//                   // '#11111130',
//                   // '#00000020',
//                 ]}
//                 style={{height: 15, width: '100%'}}
//               />
//               {label === 'Home' ? (
//                 <View
//                   style={{
//                     flex: 1,
//                     width: '25%',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     borderTopWidth: isFocused ? 2 : 0,
//                     borderTopColor: 'white',
//                     borderRadius: 0,
//                   }}>
//                   <View style={{height: 26, width: 26}}>
//                     <Image
//                       style={{height: '100%', width: '100%'}}
//                       source={
//                         !isFocused
//                           ? constants.Images.tabBarHome
//                           : constants.Images.tabBarHomeActive
//                       }
//                       resizeMode="contain"
//                     />
//                   </View>
//                 </View>
//               ) : (
//                 <View
//                   style={{
//                     flex: 1,
//                     width: '20%',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     borderTopWidth: isFocused ? 3 : 0,
//                     borderTopColor: 'white',
//                     borderRadius: 2,
//                   }}>
//                   <View style={{height: 26, width: 26}}>
//                     <Image
//                       style={{height: '100%', width: '100%'}}
//                       source={constants.Images.tabBarProfile}
//                       resizeMode="contain"
//                     />
//                   </View>
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

import * as React from 'react';
import { View, TouchableOpacity, Platform, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import constants from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  HomeScreen,
  UserProfileScreen
} from '../../containers';

const Tab = createBottomTabNavigator();

const hasNotch = DeviceInfo.hasNotch();

const styles = ScaledSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderColor: 'red',
  },
  tabStyle: {
    backgroundColor: 'transparent',
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  customTab: {
    height: Platform.OS === 'ios' ? '60@ms' : '68@ms',
    position: 'absolute',
    width: '100%',
    backgroundColor: 'transparent',
    bottom: Platform.OS === 'ios' ? (hasNotch ? 15 : 0) : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTabContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? '60@ms' : '68@ms',
    width: '100%',
    backgroundColor: 'transparent',
  },
});

export default function TabStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'red',
        style: styles.tabBar,
        tabStyle: styles.tabStyle,
      }}
      tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.mainTabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              bottom: 0,
            }}>
            <View style={styles.customTab}>
              <LinearGradient
                colors={[
                  '#11111101',
                  '#11111103',
                  '#11111103',
                  '#11111109',
                  '#11111109',
                  '#11111109',
                  '#11111112',
                  '#11111115',
                  '#11111118',
                  '#11111121',
                  '#11111124',
                  // '#11111127',
                  // '#11111130',
                  // '#00000020',
                ]}
                style={{ height: 15, width: '100%' }}
              />
              {label === 'Home' ? (
                <View
                  style={{
                    flex: 1,
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 0,
                  }}>
                  {
                    isFocused &&
                    <View style={{
                      borderRadius: 50, width: 42,
                      height: 2.5,
                      backgroundColor: 'white', position: 'absolute', top: 0
                    }} />
                  }
                  <View style={{ height: 26, width: 26 }}>
                    <Image
                      style={{ height: '100%', width: '100%' }}
                      source={
                        !isFocused
                          ? constants.Images.tabBarHome
                          : constants.Images.tabBarHomeActive
                      }
                      resizeMode="contain"
                    />
                  </View>
                </View>
              ) : (
                  <View
                    style={{
                      flex: 1,
                      width: '20%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 0
                    }}>
                    {
                      isFocused &&
                      <View style={{
                        borderRadius: 50, width: 42,
                        height: 2.5,
                        backgroundColor: '#c9c3cc', position: 'absolute', top: 0
                      }} />
                    }
                    <View style={{ height: 26, width: 26 }}>
                      <Image
                        style={{ height: '100%', width: '100%' }}
                        source={
                          !isFocused
                            ? constants.Images.tabBarProfile
                            : constants.Images.tabBarProfileActive}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
