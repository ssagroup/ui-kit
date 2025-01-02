export type RGBString = `rgb${string}`;

type MakeColors<T extends Array<string>> = {
  [K in T[number]]?: RGBString;
};

type Colors = MakeColors<
  [
    'black25',
    'black45',
    'white',
    'white60',
    'white80',
    'white30',
    'dark',
    'greyLighter',
    'greyLighter40',
    'greySelectedMenuItem',
    'greyFocused',
    'greyFocused40',
    'grey',
    'grey20',
    'grey40',
    'greyShadow16',
    'greyShadow24',
    'greyDarker',
    'greyDarker40',
    'greyDarker60',
    'greyDarker80',
    'greyDarker14',
    'greyDark',
    'greyDisabled',
    'greyDisabledCheckbox',
    'greyButtonGradient',
    'greyButtonGradientLight',
    'greyBackground',
    'greyBackgroundLight',
    'greyPopoverLight',
    'greyGraphite',
    'greyGraphite70',
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
    'greenMint',
    'greenDark',
    'pink',
    'pink20',
    'pinkDark',
    'pinkDarker',
    'pinkShadow40',
    'pinkLighter',
    'pinkLighter20',
    'pinkLighter40',
    'yellow',
    'yellow20',
    'yellowLighter',
    'yellowLighter20',
    'yellowLighter40',
    'yellowWarm',
    'yellowWarm20',
    'yellowWarm40',
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
    'blueRoyal',
    'blueRoyal12',
  ]
>;

export type ColorsKeys = keyof Colors;

type MediaQueryString = `@media${string}`;

export interface Theme {
  colors: Colors;
  mediaQueries: {
    xs: MediaQueryString;
    sm: MediaQueryString;
    upToMd: MediaQueryString;
    md: MediaQueryString;
    lg: MediaQueryString;
    xlg: MediaQueryString;
  };
}

export interface CommonProps {
  as?: React.ElementType;
  className?: string;
}
