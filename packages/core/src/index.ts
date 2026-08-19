import './injectGlobal';
import { detectDuplicateInstance } from './utils/detectDuplicateInstance';

// Runs on import, before anything else can fail confusingly downstream.
detectDuplicateInstance();

export * from './types/global';

import './types/global.d';
import './types/emotion.d';

export * from './types/emotion';
export { default as mainTheme } from './themes/main';

export * as globalStyles from './styles/global';
export type {
  FloatingSurfaceColor,
  FloatingSurfaceSize,
} from './styles/floatingSurface';
export * as styleUtils from './styles/safari-focus-outline';
export * from './components';
export * from './contexts';
export * from './utils/react19HocCompat';
export * from './utils/deprecation';
