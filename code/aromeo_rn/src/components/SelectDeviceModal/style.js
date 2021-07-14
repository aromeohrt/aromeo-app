import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: 'rgba(0,0,0,0.4)',
    backgroundColor: '#00000080',
    flex: 1,
    justifyContent: 'flex-end',
  },
  flex1: {
    flex: 1,
  },
  modalSubContainer: {
    paddingBottom: '4@ms',
    backgroundColor: 'white',
    maxHeight: '60%',
    borderTopLeftRadius: '25@ms',
    borderTopRightRadius: '25@ms',
  },
  textStyle: {
    color: 'rgb(57,65,94)',
    fontFamily: 'Montserrat-Light',
    fontSize: '16@ms',
    lineHeight: '20@ms',
    paddingVertical: '15@ms',
  },
  textStyle1: {
    color: 'rgb(57,65,94)',
    fontFamily: 'Montserrat-Light',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    paddingVertical: '15@ms',
  },
  textWhite: {
    color: '#ffffff',
  },
  cardHeaderView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7@ms',
  },
  listTextView: {
    paddingHorizontal: '30@ms',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e3dfe3',
  },
  selectedColor: {
    backgroundColor: '#6775ac',
  },
  ConnectButton: {
    borderTopWidth: 1,
    borderTopColor: '#e3dfe3',
    paddingHorizontal: '35@ms',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // paddingBottom:'10@s'
  },
  selectedImage: {
    height: '100%',
    width: '100%',
  },
  wrapperImage: {
    height: '16@ms',
    width: '16@ms',
  },
});

export default styles;
