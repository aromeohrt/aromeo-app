import {ScaledSheet, verticalScale} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(254,252,251)'
  },
  Flex1: {
    flex: 1,
  },
  IntroWrapper: {
    flex: 1.3,
    paddingHorizontal: '20@ms',
  },
  TextCenter: {
    textAlign: 'center',
  },
  bottomButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchingText: {
    color: 'rgb(57,65,94)',
    fontFamily: 'Montserrat-Light',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    textAlign: 'center',
  },
  selectText: {
    color: 'rgb(57,65,94)',
    fontFamily: 'Montserrat-Medium',
    fontSize: '16@ms',
    lineHeight: '20@ms',
    textAlign: 'center',
  },
  notFoundText: {
    color: 'rgb(173,165,177)',
    fontFamily: 'Montserrat-Light',
    fontSize: '12@ms',
    lineHeight: '14@ms',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  stepTextContainer: {
    width: '88%',
    alignSelf: 'center',
  },
  upContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperImageContainer: {
    width: '302@ms',
    height: '295@ms',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: '16@ms',
    lineHeight: '20@ms',
    marginVertical: '20@ms',
  },
  DescriptionText: {
    color: 'rgb(57,65,94)',
    fontFamily: 'Montserrat-Light',
    fontSize: verticalScale(14),
    lineHeight: '20@ms',
    textAlign: 'center',
    marginTop: '7@ms',
  },
  SearchbuttonText: {
    color: 'rgb(255,255,255)',
    fontFamily: 'Montserrat-Light',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    textAlign: 'center',
  },
  buttonContainer: {
    height: '44@ms',
    width: '260@ms',
    backgroundColor: 'rgb(103,117,172)',
    borderRadius: '22@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
