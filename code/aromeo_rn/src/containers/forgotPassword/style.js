import {ScaledSheet} from 'react-native-size-matters';
import {Platform} from 'react-native';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcfb'
  },
  nameText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: '15@ms',
    lineHeight: '15@ms',
    textAlign: 'center',
    marginVertical: '35@ms'
  },
  nameWidth: {
    marginHorizontal: '30@ms'
  },
  textDarkBlue: {
    color: '#39415e'
  },
  optionContainer: {
    paddingVertical: '13@ms',
    paddingLeft: '20@ms',
    paddingRight: '18@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  forgotText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: '18@ms',
    lineHeight: '18@ms',
    textAlign: 'center',
    marginTop: '30@ms'
  }
});

export default styles;
