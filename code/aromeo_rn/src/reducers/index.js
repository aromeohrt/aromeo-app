import {combineReducers} from 'redux';
import app from './app';
import user from './users';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  whitelist: ['user'],
  key: 'primary',
  storage: AsyncStorage,
};

let rootReducer = combineReducers({
  app,
  user,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
