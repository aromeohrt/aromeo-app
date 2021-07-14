import {ScaledSheet} from 'react-native-size-matters';
import {Dimensions,Platform} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = ScaledSheet.create({
  container: {
    height: ScreenHeight,
    width: ScreenWidth,
  },
  backgroundImageContainer: {
    flex: 1,
  },
  crossBtnWrapper: {height: '65@ms', width: '65@ms', alignSelf: 'flex-end',marginTop:"7%"},
  crossBtn: {height: '100%', width: '100%',shadowOffset: {width: 0, height: 0},
  shadowOpacity: 1,
  shadowRadius: 2,
  shadowColor: 'black',
  backgroundColor:"transparent",
//  elevation:2,
 opacity:1},
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: '14@ms',
    lineHeight: '14@ms',
    textAlign: 'center',
  },
  headingText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: '16@ms',
    lineHeight: '18@ms',
    textAlign: 'center',
    marginTop: '35@ms',
  },
  headingTitleText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: '14@ms',
    lineHeight: '14@ms',
    textAlign: 'center',
    marginVertical: '15@ms',
  },
  requredText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: '10@ms',
    lineHeight: '12@ms',
    textAlign: 'center',
    marginVertical: '15@ms',
  },
  pickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '70@ms'
  },
  pickerWrapper1: {
    justifyContent: 'center',
    marginTop: '70@ms',
    alignItems: 'center'
  },
  picker1Style: {height: '90@ms', width: '40@ms', alignSelf: 'center'},
  picker1ItemStyle: {color: 'white', fontSize: 20, fontFamily: 'Montserrat-Medium'},
  picker2Style: {height: '90@ms', width: '30@ms', alignSelf: 'center', },
  picker2ItemStyle: {color: 'white', fontSize: 15, fontFamily: 'Montserrat-Medium'},
  bottomWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS=="android"?"13%":"13%",
  },
  buttonBlurWrapper: {height: '50@ms', width: '295@ms', borderRadius: '25@ms'},
  buttonWrapper: {
    height: '50@ms',
    width: '295@ms',
    borderRadius: '25@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AndroidMin: {
    color: 'white',
    fontSize: '14@ms',
    fontFamily: 'Montserrat-Light',
    position: 'absolute',
    right: '36%'
  }
});

export default styles;
