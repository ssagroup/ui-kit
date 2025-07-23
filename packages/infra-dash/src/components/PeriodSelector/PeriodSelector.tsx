import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { DropdownOption, Dropdown } from '@ssa-ui-kit/core';

import { useInfraDashPanelDataPeriodContext } from '@shared/context';
import { PANEL_DATA_PERIOD, PanelDataPeriod } from '@shared/panel';

const CustomOption = styled(DropdownOption)`
  display: flex;
  align-items: center;
  padding: 0 16px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  gap: 8px;
  padding: 10px 12px;
  min-height: 40px;
  line-height: 20px;
  justify-content: space-between;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.blueRoyal12 : theme.colors.white};
  &:hover {
    background: rgba(72, 125, 225, 0.06);
  }
`;

export const PeriodSelector = () => {
  const theme = useTheme();
  const { period, changePeriod } = useInfraDashPanelDataPeriodContext();

  const handlePeriodSelect = (period: PanelDataPeriod) => {
    changePeriod(period);
  };

  const items = [
    { value: PANEL_DATA_PERIOD.LAST_HOUR, label: 'Last Hour' },
    { value: PANEL_DATA_PERIOD.LAST_6_HOURS, label: 'Last 6 Hours' },
    { value: PANEL_DATA_PERIOD.LAST_24_HOURS, label: 'Last 24 Hours' },
    { value: PANEL_DATA_PERIOD.LAST_7_DAYS, label: 'Last 7 Days' },
    { value: PANEL_DATA_PERIOD.LAST_30_DAYS, label: 'Last 30 Days' },
  ];

  return (
    <Dropdown
      selectedItem={items.find((item) => item.value === period)}
      onChange={(item) => handlePeriodSelect(item.value)}
      css={css`
        min-width: 135px;
        height: 44px;
        justify-content: space-between;
        white-space: nowrap;
        background: ${theme.colors.white};
        border: 1px solid ${theme.colors.grey};
        &:hover {
          border-color: ${theme.colors.greyDarker80};
        }
        :focus {
          background: ${theme.colors.white};
          border-color: ${theme.colors.blueRoyal};
          box-shadow: none;
          &:before {
            border: none;
          }
          svg path {
            stroke: ${theme.colors.greyDarker};
          }
        }
        & svg path {
          stroke: ${theme.colors.greyDarker};
        }
        &[aria-expanded='true'] {
          box-shadow: none;
          background: ${theme.colors.white};
          border: 1px solid ${theme.colors.blueRoyal} !important;
          color: #000;
        }
      `}>
      {items.map((item) => (
        <CustomOption key={item.value} value={item.value} label={item.label}>
          {item.label}
        </CustomOption>
      ))}
    </Dropdown>
  );
};
