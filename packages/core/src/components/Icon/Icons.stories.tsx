import { css } from '@emotion/react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Typography from '@components/Typography/Typography';
import Icon, { iconsList } from './index';
import { MapIconsType } from '@components';

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
  args: {
    size: 28,
  },
  argTypes: {
    color: { control: 'color' },
  },
} as Meta<typeof Icon>;

const iconWrapper = css`
  width: 120px;
  height: 120px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  transition: border-color 0.15s;
  &:hover {
    border-color: #487de1;
  }
`;

const iconWrapperCopied = css`
  border-color: #22c55e;
`;

const gridStyle = css`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  gap: 12px;

  & p {
    text-align: center;
  }
`;

const ICON_GROUPS: { label: string; icons: string[] }[] = [
  {
    label: 'Basic',
    icons: [
      'arrow-down',
      'arrow-up',
      'carrot-down',
      'carrot-left',
      'carrot-right',
      'carrot-up',
      'plus',
      'minus',
      'cross',
      'more',
      'more-vertical',
      'arrow-sort',
      'menu',
      'dragndrop',
    ],
  },
  {
    label: 'Symbols',
    icons: ['sort-up', 'sort-down', 'warning-2', 'info', 'check'],
  },
  {
    label: 'Essential Icons',
    icons: [
      'check-circle',
      'check-circle-inverted',
      'plus-circle',
      'plus-circle-inverted',
      'minus-circle',
      'minus-circle-inverted',
      'radio-on',
      'circle',
      'warning',
      'attention-circle',
      'information',
      'union',
      'union-circle',
      'close-circle-outline',
      'close-square-outline',
      'close-circle-filled',
      'close-square-filled',
      'plus-square-outline',
      'plus-square-filled',
      'minus-square-outline',
      'minus-square-filled',
      'tick-square-outline',
      'tick-square-filled',
      'warning-circle-outline',
      'warning-square-outline',
      'warning-circle-filled',
      'warning-square-filled',
      'info-square-outline',
      'info-square-filled',
      'info-circle-filled',
      'more-circle-outline',
      'more-square-outline',
      'more-circle-filled',
      'more-square-filled',
    ],
  },
  {
    label: 'Main Icons',
    icons: [
      'notification',
      'visible',
      'invisible',
      'calendar',
      'calendar-schedule',
      'today',
      'busket',
      'copy',
      'copy-link',
      'copy-link-2',
      'link',
      'send',
      'clock',
      'autoscale',
      'reset-axes',
      'reset',
      'filter',
      'filter-funnel',
      'filter-list',
      'delete',
      'email',
      'emailOutlined',
      'lock',
      'lockOutlined',
      'box-select',
      'lasso-select',
      'zoom',
      'zoom-in',
      'pan',
      'zoom-out',
      'edit',
      'search',
      'star',
      'panelLeft',
      'panelRight',
      'preview',
      'dashboard',
      'phone',
      'tablet',
      'more-info',
      'addFolder',
      'moveFolder',
      'folder',
      'camera',
      'history',
      'overtime',
      'archive',
      'unarchive',
      'timeline',
      'desktop',
      'chart',
      'follow-link',
      'save-2',
      'save',
      'signature',
      'picture',
      'upload',
      'log-in',
      'log-out',
      'import',
      'maximize',
      'change',
      'setting-clock',
      'document',
    ],
  },
  {
    label: 'PeopleOps Icons',
    icons: [
      'geography',
      'url',
      'building',
      'time-tracking',
      'assessment',
      'clipboard-assessment',
      'clipboard-form',
      'clipboard-report',
      'clipboard-result',
      'clipboard-star',
      'clipboard-summary',
      'form',
      'results',
      'summery',
      'technical-review',
      'salary-reports',
      'assessment-stages',
      'comments-on-achievements',
      'code-review-comments',
      'probation-period',
      'profiles-changes',
      'employee-terminated',
      'employee',
      'employee-profile',
      'employee-blackboard',
      'education',
      'user',
      'support',
      'leave',
      'compensation',
      'export',
      'inventory',
      'documents',
      'certification',
      'certification-expiring',
      'language',
      'settings',
      'comments',
      'contacts',
      'vacation',
      'sick-leave',
      'day-off',
      'file-pdf',
      'file-word',
      'excel-download',
      'file-mark',
      'staff-growth-coefficient',
      'staff-turnover-coefficient',
      'client-feedback',
      'expertise',
      'responsibilities',
      'mobile',
      'delivery-address',
      'delivery-address-2',
      'pdp',
      'versions',
      'experience',
      'projects',
      'cooperation-model',
      'billable',
      'non-billable',
      'recruitment-team',
      'clear',
    ],
  },
  {
    label: 'Text Editor Icons',
    icons: [
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'h1',
      'h2',
      'h3',
      'markup',
      'numbered-list',
      'bulleted-list',
      'uppercase',
      'dash',
      'brackets',
      'undo',
      'redo',
      'new-line',
      'quotation',
    ],
  },
];

