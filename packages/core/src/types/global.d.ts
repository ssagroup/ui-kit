import {} from '@emotion/react/types/css-prop';

declare global {
  export interface MainSizes {
    small: SerializedStyles;
    medium: SerializedStyles;
    large: SerializedStyles;
  }

  export interface MainColors {
    pink: Interpolation<Theme>;
    yellow: Interpolation<Theme>;
    green: Interpolation<Theme>;
    turquoise: Interpolation<Theme>;
    purple: Interpolation<Theme>;
    blueLight: Interpolation<Theme>;
    blue: Interpolation<Theme>;
  }
}
