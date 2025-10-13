import { useTheme } from '@emotion/react';

import { ButtonGroup, Wrapper } from '@ssa-ui-kit/core';

import { useTranslation } from '@contexts';

import { buttonGroupItems } from './consts';
import { BotsNavigationProps } from './types';

export const BotsNavigation = ({
  handleRunStateClick,
  externalState,
}: BotsNavigationProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const items = buttonGroupItems.map((item) => ({
    ...item,
    text: t(item.text),
  }));

  return (
    <Wrapper
      data-testid="bots-navigation"
      css={{
        marginBottom: 0,
        ['& button']: {
          height: 30,
        },
        [theme.mediaQueries.md]: {
          marginBottom: 14,
          ['& button']: {
            height: 36,
          },
        },
        [theme.mediaQueries.lg]: {
          ['& button']: {
            height: 40,
          },
        },
      }}>
      <Wrapper>
        <div
          css={{
            textWrap: 'nowrap',
          }}>
          <ButtonGroup
            items={items}
            onClick={handleRunStateClick}
            selectedItem={externalState}
            externalState={externalState}
          />
        </div>
      </Wrapper>
    </Wrapper>
  );
};
