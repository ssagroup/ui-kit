import './injectGlobal';
export * from './types/global';

import '../index.d';
import './types/emotion.d';

import { default as mainTheme } from './themes/main';
import type { Theme } from './themes/main';
import * as globalStyles from './styles/global'
import * as styleUtils from './styles/safari-focus-outline';

export { mainTheme, globalStyles, styleUtils };
export type { Theme }

export * from './components';
