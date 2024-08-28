import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Typeahead } from '.';
import { TypeaheadProps } from './types';
import * as S from './styles';
import { highlightInputMatch } from './utils';
import { TypeaheadItemImage } from './components';

const image =
  'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASGSURBVHgBfVVbUhtXEO2eGQ0SLz1AIAgYycSO7XKVo898hazA3kGSFeBkATHFAhJYAVlCvIKwgiiqpCLHNhbgBwgkIYHempl2952HBkr2VI10de/M6dOnT7cQPnMVCoWEaU5vEsIGgbNGDuRknwgaRM7fRPQcnP4f+Xz+8FMYOG6zVCpnQac9x6ENchwGJP+IZO3dGOwT7fVosP3NmEDazY2X5aNNzcACx/4WXIAwOvq3YoeoAvLih5g+8Vex+GLzswFeld8+Ixt2HKKEz9wDC5hfA3bXcswbkOTPneI/pWdjJToov3tqE/1Gtg0Og/u3xxw0TSO+URLq9wdhDEI3Hwmmojno/Jx/+GAnCFAqn2QjYBVYc2HOMVQQpfHUVIzS8ymMRaO8Zyu9zEgEWq02nFaq1Gp3gkTkQ7Lj3017SFz7+4eGnOpkb/myOCNZYCmThpmZKTw7q8HR5XuwLNvVlROJz87ArdVlrNcbUDmvkUsWPc6UMCb0PV58hy57uyzMLdtGh9kL8/R8UsChfPiOGBhZHohOmIrhVautiqDrOt5ZXwPJ4uT0nJRarl78nAbWoJ3UDLCfCKAwV6UUWSZjkEjMCriwRtM06e6XWchwRouL8/jg3joYho5So9dvjiEen2EpJ9EvqSsVkBmd3mQX0WPPMfKCeiKdToHIYtuOYjw/l0BhecBgrw+OqNlscYYpdSb1qlSqsLgwBzfqINlsaLx8pLiPbKkyuLpqBzbVdY2L2gl+d3s9MM2IWgvg5VULYtEJycrvGfQCZTVVXE8iiSwOGQyHwPUILCrgUhMGJQkm7FvtbiCFZGozQV3TR/5XZ1rW8OyoMgj3RbiR6hdNikQi+NWd2+r8vFoDcY/0hltY750Rc1VkZLcZDHzEYGs+qDAXJpLucGih17V4dl6FRrMJ7Bzo9fqezkoiMgxDegMtywpIqcZErWEwZpkBbvne54yINcaZ6Slk5jA5GcXMwjzEYjEYDIYqR9G/2+lhtV6Hy8u2PAttlkwIMgHpeL+1ixyA9vneCMmiGmvliwywLJBKxuH47QfxOvnshMxcKgHLS4tc3CYkE3F4f1Lx5pLykgrEjz3HQrmcMDrDi7Du8r2UWVCF/f/VG+h2+948ElkwGA3TzPx2dhXOzut819S5zCuNJdZYSgOtnJbP5Rr8zr47tEZT8gMzOj2rQm5thRnOqpqI0eQxcVIqmaCV5QzUahcg9fF6AKW4IpGm4++5XO7QHXalUnZo6wWZIV4dFGMJyMOOa5BmtpOqBrLHAVCyqjBwp9P15pMA6yDBWZ4GD4p8EECu4r8vnnJVfg3/Y4VlE1eYEUPZUAiw731/oucaBjZI4wAaGj+t55Z31Xt+gEcP7+1ww2x7wH7ga4UdDC2SJrRVz6B/+bZ0nUO47YNfayz/KhT/40zgF0ZOhvf9AgteUOWR54V9AzV96+766m74vbF/+oVCKcsibQHS9z6QG8Cd+SLXCF9Zcp8i+ON91vwm1tgA4UBc7ic89h8z0NeMFfcCHrNmh2zFPwc9YzefZyd+4voIMSvIE1PFRoIAAAAASUVORK5CYII=';

const items = [
  { id: 1, value: 'First' },
  { id: 2, value: 'Second' },
  { id: 3, value: 'Third' },
  { id: 4, value: 'Fourth' },
  { id: 5, value: 'Fifth' },
  { id: 6, value: 'Sixth' },
];

export default {
  title: 'Components/Typeahead',
  component: Typeahead,
  argTypes: {
    onChange: {
      control: {
        disable: true,
      },
    },
    className: {
      description: 'Used in order to overwrite the default style',
      table: {
        type: {
          summary: 'StyledComponent',
        },
      },
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story, { args }) => {
      const noop = () => {
        /* no-op */
      };
      return (
        <div style={{ paddingBottom: 200 }}>
          {Story({ ...args, onChange: noop })}
        </div>
      );
    },
  ],
} as Meta<typeof Typeahead>;

export const Basic: StoryObj = (args: TypeaheadProps) => {
  return (
    <Typeahead
      initialSelectedItems={[items[2].id]}
      isDisabled={args.isDisabled}
      renderOption={({ label, input }) => highlightInputMatch(label, input)}>
      {items.map(({ value, id }) => (
        <S.TypeaheadOption key={id} value={id} label={value}>
          {value}
        </S.TypeaheadOption>
      ))}
    </Typeahead>
  );
};

Basic.args = { isDisabled: false };

export const Multiple: StoryObj = (args: TypeaheadProps) => {
  return (
    <Typeahead
      initialSelectedItems={[items[2].id, items[1].id]}
      isMultiple
      isDisabled={args.isDisabled}
      renderOption={({ label, input }) => highlightInputMatch(label, input)}>
      {items.map(({ value, id }) => (
        <S.TypeaheadOption key={id} value={id} label={value}>
          {value}
        </S.TypeaheadOption>
      ))}
    </Typeahead>
  );
};

Multiple.args = { isDisabled: false };

export const WithImage: StoryObj = (args: TypeaheadProps) => {
  return (
    <Typeahead
      initialSelectedItems={[items[2].id, items[1].id]}
      isMultiple
      isDisabled={args.isDisabled}
      css={{
        width: 500,
      }}
      renderOption={({ label, input }) => (
        <React.Fragment>
          <TypeaheadItemImage src={`data:image/png;base64,${image}`} />
          {highlightInputMatch(label, input)}
        </React.Fragment>
      )}>
      {items.map(({ value, id }) => (
        <S.TypeaheadOption key={id} value={id} label={value}>
          <TypeaheadItemImage src={`data:image/png;base64,${image}`} />
          {value}
        </S.TypeaheadOption>
      ))}
    </Typeahead>
  );
};

WithImage.args = { isDisabled: false };
