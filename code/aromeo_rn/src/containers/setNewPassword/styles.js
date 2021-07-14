import { ScaledSheet, } from 'react-native-size-matters';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors'

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcfb'
  },
  subHeaderContainer: {
    alignItems: 'center',
    marginVertical: '20@ms',
  },
  subHeaderTxt: {
    fontSize: '16@ms',
    color: Colors.textDarkBlue,
    fontFamily: 'Montserrat-Medium',
  },
  subHeaderTxt2: {
    fontSize: '14@ms',
    color: Colors.textDarkBlue,
    fontFamily: 'Montserrat-Light',
    alignSelf: 'center',
    marginBottom: '25@ms'
  },
  body: {
    // borderWidth:1,
    flex: 1,
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 0.7,
    // paddingTop:'10@ms',
    // alignItems:'center',
  },
  resendText: {
    fontSize: '12@ms',
    color: Colors.textGrey2,
    alignSelf: 'center',
    marginTop: '20@ms',
    fontFamily: 'Montserrat-Light'
  },
  underline: {
    textDecorationLine: "underline"
  }
});

export default styles;
