import {LOGIN_SUCCESS} from '../actions/user-actions-types';
const initialState = {
  userData: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      // eslint-disable-next-line no-shadow
      let user = action.payload;
      return {
        ...state,
        userData: {...user.data},
      };
    }
    default:
      return state;
  }
}
