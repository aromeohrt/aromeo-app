import {ScaledSheet} from 'react-native-size-matters';
import {Platform} from 'react-native';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcfb'
  },
  nameText: {
    fontFamily: 'Montserrat-Light',
    fontSize: '16@ms',
    lineHeight: '16@ms',
    textAlign: 'center',
    marginVertical: '15@ms',
    paddingLeft: '10@ms',
  },
  forgotText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: '18@ms',
    lineHeight: '18@ms',
    textAlign: 'center',
    marginVertical: '20@ms'
  },
  nameTextWidth: {
    width: '230@ms'
  },
  textDarkBlue: {
    color: '#39415e'
  },
  brandPurple: {
    color: '#6775ac'
  },
  textGrey2: {
    color: '#ada5b1'
  },
  optionContainer: {
    paddingVertical: '8@ms',
    paddingHorizontal: '18@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#c9c3cc'
  },
  optionTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: '#f9f6f6',
    paddingVertical: '5@ms'
  },
  profileImage: {
    width: '50@ms', 
    height: '50@ms'
  },
  appImage: {
    width: '120@ms', 
    height: '120@ms',
    alignSelf: 'center'
  }
});

export default styles;
