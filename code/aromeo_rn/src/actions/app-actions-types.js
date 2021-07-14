import {createAction} from 'redux-actions';

export const HIDE_LOADER = 'HIDE_LOADER';
export const hideLoader = createAction(HIDE_LOADER);

export const SHOW_LOADER = 'SHOW_LOADER';
export const showLoader = createAction(SHOW_LOADER);

export const DIFFUSION_ON = 'DIFFUSION_ON';
export const diffusionOn = createAction(DIFFUSION_ON);

export const DIFFUSION_OFF = 'DIFFUSION_OFF';
export const diffusionOff = createAction(DIFFUSION_OFF);

export const LED_ON = 'LED_ON';
export const ledOn = createAction(LED_ON);

export const LED_OFF = 'LED_OFF';
export const ledOff = createAction(LED_OFF);

export const SHOW_TOAST = 'SHOW_TOAST';
export const showToast = createAction(SHOW_TOAST);

export const SHOW_ERROR_TOAST = 'SHOW_ERROR_TOAST';
export const showErrorToast = createAction(SHOW_ERROR_TOAST);

export const SAVE_DEVICE_DATAS = 'SAVE_DEVICE_DATAS';
export const saveDeviceDatas = createAction(SAVE_DEVICE_DATAS);

export const SAVE_TIMER = 'SAVE_TIMER';
export const saveTimer = createAction(
  SAVE_TIMER,
  updates => updates
);

export const SAVE_FOCUS_TIMER = 'SAVE_FOCUS_TIMER';
export const saveFocusTimer = createAction(
  SAVE_FOCUS_TIMER,
  updates => updates
);

export const SAVE_RELAX_TIMER = 'SAVE_RELAX_TIMER';
export const saveRelaxTimer = createAction(
  SAVE_RELAX_TIMER,
  updates => updates
);

export const SAVE_SLEEP_TIMER = 'SAVE_SLEEP_TIMER';
export const saveSleepTimer = createAction(
  SAVE_SLEEP_TIMER,
  updates => updates
);

export const DIFFUSION_INTEN = 'DIFFUSION_INTEN';
export const saveDiffusionInten = createAction(
  DIFFUSION_INTEN,
  updates => updates
);

export const MODULE_SOUND = 'MODULE_SOUND';
export const saveModuleSound = createAction(
  MODULE_SOUND,
  updates => updates
);

export const SYSTEM_SOUND = 'SYSTEM_SOUND';
export const saveSystemSound = createAction(
  SYSTEM_SOUND,
  updates => updates
);

export const CONNECTION_STATUS = 'CONNECTION_STATUS';
export const saveConnectionStatus = createAction(
  CONNECTION_STATUS,
  updates => updates
);