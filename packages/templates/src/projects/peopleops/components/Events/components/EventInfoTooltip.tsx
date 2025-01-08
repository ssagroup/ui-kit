import { useTheme } from '@emotion/react';
import { Card } from '@ssa-ui-kit/core';
import { useDeviceType } from '@ssa-ui-kit/hooks';
import { formatDate } from '@peopleops/utils';
import { UserPlaceholder } from '@icons';
import { EventInfoAvatar } from './EventInfoAvatar';
import { WithEventLink } from './WithEventLink';
import { useEventInfoContext } from './EventInfoContext';

export const EventInfoTooltip = () => {
  const theme = useTheme();
  const { dateColumnWidth, items, outputDateFormat, suffixNeeded } =
    useEventInfoContext();
  const deviceType = useDeviceType();
  const leftItems = [...items];
  // remove the first item only for 1440+
  if (['lg', 'xlg'].includes(deviceType)) {
    leftItems.shift();
  }
  return (
    <Card
      css={{
        boxShadow: 'none',
        padding: 0,
        '& > a': {
          '&:first-of-type': {
            paddingTop: 5,
          },
          '&:last-of-type': {
            paddingBottom: 5,
          },
        },
      }}>
      {leftItems.map((item) => (
        <WithEventLink
          link={`#/Employee?ID=${item.personId}`}
          key={`month-info-tooltip-card-${item.personId}`}>
          <div
            css={{
              color: theme.colors.greyDarker80,
              width: dateColumnWidth,
              paddingLeft: 12,
            }}>
            {formatDate(item.eventDate, {
              outputDateFormat,
              suffixNeeded,
            })}
          </div>
          {item.avatarUrl ? (
            <EventInfoAvatar src={item.avatarUrl} />
          ) : (
            <UserPlaceholder />
          )}
          <span
            css={{
              color: theme.colors.greyDarker,
              marginRight: 12,
              paddingRight: 12,
            }}>
            {item.personName}
          </span>
        </WithEventLink>
      ))}
    </Card>
  );
};
