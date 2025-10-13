/* eslint-disable jsx-a11y/label-has-associated-control */
import { Fragment } from 'react';

import { css } from '@emotion/react';

import { CollapsibleNavToggleWrapper } from '.';

export const CollapsibleNavToggle = ({ id }: { id: string }) => {
  return (
    <Fragment>
      <CollapsibleNavToggleWrapper>
        <label
          htmlFor={id}
          data-testid="collapsible-nav-toggle-label"
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
              margin: 4px 0;
              transform-origin: 4px 0;
              transition:
                transform 0.3s cubic-bezier(0.77, 0.2, 0.05, 1),
                background 0.3s cubic-bezier(0.77, 0.2, 0.05, 1),
                opacity 0.35s ease;

              &:first-of-type {
                transform-origin: 0% 0%;
              }

              &:nth-last-of-type(2) {
                transform-origin: 0% 100%;
              }
            }
          `}>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </CollapsibleNavToggleWrapper>
    </Fragment>
  );
};
