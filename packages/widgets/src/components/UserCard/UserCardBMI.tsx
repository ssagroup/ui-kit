import { css } from '@emotion/react';

import { User } from './types';
import UserCardItem from './UserCardItem';

const listCards = css`
  display: flex;
  justify-content: space-between;

  list-style: none;
  padding: 0;

  li {
    max-width: 92px;
  }
`;

const UserCardBMI = ({
  weight,
  height,
  age,
}: Partial<Pick<User, 'weight' | 'height' | 'age'>>) => (
  <ul css={listCards}>
    <li>
      <UserCardItem value={weight || ''} unit="kg" caption="Weight" />
    </li>
    <li>
      <UserCardItem value={height || ''} unit="cm" caption="Height" />
    </li>
    <li>
      <UserCardItem value={age || ''} unit="yrs" caption="Age" />
    </li>
  </ul>
);

export default UserCardBMI;
