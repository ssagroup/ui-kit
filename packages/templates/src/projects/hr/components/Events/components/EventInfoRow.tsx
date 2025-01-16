import React from 'react';
import { useTheme } from '@emotion/react';
import { offset } from '@floating-ui/react';
import { Wrapper, useTranslation } from '@ssa-ui-kit/core';
import { useMinLGMediaQuery, useMinMDMediaQuery } from '@ssa-ui-kit/hooks';
import { BotsTableRow } from '@ssa-ui-kit/widgets';
import { ComponentPopover, ComponentPopoverProps } from '@hr/components';
import { formatDate } from '@hr/utils';
import { UserPlaceholder } from '@icons';
import { EventInfoCell } from './EventInfoCell';
import { EventInfoTooltip } from './EventInfoTooltip';
import { EventInfoAvatar } from './EventInfoAvatar';
import { WithEventLink } from './WithEventLink';
import {
  EventInfoContextType,
  EventInfoProvider,
  useEventInfoContext,
} from './EventInfoContext';
import { EventInfoRowProps } from '../types';

const EventInfoRowComponent = ({
  itemLabel,
  rowCircleColor,
}: EventInfoRowProps) => {
  const theme = useTheme();
  const isMinMDMediaQuery = useMinMDMediaQuery();
  const isMinLGMediaQuery = useMinLGMediaQuery();
  const { t } = useTranslation();
  const {
    firstEventCellRef,
    photoCellRef,
    popoverOffsetLeft,
    items,
    outputDateFormat,
    suffixNeeded,
  } = useEventInfoContext();
  const firstItem = items[0] && {
    date: formatDate(items[0].eventDate, {
      outputDateFormat,
      suffixNeeded,
    }),
    photo: items[0] ? items[0].avatarUrl : '',
    person: items[0] ? items[0].personName : '',
    personId: items[0] ? items[0].personId : null,
  };

  const extraPopoverProps: ComponentPopoverProps['popoverProps'] = {
    floatingOptions: {
      strategy: 'fixed',
    },
  };
  if (isMinLGMediaQuery && items.length <= 1) {
    extraPopoverProps.open = false;
  }
  if (isMinMDMediaQuery) {
    extraPopoverProps.floatingOptions = {
      ...extraPopoverProps.floatingOptions,
      middleware: [
        offset({
          crossAxis: popoverOffsetLeft,
        }),
      ],
    };
  } else {
    extraPopoverProps.floatingOptions = {
      ...extraPopoverProps.floatingOptions,
      placement: 'bottom-end',
    };
  }

  return (
    <ComponentPopover
      popoverProps={{
        interactionsEnabled: isMinLGMediaQuery ? 'hover' : 'both',
        ...extraPopoverProps,
      }}
      content={<EventInfoTooltip />}
      asChild>
      <BotsTableRow
        css={{
          height: 'auto',
          fontSize: 12,
          color: theme.colors.greyDarker,
          background: theme.colors.greyPopoverLight,
          borderRadius: 6,
          minWidth: '100%',
          span: {
            '&[data-type=outside]': {
              display: 'none',
            },
            '&[aria-owns]': {
              display: 'none',
            },
          },
        }}>
        <EventInfoCell
          css={{ width: 18, padding: '0 0 0 12px', marginRight: 8 }}>
          <Wrapper
            css={{
              width: 18,
              height: 18,
              color: '#fff',
              borderRadius: '50%',
              fontSize: 10,
              justifyContent: 'center',
            }}
            className={rowCircleColor}>
            {items.length}
          </Wrapper>
        </EventInfoCell>
        <EventInfoCell css={{ width: 140, padding: '0 20px 0 8px' }}>
          <span
            css={{
              fontSize: 14,
              fontWeight: 800,
            }}>
            {t(itemLabel)}
          </span>
        </EventInfoCell>
        <EventInfoCell css={{ width: 90 }} ref={firstEventCellRef}>
          <Wrapper>
            {items.length === 0 ? (
              <b>{t('widgets.events.noEvents')}</b>
            ) : (
              <>{firstItem?.date}</>
            )}
          </Wrapper>
        </EventInfoCell>
        <EventInfoCell css={{ padding: '0 12px' }} ref={photoCellRef}>
          {firstItem ? (
            <WithEventLink
              link={
                isMinLGMediaQuery
                  ? `#/Employee?ID=${firstItem.personId}`
                  : undefined
              }>
              <Wrapper>
                {firstItem.photo ? (
                  <EventInfoAvatar src={firstItem.photo} />
                ) : (
                  <UserPlaceholder />
                )}
                {isMinLGMediaQuery ? (
                  firstItem.person
                ) : (
                  <span css={{ fontSize: 10, letterSpacing: -2.5 }}>
                    &#x2022;&#x2022;&#x2022;
                  </span>
                )}
              </Wrapper>
            </WithEventLink>
          ) : null}
        </EventInfoCell>
        {isMinLGMediaQuery && (
          <EventInfoCell
            css={{
              width: 30,
              color: theme.colors.greyDarker60,
              padding: '0 12px',
            }}>
            {items.length > 1
              ? `+${items.length - 1} ${t('widgets.events.more')}`
              : ''}
          </EventInfoCell>
        )}
      </BotsTableRow>
    </ComponentPopover>
  );
};

export const EventInfoRow = (
  props: EventInfoRowProps &
    Pick<EventInfoContextType, 'items' | 'outputDateFormat' | 'suffixNeeded'>,
) => {
  const { items, outputDateFormat, suffixNeeded, ...rest } = props;
  return (
    <EventInfoProvider
      items={items}
      outputDateFormat={outputDateFormat}
      suffixNeeded={suffixNeeded}>
      <EventInfoRowComponent {...rest} />
    </EventInfoProvider>
  );
};
