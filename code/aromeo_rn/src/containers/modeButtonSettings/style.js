import {ScaledSheet} from 'react-native-size-matters';
import {Platform} from 'react-native';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcfb',
  },
  nameText: {
    fontFamily: 'Montserrat-Light',
    fontSize: '16@ms',
    lineHeight: '16@ms',
    textAlign: 'center',
    marginVertical: '15@ms',
    paddingLeft: '10@ms'
  },
  brandPurple: {
    backgroundColor: '#6775ac'
  },
  textDarkBlue: {
    color: '#39415e'
  },
  textWhite: {
    color: '#ffffff'
  },
  optionContainer: {
    paddingVertical: '10@ms',
    paddingLeft: '20@ms',
    paddingRight: '18@ms',
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
  profileImage: {
    width: '50@ms', 
    height: '50@ms'
  }
});

export default styles;
