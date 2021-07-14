import {ScaledSheet} from 'react-native-size-matters';
import constants from '../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowCircle: {
    height: '236@ms',
    width: '236@ms',
    borderRadius: '118@ms',
    borderWidth: '10@ms',
    borderColor: '#c9c0e219',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20@ms',
  },
  animatedCircle: {
    height: '236@ms',
    width: '236@ms',
    borderWidth: '5@ms',
    borderColor: '#c9c0e2',
    borderRadius: '118@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchingText: {
    color: 'rgb(57,65,94)',
    fontFamily: 'Montserrat-Light',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    textAlign: 'center',
    marginTop: '60@ms',
  },
});

export default styles;
