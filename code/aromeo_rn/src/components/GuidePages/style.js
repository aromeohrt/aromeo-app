import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import {
  Dimensions
} from 'react-native';

const ScreenHeight = Dimensions.get('window').height;

const styles = ScaledSheet.create({
  Flex1: {
    flex: 1,
  },
  upContainer: {
    height: ScreenHeight / 2.2,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1
  },
  upperImageContainer: {
    width: '302@ms',
    height: '295@ms',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1
  },
  topSpace: {
    paddingTop: '25@ms'
  },
  IntroWrapper: {
    flex: 1.3,
    paddingHorizontal: '20@ms'
  },
  titleText: {
    color: '#39415e',
    fontFamily: 'Montserrat-Light',
    fontSize: verticalScale(14),
    lineHeight: '22@ms',
  },
  titleText1: {
    color: '#39415e',
    fontFamily: 'Montserrat-Medium',
    fontSize: verticalScale(15),
    lineHeight: '20@ms',
    marginVertical: '20@ms',
  },
  notFoundText: {
    color: 'rgb(173,165,177)',
    fontFamily: 'Montserrat-Light',
    fontSize: '12@ms',
    lineHeight: '14@ms',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  TextCenter: {
    textAlign: 'center',
  },
  DescriptionText: {
    color: 'rgb(57,65,94)',
    fontFamily: 'Montserrat-Light',
    fontSize: verticalScale(14),
    lineHeight: '20@ms',
    textAlign: 'center',
    marginTop: '7@ms',
  },
  bottomButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