const iconsSet = new Set(iconsList);
const namedIconsSet = new Set(ICON_GROUPS.flatMap((g) => g.icons));
const otherIcons = [...iconsList]
  .filter((name) => !namedIconsSet.has(name))
  .sort((a, b) => a.localeCompare(b));

const ALL_GROUPS = [
  ...ICON_GROUPS.map((g) => ({
    ...g,
    // @ts-expect-error ignore
    icons: g.icons.filter((name) => iconsSet.has(name)),
  })),
  ...(otherIcons.length > 0 ? [{ label: 'Other', icons: otherIcons }] : []),
].filter((g) => g.icons.length > 0);

const ALL_LABELS = ['All', ...ALL_GROUPS.map((g) => g.label)];

const chipBase = css`
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #d1d5db;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
  background: white;
  color: #374151;

  &:hover {
    border-color: #487de1;
    color: #487de1;
  }
`;

const chipActive = css`
  background: #487de1;
  border-color: #487de1;
  color: white;

  &:hover {
    background: #3a6fd4;
    border-color: #3a6fd4;
    color: white;
  }
`;

const IconsGrid = (args: Parameters<typeof Icon>[0]) => {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState<string>('All');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedIcon(name);
    setTimeout(
      () => setCopiedIcon((prev) => (prev === name ? null : prev)),
      1500,
    );
  };
  const query = search.toLowerCase();

  const visibleGroups = (() => {
    const groups =
      activeGroup === 'All'
        ? ALL_GROUPS
        : ALL_GROUPS.filter((g) => g.label === activeGroup);

    if (!query) return groups;

    return groups
      .map((g) => ({
        ...g,
        icons: g.icons.filter((name) => name.includes(query)),
      }))
      .filter((g) => g.icons.length > 0);
  })();

  return (
    <div>
      {/* Sticky header */}
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}>
        <input
          placeholder="Search icons…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          css={css`
            padding: 6px 10px;
            width: 280px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 14px;
            font-family: inherit;
            outline: none;

            &:focus {
              border-color: #487de1;
            }
          `}
        />
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            align-items: center;
          `}>
          <span
            css={css`
              font-size: 12px;
              color: #6b7280;
              margin-right: 4px;
            `}>
            Group by:
          </span>
          {ALL_LABELS.map((label) => (
            <button
              key={label}
              onClick={() => setActiveGroup(label)}
              css={[chipBase, activeGroup === label && chipActive]}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content — offset to clear the fixed header */}
      <div
        css={css`
          padding-top: 100px;
          padding-bottom: 54px;
        `}>
        {visibleGroups.map(({ label, icons }) => (
          <section
            key={label}
            css={css`
              margin-bottom: 40px;
            `}>
            <div
              css={css`
                margin-bottom: 16px;
                font-size: 16px;
                font-weight: 600;
                color: #1a1a1a;
              `}>
              {label}
              <span
                css={css`
                  font-size: 12px;
                  font-weight: 400;
                  color: #9ca3af;
                  margin-left: 8px;
                `}>
                {icons.length}
              </span>
            </div>
            <div css={gridStyle}>
              {icons.map((iconName) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                <div
                  css={[
                    iconWrapper,
                    copiedIcon === iconName && iconWrapperCopied,
                  ]}
                  key={iconName}
                  onClick={() => copyToClipboard(iconName)}>
                  <Icon
                    name={iconName as keyof MapIconsType}
                    size={
                      args.size &&
                      (iconName === 'robot' ? args.size * 2 : args.size)
                    }
                    color={args.color}
                    tooltip={
                      args.tooltip ? `${args.tooltip} - ${iconName}` : undefined
                    }
                  />
                  <Typography
                    variant="body1"
                    css={
                      copiedIcon === iconName
                        ? css`
                            color: #22c55e;
                            font-weight: 500;
                          `
                        : undefined
                    }>
                    {copiedIcon === iconName ? 'Copied!' : iconName}
                  </Typography>
                </div>
              ))}
            </div>
          </section>
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
