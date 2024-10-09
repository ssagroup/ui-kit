import { Interpolation, Theme } from '@emotion/react';

export type LongTextProps = {
  text: React.ReactNode;
  longText?: React.ReactNode;
  overflow?: string;
  allowTags?: boolean;
  triggerCSS?: Interpolation<Theme>;
};
