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
    textAlign: 'right',
    marginVertical: '15@ms',
    paddingLeft: '10@ms'
  },
  nameTextWidth: {
    width: '200@ms'
  },
  textDarkBlue: {
    color: '#39415e'
  },
  brandPurple: {
    color: '#6775ac'
  },
  optionContainer: {
    paddingVertical: '10@ms',
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
  profileImage: {
    width: '50@ms', 
    height: '50@ms'
  }
});

export default styles;
