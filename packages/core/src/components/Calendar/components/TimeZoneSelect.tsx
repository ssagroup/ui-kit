import { useEffect, useMemo, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';
import { ContextMenu } from '@components/ContextMenu';
import { Popover, PopoverContent, PopoverTrigger } from '@components/Popover';

import * as S from '../styles';

type TimeZoneSelectProps = {
  value: string;
  /** Zones to offer; every zone the browser knows when missing. */
  options?: string[];
  onChange: (zone: string) => void;
};

/** Every IANA zone the browser knows, with UTC; just UTC on old browsers. */
const getSupportedTimeZones = (): string[] => {
  const supportedValuesOf = (
    Intl as { supportedValuesOf?: (key: 'timeZone') => string[] }
  ).supportedValuesOf;
  const zones = supportedValuesOf?.('timeZone') ?? [];
  return zones.includes('UTC') ? zones : ['UTC', ...zones];
};

/** `GMT+2`, `GMT-3:30`, or `GMT` for UTC — the zone's offset right now. */
export const formatTimeZoneOffset = (zone: string) => {
  const offset = DateTime.now().setZone(zone).offset;
  if (!Number.isFinite(offset) || offset === 0) return 'GMT';
  const hours = Math.trunc(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  return `GMT${offset > 0 ? '+' : '-'}${hours}${
    minutes ? `:${String(minutes).padStart(2, '0')}` : ''
  }`;
};

/** The search box; focused when the list opens. */
const SearchField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const theme = useTheme();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <input
      ref={ref}
      type="search"
      css={S.timeZoneSearch(theme)}
      placeholder="Search time zone"
      aria-label="Search time zone"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

/** `America/New_York` → `America/New York`. */
const formatTimeZoneName = (zone: string) => zone.replace(/_/g, ' ');

/** `America/New_York` → `New York (GMT-5)`; `UTC` as is. */
const formatTimeZoneShort = (zone: string) => {
  const city = formatTimeZoneName(zone.split('/').pop() ?? zone);
  const offset = formatTimeZoneOffset(zone);
  return city === 'UTC' ? city : `${city} (${offset})`;
};

/**
 * The calendar's time zone button: shows the zone's offset and opens a
 * searchable list of zones, sorted by offset.
 */
export const TimeZoneSelect = ({
  value,
  options,
  onChange,
}: TimeZoneSelectProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Built when the list opens — offsets change with DST, so not once forever.
  const zones = useMemo(() => {
    if (!open) return [];
    const list = options ?? getSupportedTimeZones();
    const withValue = list.includes(value) ? list : [value, ...list];
    return withValue
      .map((zone) => ({
        zone,
        name: formatTimeZoneName(zone),
        offsetLabel: formatTimeZoneOffset(zone),
        offset: DateTime.now().setZone(zone).offset,
      }))
      .sort((a, b) => a.offset - b.offset || a.name.localeCompare(b.name));
  }, [open, options, value]);

  const search = query.trim().toLowerCase();
  const items = zones
    .filter(
      ({ name, offsetLabel }) =>
        !search ||
        name.toLowerCase().includes(search) ||
        offsetLabel.toLowerCase().includes(search),
    )
    .map(({ zone, name, offsetLabel }) => ({
      value: zone,
      label: name,
      description: offsetLabel,
    }));

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) setQuery('');
  };

  return (
    <Popover placement="bottom-end" open={open} onOpenChange={changeOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          css={S.timeZoneButton(theme)}
          // Starts with the visible text, so voice control finds it by what
          // it shows; the full zone name is in the tooltip.
          aria-label={`Time zone: ${formatTimeZoneShort(value)}`}
          title={formatTimeZoneName(value)}
          aria-haspopup="dialog"
          onClick={() => changeOpen(!open)}>
          <Icon name="clock" size={16} color={theme.colors.greyDarker} />
          <span>{formatTimeZoneShort(value)}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent css={S.timeZonePopover(theme)}>
        <SearchField value={query} onChange={setQuery} />
        <ContextMenu<string>
          aria-label="Time zones"
          selectionMode="single"
          value={value}
          items={items}
          maxHeight={280}
          emptyState="No time zones found"
          onAction={(zone) => {
            if (zone !== value) onChange(zone);
            changeOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
