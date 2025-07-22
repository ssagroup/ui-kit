import styled from '@emotion/styled';
import { DropdownOption, Dropdown } from '@ssa-ui-kit/core';

import { useInfraDashPanelDataPeriodContext } from '@shared/context';
import { PANEL_DATA_PERIOD, PanelDataPeriod } from '@shared/panel';
import { css, useTheme } from '@emotion/react';

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
    { id: PANEL_DATA_PERIOD.LAST_HOUR, value: 'Last Hour' },
    { id: PANEL_DATA_PERIOD.LAST_6_HOURS, value: 'Last 6 Hours' },
    { id: PANEL_DATA_PERIOD.LAST_24_HOURS, value: 'Last 24 Hours' },
    { id: PANEL_DATA_PERIOD.LAST_7_DAYS, value: 'Last 7 Days' },
    { id: PANEL_DATA_PERIOD.LAST_30_DAYS, value: 'Last 30 Days' },
  ];

  return (
    <Dropdown
      selectedItem={items.find((item) => item.id === period)}
      onChange={(item) => handlePeriodSelect(item.id)}
      css={css`
        min-width: 130px;
        height: 44px;
        justify-content: space-between;
        white-space: nowrap;
        background: ${theme.colors.white};
        border: 1px solid ${theme.colors.grey};
        :focus {
          background: ${theme.colors.white};
          border-color: ${theme.colors.blueRoyal};
          box-shadow: none;
          svg path {
            stroke: ${theme.colors.greyDarker};
          }
        }
        &[aria-expanded='true'] {
          box-shadow: none;
          background: ${theme.colors.white};
          /* border-color: ${theme.colors.blueRoyal}; */
          border: 1px solid ${theme.colors.blueRoyal} !important;
          color: #000;
        }
      `}>
      {items.map((item) => (
        <CustomOption key={item.id} value={item.id} label={item.value}>
          {item.value}
        </CustomOption>
      ))}
    </Dropdown>
  );

  // return (
  //   <Typeahead
  //     filterOptions={false}
  //     selectedItems={[period]}
  //     onChange={(componentId) =>
  //       handlePeriodSelect(componentId as PanelDataPeriod)
  //     }>
  //     {options.map(([value, label]) => (
  //       <TypeaheadOption key={value} value={value} label={label}>
  //         {label}
  //       </TypeaheadOption>
  //     ))}
  //   </Typeahead>
  // );
};
