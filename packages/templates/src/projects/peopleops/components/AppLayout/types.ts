import { Dispatch, RefObject, SetStateAction } from 'react';

export type AppLayoutContextType = {
  isFullscreenMode: boolean;
  isNavBarOpened: boolean;
  mainRef: RefObject<HTMLElement> | null;
  setFullscreenMode: Dispatch<SetStateAction<boolean>>;
  setNavBarOpened: Dispatch<SetStateAction<boolean>>;
};
