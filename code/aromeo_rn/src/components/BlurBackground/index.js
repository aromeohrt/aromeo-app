import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Dimensions, Platform,TouchableOpacity,StatusBar } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import ImageColors, { getColors } from "react-native-image-colors";
import Video from 'react-native-video';
import styles from './style';

const SceenWidth = Dimensions.get('window').width;
type childProp = {
  children: React.Node,
  backgrounImage: String,
  backgroundVideo: String,
};

const BlurBackground = (props: childProp) => {
  let [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    getColors()
  }, []);

  let getColors = async () => {
    const colors = await ImageColors.getColors(props.backgrounImage)

    if (colors.platform === "android") {
      // Access android properties
      // e.g.
      const dominantColor = colors.dominant
      if (dominantColor[1] === 'F')
        setShowOverlay(true)
    } else {
      // Access iOS properties
      // e.g.
      const backgroundColor = colors.background
      if (backgroundColor[1] === 'F')
        setShowOverlay(true)
    }
  }

  return (
    <View style={{ flex: 1 }}>
    
      {Platform.OS === 'ios' ? (
        <>
          {props.blur === true ? (
            <ImageBackground
              resizeMode={'stretch'}
              source={props.backgrounImage}
              style={[styles.container]}>
                 <StatusBar hidden={false}/>
                  <TouchableOpacity style={{flex:1,}} onPress={props.onPress!==undefined?props.onPress:null} activeOpacity={1} >
              <Video
                source={props.backgroungVideo}
                style={styles.backgroundVideo}
                muted={false}
                repeat={true}
                fullscreen={false}
                playInBackground={true}
                volume={1.0}
                resizeMode={'cover'}
                // filterEnabled={true}
                // filter={FilterType.INVERT}
                rate={1.0}
              // ignoreSilentSwitch={'obey'}
              />
              <View>{props.children}</View>
              </TouchableOpacity>
            </ImageBackground>
          ) : (
              <ImageBackground
                blurRadius={30}
                resizeMode={'stretch'}
                source={props.backgrounImage}
                style={[styles.container, { width: SceenWidth, height: 400 }]}>
                 
                  {/* <TouchableOpacity style={{flex:1}} > */}
                <View style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor : "rgba(0,0,0, 0.4)",
                    
                  backgroundColor : "#11111150"
                  // backgroundColor: showOverlay || props.extradark ? '#11111150' : 'transparent',
                }}>
                  {props.children}
                </View>
                {/* <BlurView
                  blurType="dark"
                  blurAmount={10}
                  blurRadius={12}
                  downsampleFactor={10}
                  overlayColor={'transparent'}
                  reducedTransparencyFallbackColor="white"
                  style={styles.container}>
                  <View>{props.children}</View>
                </BlurView> */}
                {/* </TouchableOpacity> */}
              </ImageBackground>
            )}
        </>
      ) : (
          <>
            {props.blur === true ? (
              <ImageBackground
                resizeMode={'stretch'}
                source={props.backgrounImage}
                style={[styles.container]}>
                   <StatusBar hidden={false}/>
                   <TouchableOpacity style={{flex:1}} onPress={props.onPress!==undefined?props.onPress:null} activeOpacity={1} >
                <Video
                  source={props.backgroungVideo}
                  style={styles.backgroundVideo}
                  muted={false}
                  repeat={true}
                  fullscreen={false}
                  playInBackground={true}
                  volume={1.0}
                  resizeMode={'cover'}
                  // filterEnabled={true}
                  // filter={FilterType.INVERT}
                  rate={1.0}
                // ignoreSilentSwitch={'obey'}
                />
                
                <View>{props.children}</View>
                </TouchableOpacity>
              </ImageBackground>
            ) : (
                <ImageBackground
                  resizeMode={'stretch'}
                  blurRadius={7}
                  source={props.backgrounImage}
                  style={[styles.container, { width: SceenWidth, height: 400}]}>
                     <StatusBar hidden={false}/>
                     {/* <TouchableOpacity style={{flex:1}} onPress={()=>{console.warn("Here 4")}} > */}
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor : "rgba(0,0,0, 0.4)",
                    
                    // backgroundColor : "#11111150"
                    // backgroundColor: showOverlay || props.extradark ? '#11111150' : 'transparent',
                  }}>
                    {props.children}
                  </View>
                  {/* </TouchableOpacity> */}
                </ImageBackground>
              )}
          </>
        )}
      
    </View>
  );
};

export default BlurBackground;
