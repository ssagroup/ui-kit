/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from '@emotion/react';

import NavToggleWrapper from './NavToggleWrapper';

const NavToggle = ({ htmlFor }: { htmlFor: string }) => (
  <NavToggleWrapper>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label
      htmlFor={htmlFor}
      css={css`
        cursor: pointer;

        height: 20px;
        width: 20px;

        transform: scale(-1, 1);

        span {
          height: 2px;
          width: 100%;
          background: black;
          display: block;
          margin: 3px 0;

          &:nth-of-type(2) {
            width: 80%;
          }
        }
      `}>
      <span></span>
      <span></span>
      <span></span>
    </label>
  </NavToggleWrapper>
);

export default NavToggle;
