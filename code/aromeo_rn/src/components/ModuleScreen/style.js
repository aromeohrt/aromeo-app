import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const hasNotch = DeviceInfo.hasNotch();
const SceenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = ScaledSheet.create({
  container: {
    height: ScreenHeight / 1.5,
    width: '57%',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
   
  },
  Flex1: {
    flex: 1
  },
  touchableView: {
    height: ScreenHeight,
    width: SceenWidth,
    position: 'absolute'
  },
  centerTimmerWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: ScreenHeight / 3
  },
  centerCircle: {
    height: '250@ms',
    width: '250@ms',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  FlexDirectionRow: {
    flexDirection: 'row',
  },
  TimeText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: '19@ms',
    lineHeight: '19@ms',
    paddingHorizontal: '10@ms',
    textAlign: 'center',
  },
  minText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: '14@ms',
    lineHeight: '18@ms',
    textAlign: 'center',
  },
  bottomButtonsWrapper: {
    // flex: 1,
    marginHorizontal: '50@ms',
    // justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '48@ms',
  },
  smallRoundButtonWrapper: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40@ms',
    // borderWidth:1
  },
});

export default styles;
