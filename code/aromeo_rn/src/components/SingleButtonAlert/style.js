import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  flex1: {
    flex: 1,
  },
  alertContainer: {
    width: '314@ms',
    backgroundColor: '#ffffff',
    borderRadius: '15@ms',
    paddingHorizontal: '15@ms',
  },
  container: {
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: 'rgba(0,0,0,0.7)',
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
    marginTop: '26@ms',
  },
  alertMsg: {
    textAlign: 'center',
    fontSize: '16@ms',
    fontFamily: 'Montserrat-Medium',
    lineHeight: '20@ms',
    marginVertical: '15@ms',
    color: 'rgb(57,65,94)',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '18@ms',
  },
});

export default styles;
