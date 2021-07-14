import {ScaledSheet} from 'react-native-size-matters';
import {Platform} from 'react-native';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcfb'
  },
  nameTextWithBlur: {
    fontFamily: 'Montserrat-Regular',
    fontSize: '15@ms',
    lineHeight: '15@ms',
    textAlign: 'center',
    marginVertical: '10@ms',
    // fontWeight:"bold",
    textShadowColor:"rgba(0,0,0,1)",
    textShadowOffset: {width: -1, height: 0},
    textShadowRadius: 5,
    color:"transparent",
    opacity:0.4
  },
  nameWidthWithBlur: {
    marginHorizontal: '40@ms',
  },
  nameText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: '15@ms',
    lineHeight: '15@ms',
    textAlign: 'center',
    marginVertical: '10@ms',
   
  },
  nameWidth: {
    marginHorizontal: '30@ms',
  },
  textDarkBlue: {
    color: '#39415e'
  },
  optionContainer: {
    paddingVertical: '13@ms',
    paddingLeft: '20@ms',
    paddingRight: '18@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  forgotText: {
    color: '#ada5b1',
    fontFamily: 'Montserrat-Light',
    fontSize: '13@ms',
    lineHeight: '13@ms',
    textAlign: 'center',
    marginTop: '70@ms',
    textDecorationLine: 'underline'
  }
});

export default styles;
