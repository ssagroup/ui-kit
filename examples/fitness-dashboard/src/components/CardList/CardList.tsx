import { Fragment } from 'react';
import { css } from '@emotion/react';

import { Typography } from '@ssa-ui-kit/core';

import { ICardListProps, Item } from './types';

/**
 *
 * UI Component that renders a list of items with a custom render function
 */
export const CardList = <ItemType extends Item>({
  title,
  items,
  renderItem,
}: ICardListProps<ItemType>) => {
  return (
    <Fragment>
      <Typography variant="h5" weight="bold">
        {title}
      </Typography>

      <ul
        css={css`
          list-style: none;
          padding: 0;

          li {
            margin-bottom: 15px;
          }
        `}>
        {Array.isArray(items) &&
          items.map((item) => <li key={item.id}>{renderItem(item)}</li>)}
      </ul>
    </Fragment>
  );
};
