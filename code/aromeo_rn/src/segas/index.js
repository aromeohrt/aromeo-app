import {all} from 'redux-saga/effects';
import app from './app';
import user from './user';

export default function* rootSaga() {
  yield all([app(), user()]);
}