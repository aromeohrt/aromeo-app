import {ScaledSheet} from 'react-native-size-matters';
import { Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = ScaledSheet.create({
  container: {
    width: ScreenWidth, 
    position: 'absolute',
    alignItems: 'center',
    marginTop: '70@ms'
  },
  buttonWrapper: {
    padding: '15@ms',
    borderRadius: 20,
    backgroundColor: 'rgba(201,195,204,0.42)',
    marginHorizontal: '20@ms'
  },
  headingTitleText: {
    color: '#39415e',
    fontSize: '14@ms',
    lineHeight: '14@ms',
    textAlign: 'left',
    marginVertical: '9@ms',
  },
  boldText: {
    fontFamily: 'Montserrat-Medium'
  },
  lightText: {
    fontFamily: 'Montserrat-Light'
  }
});

export default styles;
