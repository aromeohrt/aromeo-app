import {ScaledSheet} from 'react-native-size-matters';
import { Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = ScaledSheet.create({
  container: {
    width: ScreenWidth, 
    position: 'absolute',
    alignItems: 'center',
    marginTop: '75@ms',
    // borderWidth:1
  },
  extradepthContainer:{
    width: ScreenWidth, 
    position: 'absolute',
    alignItems: 'center',
    // marginTop:ScreenHeight("10%")
    marginTop: '90@ms',
    // borderWidth:1
  },
  buttonWrapper: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: 'rgba(201,195,204,0.42)',
    // backgroundColor: 'rgba(225,123,123, 0.8)',
    marginHorizontal: '20@ms'
  },
  connectionBorder: {
    borderRadius: 30
  },
  headingTitleText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: '14@ms',
    lineHeight: '18@ms',
    textAlign: 'center',
    marginVertical: '15@ms',
  },
  closeIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 3,
    top: 3
  }
});

export default styles;
