import styled from '@emotion/styled';

const MealPlannerBars = styled.ul`
  display: flex;

  list-style: none;

  width: 100%;
  height: 20px;

  padding: 0;
  margin: 0;

  & > li:nth-of-type(2n):not(:last-child) {
    margin: 0 5px;
  }
`;

export default MealPlannerBars;
