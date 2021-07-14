import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '45@ms',
    backgroundColor: 'transparent',
    // borderWidth:1,
   marginTop:"10%"
  },
  titleText: {
    color: 'rgb(57,65,94)',
    fontFamily: 'Montserrat-Light',
    fontSize: '16@ms',
    lineHeight: '20@ms'
  },
  ImageStyle: {
    height: '100%',
    // borderWidth:1,
    width: '100%',
    alignSelf: 'center',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: 'white',
    backgroundColor:"transparent",
  //  elevation:2,
   opacity:1
   
  },
  ShadowImageStyle: {
    height: '100%',
    // borderWidth:1,
    width: '100%',
    alignSelf: 'center',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: 'black',
    backgroundColor:"transparent",
  //  elevation:2,
   opacity:1
   
  },
  whiteTint:{
    tintColor:'white'
  },
  TitelView: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '60@ms', 
  },
  BackButton: {
    // position: 'absolute',
    // top:0,
    // left:0,
    // right:0,
    // bottom:0,
    // backgroundColor:'red',
    zIndex: 1,
    height: '45@ms',
    width: '55@ms',
    marginLeft: '5@ms',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  disable: {
    color: '#c9c3cc'
  },
  saveText: {
    position: 'absolute',
    right: '25@ms',
  }
});

export default styles;
