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
  forgotText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: '18@ms',
    lineHeight: '18@ms',
    width: '140@ms'
  },
  deviceStatusText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: '12@ms',
    lineHeight: '14@ms',
    // marginLeft: '10@ms',
    marginLeft: '6@ms',
  },
  greenText: {
    color: '#97bb94'
  },
  grayText: {
    color: '#67616a'
  },
  deviceStatusWrapper: {
    marginLeft: '8@ms',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  deviceStatusLight: {
    height: '4@ms',
    width: '4@ms',
    borderRadius: '3@ms',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#d4ffd1',
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 4,
    }
  },
  greenLight: {
    backgroundColor: '#97bb94'
  },
  grayLight: {
    backgroundColor: '#67616a'
  },
  nameTextWidth: {
    width: '210@ms'
  },
  textDarkBlue: {
    color: '#39415e'
  },
  brandPurple: {
    color: '#6775ac'
  },
  optionContainer: {
    paddingVertical: '6@ms',
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
  divider: {
    backgroundColor: '#f9f6f6',
    paddingVertical: '5@ms'
  },
  profileImage: {
    width: '50@ms', 
    height: '50@ms'
  },
  diffuserImage: {
    width: '100@ms', 
    height: '100@ms',
    margin: '13@ms'
  },
  batteryImage: {
    // width: '40@ms', 
    // height: '25@ms',
   backgroundColor:"transparent",
   
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth:1
  },
  warningRedBg: {
    backgroundColor: '#e17b7b'
  },
});

export default styles;
