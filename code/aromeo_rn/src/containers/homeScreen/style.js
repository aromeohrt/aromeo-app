import {ScaledSheet} from 'react-native-size-matters';
import {Platform} from 'react-native';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: 'white',
  },
  BackgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundVideo: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  container1: {
    flex: 1,
    paddingBottom: '65@ms',
    backgroundColor: '#11111150'
  },
  upperContainer: {
    flex: 1,
    margin: '20@ms',
    justifyContent: 'center',
  },
  headingText: {
    color: 'white',
    fontSize: '28@ms',
    lineHeight: '30@ms',
    fontFamily: 'Montserrat-Medium',
    elevation: 3,
    // backgroundColor:'transparent',
    shadowColor: '#abaaa9',
    shadowOpacity: 0.7,
    shadowRadius: 15,
    shadowOffset: {
      height: 0,
      width: 1,
    }
  },
  titleText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    marginTop: '7@ms',
    elevation: 10,
    shadowColor: '#abaaa9',
    shadowOpacity: 0.7,
    shadowRadius: 15,
    shadowOffset: {
      height: 1,
      width: 1,
    }
  },
  titleTextWrapper: {
    minHeight: '40@ms',
  },
  connectButton: {
    height: '44@ms',
    borderRadius: '22@ms',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'transparent',
  },
  blurWidthWithout: {
    width: '212@ms'
  },
  blurWidth: {
    width: '240@ms'
  },
  connectionButton: {
    backgroundColor: 'rgba(201,195,204,0.22)',
    width: '240@ms',
    height: '44@ms',
    borderRadius: '22@ms',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '24@ms'
  },
  connectionButtonWithout: {
    backgroundColor: 'rgba(201,195,204,0.22)',
    width: '212@ms',
    height: '44@ms',
    borderRadius: '22@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIconButton: {
    height: '44@ms',
    width: '44@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '22@ms',
  },
  connectionButton1: {
    backgroundColor: 'rgba(201,195,204,0.52)',
    width: '212@ms',
    height: '44@ms',
    borderRadius: '22@ms',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '10@ms',
  },
  buttonText: {
    color: 'white',
    zIndex: 2,
    fontFamily: 'Montserrat-Regular',
    fontSize: '14@ms',
    lineHeight: '16@ms',
    elevation: 3,
    shadowColor: '#111111',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 1,
    }
  },
  nameWidth: {
    width: '200@ms'
  },
  flex1: {
    flex: 1,
  },
  relaxTypeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '25@ms',
  },
  relaxButton: {
    height: '75@ms',
    width: '75@ms',
    borderRadius: '37.5@ms',
  },
  relexButtonImage: {
    height: '100%',
    width: '100%',
    tintColor: '#ffffff',
  },
  buttonBattery: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '10@ms',
  },
  batterySetting: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  batteryICON: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginHorizontal:"15%",
    // flex: 1,
    height: '22@ms',
    width: '22@ms',
  },
  settingBatteryIcon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    // marginHorizontal:"10%",
    // flex: 1,
    height: '22@ms',
    width: '22@ms',
  },
  deviceStatusText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: '12@ms',
    lineHeight: '14@ms',
    marginLeft: '10@ms',
  },
  deviceStatusWrapper: {
    marginHorizontal: '30@ms',
    marginTop: '10@ms',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  deviceStatusLight: {
    height: '4@ms',
    width: '4@ms',
    borderRadius: '3@ms',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#d4ffd1',
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 4,
    }
  },
  greenLight: {
    backgroundColor: '#91f68a'
  },
  grayLight: {
    backgroundColor: '#67616a'
  },
  ImageWrapper: {
    height: '40@ms',
    width: '40@ms',
    marginTop: '5@ms',
    alignSelf: 'center',
  },
  justifyAlignItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningRedBg:{
    backgroundColor: '#e17b7b'
  },
  btn1Color:{
    backgroundColor: '#6775AC',
    width:"80%"
  }
});

export default styles;
