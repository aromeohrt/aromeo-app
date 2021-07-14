import {ScaledSheet,} from 'react-native-size-matters';
import {Platform} from 'react-native';
import Colors from '../../constants/Colors'


const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fefcfb'
  },
  subHeaderContainer:{
    alignItems:'center',
    marginVertical:Platform.OS == "android"?'20@ms' :  "9@ms",
    
  },
  bottomHeader:{
    alignItems:'center',
    marginBottom:"25@ms",
  
  },
  subHeaderTxt:{
    fontSize:'16@ms',
    color:Colors.textDarkBlue,
    fontFamily: 'Montserrat-Medium',
  },
  blurText : {
    fontSize:'16@ms',
    color:Colors.textDarkBlue,
    fontFamily: 'Montserrat-Medium',
    // fontWeight:"bold",
      textShadowColor:  'black',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 1,
      opacity:0.4
  },
  body:{
    flex:1,
    justifyContent:'center',
  },
  footerContainer:{
    flex:0.7,
  },
  footerTxt:{
    // position:'absolute',
    textAlign:'center',
    width:'315@ms',
    color:Colors.textGrey2,
    fontFamily:'Montserrat-Light',
    fontSize:'12@ms',
    alignSelf:'center'
  },
  forgotText: {
    color: '#ada5b1',
    fontFamily: 'Montserrat-Medium',
    fontSize: '13@ms',
    lineHeight: '13@ms',
    textAlign: 'center',
    marginTop: '70@ms',
    textDecorationLine: 'underline'
  },
  forgotTxt:{
    fontSize:'12@ms',
    color:Colors.textGrey2,
    alignSelf:'center',
    marginBottom:'10@ms',
    textDecorationLine:'underline'
  },
  signUpFooter:{
    marginTop:'50@ms'
  },
  footerLinks:{
    textDecorationLine:'underline'
  }
});

export default styles;
