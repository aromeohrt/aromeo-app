import {ScaledSheet, ms} from 'react-native-size-matters';
import {Platform} from 'react-native';
import Colors from '../../constants/Colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#fefcfb'
  },
  nameText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: '16@ms',
    lineHeight: '20@ms',
    textAlign: 'center',
    marginVertical: '20@ms'
  },
  nameWidth: {
    marginHorizontal: '30@ms'
  },
  textDarkBlue: {
    color: '#39415e'
  },
  ImageContainer:{
      width:'300@ms',
      height:'286@ms',
      alignSelf:'center'
  },
  contentContainer:{
      marginVertical:'20@ms',
      width:'300@ms',
      alignSelf:'center',
    },
    contentTxt:{
        textAlign:'center',
        fontSize:'14@ms',
        fontFamily:'Montserrat-Light',
        color:Colors.textDarkBlue
    },
  forgotText: {
    color: Colors.textGrey2,
    fontFamily: 'Montserrat-Light',
    fontSize: '12@ms',
    lineHeight: '13@ms',
    textAlign: 'center',
    marginTop: '20@ms',
  },
  underline: {
    textDecorationLine: "underline"
  },
  image:{
    //   height:'667@ms',
      width:'375@ms',
      alignSelf:'center'
  }
});

export default styles;
