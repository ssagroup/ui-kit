import { Link } from 'react-router-dom';
import { css, useTheme } from '@emotion/react';
import { Wrapper, ButtonGroup } from '@ssa-ui-kit/core';
import { useTranslation } from '@contexts';
import { BotsNavigationProps } from './types';
import { buttonGroupItems } from './consts';
import { ActionButton } from './components';

export const BotsNavigation = ({
  handleRunStateClick,
  handleArchiveButtonClick,
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
        <ActionButton iconName="archive" onClick={handleArchiveButtonClick} />
      </Wrapper>
      <Link
        to="/bots/create-bot/basic"
        css={css`
          font-size: 14px;
          font-weight: 700;
          border-radius: 6px;
          padding: 10px 14px;
          background: linear-gradient(
            247.37deg,
            ${theme.colors.blueLighter} 14.71%,
            ${theme.colors.blue} 85.29%
          );
          color: ${theme.colors.white};
          text-decoration: none;

          &:hover {
            background: linear-gradient(
              247deg,
              ${theme.colors.blueButtonHoverGradientFrom},
              ${theme.colors.blueButtonHoverGradientTo} 85.29%
            );
          }
        `}>
        {t('buttons.createNew')}
      </Link>
    </Wrapper>
  );
};
