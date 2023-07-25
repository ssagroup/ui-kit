import { css } from '@emotion/react';

import NavToggleWrapper from './NavToggleWrapper';

const NavToggle = () => (
  <NavToggleWrapper>
    <label
      htmlFor="nav"
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
