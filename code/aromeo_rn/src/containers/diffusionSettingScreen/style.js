import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcfb'
  },
  backgroundImageContainer: {
    flex: 1,
  },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  headingTitleText: {
    color: '#39415e',
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
    borderBottomColor: '#39415e'
  },
  commonBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#c9c3cc'
  },
  outerContainer: {
    width: ScreenWidth,
    height : ScreenHeight
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
  lightBackground: {
    backgroundColor: '#d3d3d5'
  },
  brandPurple: {
    backgroundColor: '#6775ac'
  },
  brandPurpleBorder: {
    borderColor: '#6775ac',
    borderWidth: 1
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
