import { CSSProperties } from 'react';

import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';

import { ContentWrapper } from './ContentWrapper';
import { InfoBlock } from './InfoBlock';
import * as S from './styles';
import { DistributionContentProps, DistributionContentSingle } from './types';

export const DistributionContent = ({
  data,
  contentCSS,
}: DistributionContentProps) => {
  const theme = useTheme();
  const progressBarData = [...data].slice(0, -1);
  const firstLastValues = [data[0], data[data.length - 1]];
  const middleValues: DistributionContentSingle[] = [];
  let percentSum = 0;
  if (data.length > 2) {
    for (let i = 1; i < data.length - 1; i++) {
      middleValues.push(data[i]);
    }
  }
  return (
    <ContentWrapper>
      <div
        css={[
          {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          },
          contentCSS,
        ]}>
        {firstLastValues.map(({ value, label, valueOutput }) => (
          <InfoBlock
            topText={valueOutput}
            description={label}
            key={`${value}${label}info-block`}
          />
        ))}
      </div>
      <div css={S.Bar}>
        <div
          className={[
            css`
              ${S.wrapper(theme)}
              height: 12px;
              width: 100%;
            `,
            data[data.length - 1].backgroundCSS,
          ].join(' ')}>
          {progressBarData.map((item, index) => {
            percentSum += item.value;
            const style: CSSProperties = {
              height: 12,
              width: `${percentSum}%`,
              zIndex: progressBarData.length - index,
            };
            if (index > 0) {
              style.borderTopLeftRadius = 0;
              style.borderBottomLeftRadius = 0;
            }
            return (
              <span
                role="progressbar"
                key={`${item.value}${item.label}${index}`}
                css={S.bar}
                className={item.backgroundCSS}
                style={style}
              />
            );
          })}
        </div>
      </div>
      <div
        css={{
          marginTop: 10,
        }}>
        {middleValues.map(({ value, label }) => (
          <InfoBlock
            topText={value}
            css={[
              {
                marginLeft: data[0].value + value + '%',
              },
            ]}
            description={label}
            key={`${value}${label}info-block`}
          />
        ))}
      </div>
    </ContentWrapper>
  );
};
