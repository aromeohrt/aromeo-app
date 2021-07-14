import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  stepPostionContainer: {
    // position: 'absolute',
    // top: '57%',
    // bottom: '40@ms',
    // left: '50%',
    // right: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '30@ms',
    // backgroundColor:"green"
  },
  activeStep: {
    height: '6@ms',
    width: '6@ms',
    backgroundColor: 'rgb(103,117,172)',
    borderRadius: '3@ms',
  },
  deActiveStep: {
    height: '6@ms',
    width: '6@ms',
    backgroundColor: 'rgb(201,195,204)',
    borderRadius: '3@ms',
  },
  marginHorizontal10: {
    marginHorizontal: '10@ms',
  },
});

export default styles;
