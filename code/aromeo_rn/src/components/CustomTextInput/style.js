import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../constants/Colors';

const styles = ScaledSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    marginHorizontal: '30@ms'
  },
  input: {
    paddingVertical: '8@ms',
    marginTop: '12@ms',
    fontFamily: 'Montserrat-Light',
    fontSize: '15@ms',
    color: '#39415e',
  },
  purpleBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#6775ac',
  },
  redBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  grayBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#c9c3cc',
  },
  visibleContainer: {
    position: 'absolute',
    right: 0,
  },
  addBottom: {
    bottom: '24@ms',
  },
  removeBottom: {
    bottom: 0,
  },
  errorMsgStyle: {
    fontSize: '10@ms',
    color: Colors.warningRed,
  },
});

export default styles;
