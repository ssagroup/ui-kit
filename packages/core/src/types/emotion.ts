export type RGBString = `rgb${string}`;

type MakeColors<T extends Array<string>> = {
  [K in T[number]]?: RGBString;
};

type Colors = MakeColors<
  [
    'white',
    'white60',
    'white80',
    'white30',
    'dark',
    'greyLighter',
    'greySelectedMenuItem',
    'greyFocused',
    'greyFocused40',
    'grey',
    'grey20',
    'grey40',
    'greyShadow24',
    'greyDarker',
    'greyDarker60',
    'greyDarker14',
    'greyDark',
    'greyDisabled',
    'greyButtonGradient',
    'greyButtonGradientLight',
    'greyBackground',
    'greyBackgroundLight',
    'greyGraphite',
    'greyShadow',
    'greyOutline',
    'greyShadowHover',
    'greyDropdownMain',
    'greyDropdownFocused',
    'greyDropdownText',
    'greyArrowSidebar',
    'greyFilterIcon',
    'greyCancelClearButton',
    'redLighter',
    'redLighter40',
    'red',
    'red40',
    'greenLighter',
    'greenLighter20',
    'greenLighter40',
    'greenLighter60',
    'green',
    'green20',
    'green40',
    'green60',
    'pink',
    'pink20',
    'pinkShadow40',
    'pinkLighter',
    'pinkLighter20',
    'pinkLighter40',
    'yellow',
    'yellow20',
    'yellowLighter',
    'yellowLight',
    'yellowWarm',
    'yellowLighter20',
    'yellowLighter40',
    'turquoise',
    'turquoise20',
    'turquoiseShadow40',
    'turquoiseLighter',
    'turquoiseLighter20',
    'turquoiseLighter40',
    'purple',
    'purple20',
    'purpleLighter',
    'purpleLighter20',
    'purpleLighter40',
    'purpleDark',
    'purpleDark40',
    'blue',
    'blue20',
    'blueDark',
    'blueLightDarker',
    'blueDropdownWithSelectedItems',
    'blueDropdownWithSelectedItemsBorder',
    'blueLighter',
    'blueLighter20',
    'blueLighter40',
    'blueLight',
    'blueLight20',
    'blueLightDarker40',
    'blueLightLighter',
    'blueLightLighter20',
    'blueLightLighter40',
    'blueNotification',
    'blueNotification40',
    'blueButtonHoverGradientFrom',
    'blueButtonHoverGradientTo',
    'blueButtonActive',
  ]
>;

export type ColorsKeys = keyof Colors;

type MediaQueryString = `@media${string}`;

export interface Theme {
  colors: Colors;
  mediaQueries: {
    xs: MediaQueryString;
    sm: MediaQueryString;
    md: MediaQueryString;
    lg: MediaQueryString;
    xlg: MediaQueryString;
  };
}

export interface CommonProps {
  as?: React.ElementType;
  className?: string;
}
