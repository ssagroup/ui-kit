import { ToastPosition } from 'react-toastify';

export const SCREEN_SIZES = {
  390: {
    width: 390,
    height: 844,
  },
  900: {
    width: 900,
    height: 1200,
  },
  1440: {
    width: 1440,
    height: 900,
  },
  1920: {
    width: 1920,
    height: 1080,
  },
};

export const TOASTIFY_OPTIONS = {
  position: 'bottom-right' as ToastPosition,
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnHover: false,
};
