import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const baseText = (count: number) => css`
  font-weight: 700 !important;
  &::after {
    display: inline-block;
    font-weight: 100;
    margin-left: 3px;
    content: '${count}';
  }
`;

export const Widgets = styled.div`
  display: grid;
  gap: 10.5px;
  grid-template-columns: repeat(2, calc(50% - 8px));
  grid-template-rows:
    332px
    repeat(3, 148px)
    auto
    repeat(2, 148px)
    repeat(6, 250px);
  grid-template-areas:
    'events events'
    'seniorityLevel seniorityLevel'
    'age age'
    'educationLevel educationLevel'
    'departments departments'
    'staffType workSchedule'
    'employmentType gender'
    'headCountByFullCompany headCountByFullCompany'
    'fteGraph fteGraph'
    'productionAdministrative productionAdministrative'
    'seniorityOfProductionEmployees seniorityOfProductionEmployees'
    'utilization utilization'
    'resourcesOnBench resourcesOnBench';
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, calc(25% - 8px));
    grid-template-rows:
      repeat(4, 180px)
      repeat(3, 220px);
    grid-template-areas:
      'events events seniorityLevel departments'
      'events events educationLevel departments'
      'staffType workSchedule age departments'
      'gender employmentType headCountByFullCompany headCountByFullCompany'
      'fteGraph fteGraph productionAdministrative productionAdministrative'
      'seniorityOfProductionEmployees seniorityOfProductionEmployees utilization utilization'
      'resourcesOnBench resourcesOnBench . .';
  }
`;
