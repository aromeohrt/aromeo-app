import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../constants/Colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5dae0'
  },
  header: {
    height: '60@ms',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: '25@ms',
    marginTop:"8%"
    // paddingTop: '25@ms'
  },
  logoContainer: {
    alignItems:'center'
  },
  cross: {
    height: '44@ms',
    width: '44@ms',
  },
  centerContainer: {
    flex: 1,
  },
  textContent: {
    width: '260@ms',
    flex: 0.7,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  centerTXt: {
    fontSize: '28@ms',
    fontFamily: 'Montserrat-Medium',
    color: Colors.white,
  },
  footerContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  footerTxt: {
    fontSize: '12@ms',
    fontFamily: 'Montserrat-Light',
    color: Colors.white,
  },
});
