import { useState } from 'react';
import { css } from '@emotion/css';
import { ButtonGroupItem, Table } from '@ssa-ui-kit/core';
import { pathOr, propOr } from '@ssa-ui-kit/utils';
import { DashboardEvents } from '@/hr/types';
import * as hooks from '@hr/hooks';
import { EventInfoRow, EventInfoTitle } from './components';
import { WithWidgetLoader } from '../WithWidgetLoader';
import { Card } from '../WidgetCard';
import { Period } from './types';

export const Events = ({
  data,
  title,
  gridArea,
}: {
  data: DashboardEvents;
  title: string;
  gridArea: string;
}) => {
  const [currentPeriod, setCurrentPeriod] = useState<Period>('today');
  const {
    anniversaries,
    birthdays,
    newComers,
    assessments,
    terminations,
    trials,
  } = propOr(
    {
      anniversaries: [],
      birthdays: [],
      newComers: [],
      assessments: [],
      terminations: [],
      trials: [],
    },
    currentPeriod,
  )(data);

  const handlePeriodChange = (item: ButtonGroupItem) => {
    setCurrentPeriod(item.id as Period);
  };

  return (
    <Card
      title={
        <EventInfoTitle handlePeriodChange={handlePeriodChange} title={title} />
      }
      css={{
        gridArea,
        overflow: 'hidden',
        '& > div': {
          '&:first-of-type': {
            marginBottom: 0,
          },
          '&:last-of-type': {
            maxWidth: '100%',
          },
        },
        '& h3': {
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        '& p': {
          marginBottom: 0,
        },
      }}>
      <Table
        css={{
          borderCollapse: 'separate',
          borderSpacing: '0 10px',
        }}>
        <tbody
          css={{
            '&>span': {
              display: 'none',
            },
          }}>
          <EventInfoRow
            items={birthdays}
            itemLabel="widgets.events.birthdays"
            rowCircleColor={css`
              background: linear-gradient(
                247deg,
                #7599de 14.71%,
                #4178e1 85.29%
              );
            `}
          />
          <EventInfoRow
            items={anniversaries}
            itemLabel="widgets.events.anniversaries"
            rowCircleColor={css`
              background: linear-gradient(90deg, #44b3fc 0%, #85c7f2 100%);
            `}
          />
          <EventInfoRow
            items={newComers}
            itemLabel="widgets.events.newComers"
            rowCircleColor={css`
              background: linear-gradient(116deg, #41bbbb 16.5%, #7dcbcb 83.5%);
            `}
          />
          <EventInfoRow
            items={trials}
            itemLabel="widgets.events.trialEnds"
            rowCircleColor={css`
              background: linear-gradient(
                296deg,
                #89d996 16.38%,
                #52c587 83.62%
              );
            `}
          />
          <EventInfoRow
            items={assessments}
            itemLabel="widgets.events.assessments"
            rowCircleColor={css`
              background: linear-gradient(90deg, #ed995d 0%, #edba5d 100%);
            `}
            outputDateFormat="MMM, y"
            suffixNeeded={false}
          />
          <EventInfoRow
            items={terminations}
            itemLabel="widgets.events.terminations"
            rowCircleColor={css`
              background: linear-gradient(68deg, #eb7556 12.3%, #f2888e 88.95%);
            `}
          />
        </tbody>
      </Table>
    </Card>
  );
};

export const EventsWithLoader = ({ isFetching }: { isFetching: boolean }) => {
  const charts = hooks.Dashboard.useDashboardEvents();
  const data = pathOr<typeof charts, DashboardEvents>({}, ['result'])(charts);
  return (
    <WithWidgetLoader
      title={'widgets.events.title'}
      css={{ gridArea: 'events' }}
      isFetching={isFetching}>
      <Events data={data} title={'widgets.events.title'} gridArea="events" />
    </WithWidgetLoader>
  );
};
