import { RefObject } from 'react';

export type AppLayoutContextType = {
  isNavBarOpened: boolean;
  isFullscreenMode: boolean;
  setFullscreenMode: (isFullscreenMode: boolean) => void;
  mainRef: RefObject<HTMLElement | null> | null;
};
