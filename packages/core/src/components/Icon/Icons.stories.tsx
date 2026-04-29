import { css } from '@emotion/react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Typography from '@components/Typography/Typography';
import Icon, { iconsList } from './index';

export default {
  title: 'Design System/Icons',
  component: Icon,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    color: { control: 'color' },
  },
} as Meta<typeof Icon>;

const iconWrapper = css`
  width: 120px;
  height: 120px;
  border: 1px solid grey;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const sortedIconsList = [...iconsList].sort((a, b) => a.localeCompare(b));

const IconsGrid = (args: Parameters<typeof Icon>[0]) => {
  const [search, setSearch] = useState('');
  const filtered = sortedIconsList.filter((name) =>
    name.includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        placeholder="Search icons…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        css={css`
          margin-bottom: 16px;
          padding: 6px 10px;
          width: 240px;
          border: 1px solid grey;
          border-radius: 5px;
          font-size: 14px;
          outline: none;

          &:focus {
            border-color: #487de1;
          }
        `}
      />
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
          align-items: flex-start;
          padding-bottom: 54px;
          gap: 12px;

          & p {
            text-align: center;
          }
        `}>
        {filtered.map((iconName) => (
          <div css={iconWrapper} key={iconName}>
            <Icon
              name={iconName}
              size={
                args.size && (iconName === 'robot' ? args.size * 2 : args.size)
              }
              color={args.color}
            />
            <Typography variant="body1">{iconName}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Default: StoryObj<typeof Icon> = (
  args: Parameters<typeof Icon>[0],
) => <IconsGrid {...args} />;

Default.storyName = 'Icons';

export const CustomColor: StoryObj<typeof Icon> = (
  args: Parameters<typeof Icon>[0],
) => <IconsGrid {...args} />;

CustomColor.storyName = 'Custom Color';
CustomColor.args = {
  color: '#487de1',
};
