import { Fragment } from 'react';

import { Typography } from '@ssa-ui-kit/core';

import ProgressInfoList from './ProgressInfoList';
import ProgressInfoMarker from './ProgressInfoMarker';

import { ProgressInfoItemProps } from './types';

const ProgressInfoLegends = ({ data }: { data: ProgressInfoItemProps[] }) => (
  <Fragment>
    <div>
      <ProgressInfoList>
        {data.map(({ id, label, colorTag }) => (
          <li key={`tag-${id}`}>
            <ProgressInfoMarker color={colorTag} as={'span'} />
            <Typography variant="h6">{label}</Typography>
          </li>
        ))}
      </ProgressInfoList>
    </div>
    <div>
      <ProgressInfoList>
        {data.map(({ id, value }) => (
          <li key={`subtitle-${id}`}>
            <Typography variant="subtitle" color="greyDarker60">
              {value} hrs
            </Typography>
          </li>
        ))}
      </ProgressInfoList>
    </div>
  </Fragment>
);

export default ProgressInfoLegends;
