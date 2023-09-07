import { Theme } from '@emotion/react';

const main: Theme = {
  colors: {
    white: 'rgba(255, 255, 255, 1)', //  #ffffff
    white60: 'rgba(255, 255, 255, 0.6)', //  #ffffff
    white30: 'rgba(255, 255, 255, 0.3)', //  #ffffff
    greyLighter: 'rgba(238, 241, 247, 1)', //  #eef1f7
    greySelectedMenuItem: 'rgba(222, 225, 236, 1)', //  #dee1ec
    greyFocused: 'rgba(210, 212, 219, 1)', //  #d2d4db
    greyFocused40: 'rgba(210, 212, 219, 0.4)', //  #d2d4db
    grey: 'rgba(195, 197, 204, 1)', // #c3c5cc
    grey20: 'rgba(43, 45, 49, 0.2)', // #c3c5cc
    grey40: 'rgba(43, 45, 49, 0.4)', // #c3c5cc
    greyShadow24: 'rgba(93, 102, 112, 0.24)', //  #5d6670
    greyDarker: 'rgba(43, 45, 49, 1)', // #2b2d31
    greyDarker60: 'rgba(43, 45, 49, 0.6)', // #2b2d31
    greyDarker14: 'rgba(43, 45, 49, 0.14)', // #2b2d31
    greyDark: 'rgb(64, 72, 83)', // #404853
    greyDisabled: 'rgba(85, 87, 90, 1)', // #55575a
    greyButtonGradient: 'rgba(77, 82, 87, 1)', // #4d5257
    greyButtonGradientLight: 'rgba(94, 103, 114, 1)', // #5e6772
    greyBackground: 'rgb(64, 68, 73)', // #404449
    greyBackgroundLight: 'rgb(76, 84, 93)', // #4c545d
    greyShadow: 'rgba(42, 48, 57, 0.08)', // #2a3039
    greyShadowHover: 'rgba(93, 102, 112, 0.24)', // #5d6670
    greyOutline: 'rgba(208,	210,	220, 1)', // #d0d2dc
    redLighter: 'rgba(242, 136, 142, 1)', // #f2888e
    redLighter40: 'rgba(242, 136, 142, 0.4)', // #f2888e
    red: 'rgba(235, 117, 86, 1)', // #eb7556
    red40: 'rgba(235, 117, 86, 0.4)', // #eb7556
    greenLighter: 'rgba(137, 217, 150, 1)', // #89d996
    greenLighter20: 'rgba(137, 217, 150, 0.2)', // #89d996
    greenLighter40: 'rgba(137, 217, 150, 0.4)', // #89d996
    greenLighter60: 'rgba(137, 217, 150, 0.6)', // #89d996
    green: 'rgba(82, 197, 135, 1)', // #52c587
    green20: 'rgba(82, 197, 135, 0.2)', // #52c587
    green40: 'rgba(82, 197, 135, 0.4)', // #52c587
    green60: 'rgba(82, 197, 135, 0.6)', // #52c587
    pink: 'rgba(240, 129, 107, 1)', // #f0816b
    pink20: 'rgba(240, 129, 107, 0.2)', // #f0816b
    pinkLighter: 'rgba(249, 153, 144, 1)', // #f99990
    pinkLighter20: 'rgba(249, 153, 144, 0.2)', // #f99990
    pinkLighter40: 'rgba(249, 153, 144, 0.4)', // #f99990
    pinkShadow40: 'rgba(236, 119, 91, 0.4)', // #ec775b
    yellow: 'rgba(237, 153, 93, 1)', // #ed995d
    yellow20: 'rgba(237, 153, 93, 0.2)', // #ed995d
    yellowLighter: 'rgba(237, 186, 93, 1)', // #edba5d
    yellowLighter20: 'rgba(237, 186, 93, 0.2)', // #edba5d
    yellowLighter40: 'rgba(237, 186, 93, 0.4)', // #edba5d
    turquoise: 'rgba(65, 187, 187, 1)', // #41bbbb
    turquoise20: 'rgba(65, 187, 187, 0.2)', // #41bbbb
    turquoiseShadow40: 'rgba(143, 207, 207, 0.4)', // #8fcfcf
    turquoiseLighter: 'rgba(125, 203, 203, 1)', // #7dcbcb
    turquoiseLighter20: 'rgba(125, 203, 203, 0.2)', // #7dcbcb
    turquoiseLighter40: 'rgba(125, 203, 203, 0.4)', // #7dcbcb
    purple: 'rgba(123, 71, 235, 1)', // #7b47eb
    purple20: 'rgba(123, 71, 235, 0.2)', // #7b47eb
    purpleLighter: 'rgba(160, 120, 245, 1)', // #a078f5
    purpleLighter20: 'rgba(160, 120, 245, 0.2)', // #a078f5
    purpleLighter40: 'rgba(160, 120, 245, 0.4)', // #a078f5
    purpleDark: 'rgba(156, 122, 235, 1)', // #9c7aeb
    purpleDark40: 'rgba(156, 122, 235, 0.4)', // #9c7aeb
    blue: 'rgba(65, 120, 225, 1)', // #4178e1
    blue20: 'rgba(65, 120, 225, 0.2)', // #4178e1
    blueDark: 'rgba(36, 101, 227, 1)', // #2465e3
    blueLightDarker: 'rgba(127, 159, 221)', // #7f9fdd
    blueLighter: 'rgba(117, 153, 222, 1)', // #7599de
    blueLighter20: 'rgba(117, 153, 222, 0.2)', // #7599de
    blueLighter40: 'rgba(117, 153, 222, 0.4)', // #7599de
    blueLight: 'rgba(68, 179, 252, 1)', // #44b3fc
    blueLight20: 'rgba(68, 179, 252, 0.2)', // #44b3fc
    blueLightDarker40: 'rgba(127, 159, 221, 0.4)', // #7f9fdd
    blueLightLighter: 'rgba(133, 199, 242, 1)', // #85c7f2
    blueLightLighter20: 'rgba(133, 199, 242, 0.2)', // #85c7f2
    blueLightLighter40: 'rgba(133, 199, 242, 0.4)', // #85c7f2
  },
  mediaQueries: {
    sm: '@media screen and (min-width: 390px)',
    md: '@media screen and (min-width: 900px)',
    lg: '@media screen and (min-width: 1440px)',
    xlg: '@media screen and (min-width: 1920px)',
  },
};

export default main;
