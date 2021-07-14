import {ScaledSheet} from 'react-native-size-matters';
import {Platform} from 'react-native';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcfb',
  },
  nameText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: '11@ms',
    lineHeight: '11@ms',
    textAlign: 'center',
    marginVertical: '30@ms'
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
  }
});

export default styles;
