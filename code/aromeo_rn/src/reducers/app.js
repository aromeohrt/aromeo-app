import {
  HIDE_LOADER, SHOW_LOADER, DIFFUSION_ON, DIFFUSION_OFF,
  LED_ON, LED_OFF, SAVE_TIMER, DIFFUSION_INTEN, SYSTEM_SOUND, 
  MODULE_SOUND, CONNECTION_STATUS, SAVE_FOCUS_TIMER, 
  SAVE_RELAX_TIMER, SAVE_SLEEP_TIMER
} from '../actions/app-actions-types';

const initialState = {
  loading: true,
  diffusion: false,
  led: true,
  timer: 45,
  focusTimer: 45,
  relaxTimer: 45,
  sleepTimer: 45,
  diffusionInten: 10,
  systemSound: 0.8,
  moduleSound: true,
  internetConnection: true
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case DIFFUSION_ON:
      return {
        ...state,
        diffusion: true,
      };
    case DIFFUSION_OFF:
      return {
        ...state,
        diffusion: false,
      };
    case LED_ON:
      return {
        ...state,
        led: true,
      };
    case LED_OFF:
      return {
        ...state,
        led: false,
      };
    case SAVE_TIMER: {
      return {
        ...state,
        timer: action.payload,
      };
    }
    case SAVE_FOCUS_TIMER: {
      return {
        ...state,
        focusTimer: action.payload,
      };
    }
    case SAVE_RELAX_TIMER: {
      return {
        ...state,
        relaxTimer: action.payload,
      };
    }
    case SAVE_SLEEP_TIMER: {
      return {
        ...state,
        sleepTimer: action.payload,
      };
    }
    case DIFFUSION_INTEN: {
      return {
        ...state,
        diffusionInten: action.payload,
      };
    }
    case MODULE_SOUND: {
      return {
        ...state,
        moduleSound: action.payload,
      };
    }
    case SYSTEM_SOUND: {
    
      return {
        ...state,
        systemSound: action.payload,
      };
    }
    case CONNECTION_STATUS: {
      return {
        ...state,
        internetConnection: action.payload,
      };
    }
    default:
      return state;
  }
}
