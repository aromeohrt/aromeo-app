import {put, takeLatest, all, call} from 'redux-saga/effects';
import {
  LOGIN_SUCCESS,
  EMAILLOGIN,
  GOOGLELOGIN,
} from '../actions/user-actions-types';
import httpClient from './http-client';

function* loginSuccess({payload: {data}}) {
  // yield put(userData({...data}))
}

function* emailLogin({payload: {data, callback}}) {
  const payload = {
    data: JSON.stringify(data),
    method: 'POST',
    url: 'api/login',
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    // yield put(updateUserInfo(result[0]));
  }
}
function* googleLogin({payload: {data, callback}}) {
  const payload = {
    data: JSON.stringify(data),
    method: 'POST',
    url: 'api/register_social_user',
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    // yield put(updateUserInfo(result[0]));
  }
}

function* User() {
  yield all([takeLatest(LOGIN_SUCCESS, loginSuccess)]);
  yield takeLatest(EMAILLOGIN, emailLogin);
  yield takeLatest(GOOGLELOGIN, googleLogin);
}

export default User;
