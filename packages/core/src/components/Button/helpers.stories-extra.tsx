import { ReactNode } from 'react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { ButtonVariants } from './types';

export const sizes: Array<keyof MainSizes> = ['small', 'medium', 'large'];
export const variants: Array<keyof ButtonVariants> = [
  'primary',
  'secondary',
  'tertiary',
  'custom',
  'error',
  'warning',
  'success',
];

export const HeaderTitle = styled.span`
  text-align: center;
  font-weight: 800;
  font-size: 12px;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template: 'a a a a';
  grid-gap: 10px;
  grid-auto-columns: min-content;
  align-items: center;
  & > span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;

/**
 * Undoes Storybook's global `* { color }` reset (.storybook/style.css) inside
 * it, so `currentColor` icons and `children` inherit from the button the way
 * they do in an app.
 *
 * A Global rule on a data attribute, not a styled component: Emotion would
 * prefix a nested selector with the component's class, and the extra class
 * weight would then beat the kit's own colour classes. This selector weighs
 * (0,0,1): enough to beat `*`, less than any class.
 */
export const InheritColors = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div data-inherit-colors className={className}>
    <Global
      styles={{
        ':where([data-inherit-colors]) :is(span, p, div, svg, g, path)': {
          color: 'inherit',
        },
      }}
    />
    {children}
  </div>
);
