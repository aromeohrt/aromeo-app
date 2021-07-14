import {ScaledSheet} from 'react-native-size-matters';
import {Platform} from 'react-native';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefcfb',

    // borderWidth:2,
    // borderColor:"red"
  },
  headingText: {
    color: '#39415e',
    fontFamily: 'Montserrat-Light',
    fontSize: '16@ms',
    lineHeight: '16@ms',
    textAlign: 'center',
    
    marginVertical: '15@ms',
    // borderWidth:1
  },
  headerText: {
    color: '#39415e',
    fontFamily: 'Montserrat-Light',
    fontSize: '16@ms',
    lineHeight: '16@ms',
    textAlign: 'center',
    paddingTop:'5%',
    marginTop:"10%",
    // marginVertical: '20@ms',
    // borderWidth:1
  },
  nameText: {
    color: '#39415e',
    fontFamily: 'Montserrat-Medium',
    fontSize: '16@ms',
    lineHeight: '16@ms',
    textAlign: 'center',
    marginVertical: '15@ms'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  imageContainer: {
    paddingVertical: '10@ms',
    alignItems: 'center'
  },
  divider: {
    backgroundColor: '#f9f6f6',
    paddingVertical: '5@ms'
  },
  optionContainer: {
    paddingVertical: '6@ms',
    paddingLeft: '30@ms',
    paddingRight: '15@ms',
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
  optionText: {
    paddingLeft: '10@ms'
  },
  commonImageContainer: {
    flexDirection: 'row',
    marginTop: '16@ms'
  },
  addImageContainer: {
		position: 'absolute',
    right: '5@ms',
    bottom: '3@ms'
  },
  profileImage: {
    width: '110@ms', 
    height: '110@ms'
  }
});

export default styles;
