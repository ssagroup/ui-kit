import { useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';
import { Popover, PopoverContent, PopoverTrigger } from '@components/Popover';

import { useCalendarContext } from '../CalendarContext';
import { NormalizedEvent, withLocale } from '../utils';
import * as S from '../styles';
import { EventSlot } from './EventSlot';

type MoreEventsPopoverProps = {
  date: DateTime;
  /** Entries the cell had no room for — only these are listed. */
  items: NormalizedEvent[];
};

/**
 * The "+N more" button of a month cell and the card it opens.
 *
 * Controlled, so the close button can be a plain icon (the kit's
 * `PopoverClose` wraps it in a padded `Button`) and so picking an entry can
 * close the card.
 */
export const MoreEventsPopover = ({ date, items }: MoreEventsPopoverProps) => {
  const theme = useTheme();
  const { locale } = useCalendarContext();
  const [open, setOpen] = useState(false);
  // Picking an entry closes the card, so its details anchor to the button.
  const triggerRef = useRef<HTMLButtonElement>(null);
  const heading = withLocale(date, locale).toFormat('cccc, d');

  return (
    <Popover placement="bottom-start" open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          css={S.moreButton(theme)}
          aria-label={`${items.length} more on ${heading}`}
          onClick={() => setOpen((current) => !current)}>
          +{items.length} more
        </button>
      </PopoverTrigger>
      <PopoverContent css={S.popover(theme)}>
        <div css={S.popoverHeader(theme)}>
          <span>{heading}</span>
          <button
            type="button"
            css={S.popoverClose(theme)}
            aria-label="Close"
            onClick={() => setOpen(false)}>
            <Icon name="cross" size={16} color={theme.colors.greyDarker} />
          </button>
        </div>
        <div css={S.popoverList}>
          {items.map((item) => (
            <EventSlot
              key={item.event.id}
              item={item}
              view="month"
              inPopover
              onClicked={() => setOpen(false)}
              getAnchor={() => triggerRef.current}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
