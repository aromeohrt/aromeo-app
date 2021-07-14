import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;


const styles = ScaledSheet.create({
  container: {
    height: ScreenHeight,
    width: ScreenWidth,
   
  },
  backgroundImageContainer: {
    flex: 1,
  },
  crossBtnWrapper: { height: '65@ms', width: '65@ms', alignSelf: 'flex-end' },
  crossBtn: { height: '100%', width: '100%', tintColor: '#ffffff' },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  headingTitleText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: '14@ms',
    lineHeight: '14@ms',
    textAlign: 'center',
    marginVertical: '15@ms',
  },
  mediumFont: {
    fontFamily: 'Montserrat-Medium'
  },
  tabHeadingContainer: {
    width: '65@ms'
  },
  selectedTab: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'white'
  },
  commonBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'white'
  },
  outerContainer: {
    width: ScreenWidth,
    height:ScreenHeight
  },
  intensityContainer: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    paddingTop: '25@ms',
    paddingBottom: '15@ms'
  },
  imageWrapper: {
    height: '50@ms',
    width: '50@ms',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  darkBackground: {
    backgroundColor: '#00000033',
  
  },
  lightBackground: {
    backgroundColor: '#fefcfb4d'
  },
  whiteBackground: {
    backgroundColor: 'white'
  },
  fullWidth: { width: '100%' },
  switch: { borderRadius: 50 },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default styles;
