import {call, select, put, delay} from 'redux-saga/effects';
import {ToastActionsCreators} from 'react-native-redux-toast';
import getAxiosInstance from '../utilities/axiosInstance';
import Idx from 'idx';

const message =
  "Please make sure you're connected with internet or our servers are not responding.";

function* HttpClient(payload, isLoader = true) {
  const data = {...payload};
  const axiosInstance = getAxiosInstance();
  try {
    const {data: result} = yield call(axiosInstance, data);

    // yield put(hideLoader());

    // eslint-disable-next-line no-console

    return {
      error: null,
      result,
    };
  } catch (error) {
    // eslint-disable-next-line no-console

    // yield put(hideLoader());
    if (Idx(error, (_) => _.code)) {
      if (error.code === 'ECONNABORTED') {
        yield put(ToastActionsCreators.displayInfo(message));
      }
    }
    if (Idx(error, (_) => _.statusCode)) {
      yield put(ToastActionsCreators.displayInfo(error.message));
    }

    return {
      error,
      result: null,
    };
  }
}

export default HttpClient;
