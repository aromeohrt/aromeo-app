import {createAction} from 'redux-actions';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = createAction(LOGIN_SUCCESS);

export const EMAILLOGIN = 'EMAILLOGIN';
export const emailLogin = createAction(EMAILLOGIN);

export const GOOGLELOGIN = 'GOOGLELOGIN';
export const googleLogin = createAction(GOOGLELOGIN);
