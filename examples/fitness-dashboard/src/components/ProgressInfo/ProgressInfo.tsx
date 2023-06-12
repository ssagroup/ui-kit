import { Fragment, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { PieCustomLayerProps, ResponsivePie } from '@nivo/pie';

import {
  Card,
  CardHeader,
  Typography,
  SmallDropdown,
  IDropdownItemProp,
} from '@ssa-ui-kit/core';

import { useWindowSize } from '@ssa-ui-kit/hooks';

import ProgressInfoContent from './ProgressInfoContent';
import ProgressInfoLegends from './ProgressInfoLegends';
import ProgressInfoMetric from './ProgressInfoMetric';

import {
  ProgressInfoItemProps,
  TextPositionMap,
  Period,
  ProgressInfoResp,
  PeriodOption,
} from './types';

export const ProgressInfo = ({ data }: { data: ProgressInfoResp }) => {
  const { width: windowWidth } = useWindowSize();
  const [options, setOptions] = useState<PeriodOption[]>([]);
  const [selected, setSelected] = useState<PeriodOption>();
  const [response, setResponse] = useState<ProgressInfoItemProps[]>([]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const options: PeriodOption[] = [];

      Object.keys(data).forEach((key) => {
        Object.keys(data[key]).length > 0
          ? options.push({ val: key, id: key })
          : null;
      });

      setOptions(options);
      setSelected(options[0]);

      filterData(options[0].id as Period);
    }
  }, [data]);

  const sumValues = (
    acc: ProgressInfoItemProps,
    cur: ProgressInfoItemProps,
  ) => {
    return {
      ...acc,
      value: acc.value + (cur?.value ? cur.value : 0),
    };
  };

  const filterData = (e: Period) => {
    const response: ProgressInfoItemProps[] = [];

    Object.keys(data[e]).forEach((key) => {
      const el = data[e][key].reduce(sumValues);

      response.push(el);
    });

    setResponse(response);
  };

  const handleChange = (e: IDropdownItemProp) => {
    filterData(e.id as Period);
  };

  /* istanbul ignore next */
  const CenteredMetric = ({
    dataWithArc,
    centerX,
    centerY,
  }: PieCustomLayerProps<ProgressInfoItemProps>) => {
    let total = 0;

    dataWithArc.forEach((datum) => {
      total += datum.value;
    });

    const size = windowWidth < 900 ? 'small' : 'large';

    const textPosition: TextPositionMap = {
      caption: {
        small: { x: centerX, y: centerY - 15 },
        large: { x: centerX, y: centerY - 20 },
      },
      value: {
        small: { x: centerX - 12, y: centerY + 6 },
        large: { x: centerX - 12, y: centerY + 5 },
      },
      unit: {
        small: { x: centerX + 20, y: centerY + 7 },
        large: { x: centerX + 35, y: centerY + 9 },
      },
    };

    return (
      <ProgressInfoMetric
        textPosition={textPosition}
        total={total}
        size={size}
      />
    );
  };

  return (
    <Card
      css={css`
        border-radius: 20px;
        padding-inline: 24px;
        padding-block: 24px;
      `}>
      <CardHeader>
        <Typography variant="h3" weight="bold">
          Progress
        </Typography>

        {Object.keys(options).length > 0 && (
          <SmallDropdown
            onChange={handleChange}
            selectedItem={selected}
            items={options}
          />
        )}
      </CardHeader>
      <ProgressInfoContent>
        {response.length > 0 ? (
          <Fragment>
            <div>
              <ResponsivePie
                data={response}
                isInteractive={false}
                innerRadius={0.8}
                enableArcLinkLabels={false}
                enableArcLabels={false}
                padAngle={2}
                cornerRadius={16}
                activeOuterRadiusOffset={8}
                colors={{ datum: 'data.color' }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                layers={['arcs', CenteredMetric]}
              />
            </div>

            <ProgressInfoLegends data={response} />
          </Fragment>
        ) : null}
      </ProgressInfoContent>
    </Card>
  );
};
