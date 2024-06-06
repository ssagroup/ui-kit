import '@emotion/react';
import './src/injectGlobal';
import { MainColors as MC, MainSizes as MS } from './src/types/global';
import { Colors as C, ColorsKeys as CK, CommonProps as CP, MediaQueryString as MQS, RGBString as RGBS } from './src/types/emotion';
export { default as mainTheme } from './src/themes/main';
export * as globalStyles from './src/styles/global';
export * as styleUtils from './src/styles/safari-focus-outline';
export type * from './src/types/global';
export type * from './src/types/emotion';
export type { Colors, ColorsKeys, CommonProps, MediaQueryString, RGBString } from './src/types/emotion';
export type { Theme, SerializedStyles, Interpolation } from '@emotion/react';
export type * from './src/components/AccordionGroup/types';
export type * from './src/components/Badge/types';
export type * from './src/components/Button/types';
export type * from './src/components/ButtonGroup/types';
export type * from './src/components/Card/types';
export type * from './src/components/Checkbox/types';
export type * from './src/components/ColorPicker/types';
export type * from './src/components/Dropdown/types';
export type * from './src/components/DropdownOptions/types';
export type * from './src/components/DropdownToggle/types';
export type * from './src/components/FormCheckbox/types';
export type * from './src/components/FormHelperText/types';
export type * from './src/components/FormRadioGroup/types';
export type * from './src/components/Icon/types';
export type * from './src/components/Indicator/types';
export type * from './src/components/Input/types';
export type * from './src/components/Label/types';
export type * from './src/components/Modal/types';
export type * from './src/components/ModalDialog/types';
export type * from './src/components/MultipleDropdown/types';
export type * from './src/components/Popover/types';
export type * from './src/components/Progress/types';
export type * from './src/components/ProgressCircle/types';
export type * from './src/components/ProgressLegend/types';
export type * from './src/components/ProgressLegendItem/types';
export type * from './src/components/ProgressVertical/types';
export type * from './src/components/Radio/types';
export type * from './src/components/RadioGroup/types';
export type * from './src/components/ResponsiveImage/types';
export type * from './src/components/Stepper/types';
export type * from './src/components/Switch/types';
export type * from './src/components/TabBar/types';
export type * from './src/components/Tag/types';
export type * from './src/components/Textarea/types';
export type * from './src/components/TextField/types';
export type * from './src/components/Tooltip/types';
export type * from './src/components/Typography/types';
export * from './src/components';

declare global {
  export interface MainSizes extends MS {}
  export interface MainColors extends MC {}
  export interface Colors extends C {}
  export interface ColorsKeys extends CK {}
  export interface CommonProps extends CP {}
  export interface MediaQueryString extends MQS {}
  export interface RGBString extends RGBS {}
}

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    mediaQueries: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xlg: string;
    };
  }
}