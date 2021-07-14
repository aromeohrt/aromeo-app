import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  flex1: {
    flex: 1,
  },
  alertContainer: {
    // height: '140@s',
    width: '314@ms',
    backgroundColor: '#ffffff',
    borderRadius: '15@ms',
  },
  paddingHorizontal: {
    paddingHorizontal: '15@ms',
  },
  container: {
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: 'rgba(0,0,0,0.4)',
    backgroundColor: '#11111140',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertHeading: {
    color: 'rgb(57,65,94)',
    fontFamily: 'Montserrat-Medium',
    fontSize: '16@ms',
    lineHeight: '20@ms',
    textAlign: 'center',
    marginTop: '16@ms',
  },
  alertMsg: {
    textAlign: 'center',
    fontSize: '14@ms',
    fontFamily: 'Montserrat-Light',
    lineHeight: '20@ms',
    marginVertical: '5@ms',
    color: 'rgb(57,65,94)',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '18@ms',
    marginVertical: '15@ms',
  },
  singleButtonWrapper: {
    flexDirection: 'row',
   justifyContent:"center",
   alignItems:"center",
   marginVertical: '15@ms'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: '14@ms',
    fontFamily: 'Montserrat-Light',
    lineHeight: '20@ms',
    color: '#ffffff',
  },
  stayButton: {
    height: '38@ms',
    width: '130@ms',
    borderRadius: '19@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayButton: {
    backgroundColor: '#ADA5B1'
  },
  blueButton: {
    backgroundColor: '#6775AC'
  }
});

export default styles;
