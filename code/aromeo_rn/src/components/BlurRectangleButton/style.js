import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  startBtn: {
    height: '44@ms',
    width: '260@ms',
    borderRadius: '22@ms',
    // backgroundColor: 'rgba(201,195,204,0.52)',
  },
  justifyAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: '14@ms',
    lineHeight: '16@ms',
    textAlign: 'center',
    elevation: 3,
    shadowColor: '#111111',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 1,
    },
  },
  startBtn1: {
    height: '44@ms',
    width: '260@ms',
    borderRadius: '22@ms',
    backgroundColor: 'rgba(201,195,204,0.42)',
  },
});

export default styles;
