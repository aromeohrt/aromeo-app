import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  relaxButton: {
    height: '80@ms',
    width: '80@ms',
    borderRadius: '40@ms',
    backgroundColor: 'transparent',
  },
  relaxButton1: {
    height: '80@ms',
    width: '80@ms',
    borderRadius: '40@ms',
    backgroundColor: 'rgba(201,195,204,0.52)',
  },
  relexButtonImage: {
    height: '100%',
    width: '100%',
    // tintColor: '#ffffff',
  },
  ImageWrapper: {
    height: '36@ms',
    width: '36@ms',
    marginTop: '5@ms',
    alignSelf: 'center',
  },
  justifyAlignItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    textAlign: 'center',
    paddingTop: '7@ms',
    elevation: 3,
    shadowColor: '#111111',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 1,
    },
  },
});

export default styles;
