import {ScaledSheet} from 'react-native-size-matters';
import constants from '../../constants';

const styles = ScaledSheet.create({
  justifyAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    textAlign: 'center',
    // elevation: 3,
    // shadowColor: '#111111',
    // shadowOpacity: 0.6,
    // shadowRadius: 3,
    // shadowOffset: {
    //   height: 0,
    //   width: 1,
    // },
  },
  startBtn1: {
    height: '44@ms',
    width: '260@ms',
    borderRadius: '22@ms',
    alignSelf: 'center',
    marginVertical: '15@ms',
    flexDirection: 'row',
   
  },

  withShadow : {
    shadowColor: 'grey',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 1,
    },
    elevation:10
  },

  withBorder : {
    borderColor : constants.Colors.brandPurple,
    borderWidth:1
  },
  brandPurple: {
    backgroundColor: constants.Colors.brandPurple,
  },
  disableBrandPurple: {
    backgroundColor: '#6775ac80',
  },

  connectedButton : {
    backgroundColor: constants.Colors.brandPurple,
    height: '44@ms',
    width: '260@ms',
    borderRadius: '22@ms',
    alignSelf: 'center',
    marginVertical: '15@ms',
    flexDirection: 'row',
  },

  whiteColor: {
    backgroundColor: constants.Colors.white,
    // elevation: 3,
    // shadowColor: constants.Colors.grey1,
    // shadowOpacity: 0.7,
    // shadowRadius: 5,
    // shadowOffset: {
    //   height: 1,
    //   width: 4,
    // },
  },
  whiteButtonBorder: {
    borderWidth: 1,
    borderColor: constants.Colors.textDarkBlue,
    backgroundColor: 'transparent'
  },
  textDarkBlue: {
    color: constants.Colors.textDarkBlue,
  },
});

export default styles;
