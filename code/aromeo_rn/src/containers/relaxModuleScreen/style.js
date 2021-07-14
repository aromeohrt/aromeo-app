import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const hasNotch = DeviceInfo.hasNotch();
const SceenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    height: ScreenHeight,
    width: SceenWidth,
  },
  blurViewEffect: {
    flex: 1,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  Flex1: {
    flex: 1,
  },
  FlexDirectionRow: {
    flexDirection: 'row',
  },
  IndicatorWrapper: {
    height: '20@ms',
    width: '30@ms',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    position: 'absolute',
    zIndex: 1,
    marginTop: hasNotch
      ? (Platform.OS === 'android' ? "7%" : "9%")
      : (Platform.OS === 'android' ? "5%" : "7%"),
  },
  centerTimmerWrapper: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '50@ms',
  },
  bottomButtonsWrapper: {
    flex: 1,
    marginHorizontal: '50@ms',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  smallRoundButtonWrapper: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blurBottons: {
    height: '48@ms',
    width: '48@ms',
    borderRadius: '24@ms',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(201,195,204,0.52)',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: '14@ms',
    lineHeight: '16@ms',
    textAlign: 'center',
  },
  TimeText: {
    color: 'white',
    fontFamily: 'Montserrat-Semibold',
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
  startBtn: {
    height: '44@ms',
    width: '260@ms',
    borderRadius: '22@ms',
    backgroundColor: 'rgba(201,195,204,0.52)',
  },
  justifyAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCircle: {
    height: '250@ms',
    width: '250@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
