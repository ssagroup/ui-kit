import React from 'react';
import { PersonInfoProps } from './types';
import { PersonInfoIcon } from './PersonInfoIcon';
import { PersonInfoAvatar } from './PersonInfoAvatar';
import { PersonInfoBadges } from './PersonInfoBadges';
import { PersonInfoCounter } from './PersonInfoCounter';

import * as S from './styles';

export const PersonInfo = React.forwardRef<HTMLDivElement, PersonInfoProps>(
  function PersonInfo(
    {
      title,
      icon,
      value,
      badges,
      avatar,
      counterTooltip,
      attributes,
      description,
      styles,
      className,
      link,
      openLinkInNewTab,
      ...props
    },
    ref,
  ) {
    return (
      <S.PersonInfoBase ref={ref} className={className} {...props}>
        <S.PersonInfoHeader>
          {icon && <PersonInfoIcon icon={icon} />}
          <S.TitleWrapper>
            <S.Title css={styles?.title}>{title}</S.Title>
            <S.Row>
              <PersonInfoAvatar
                avatar={avatar}
                value={value}
                styles={styles}
                link={link}
                openLinkInNewTab={openLinkInNewTab}
              />
              {counterTooltip && (
                <PersonInfoCounter
                  counterTooltip={counterTooltip}
                  css={styles?.counter}
                />
              )}
            </S.Row>
            {badges && <PersonInfoBadges badges={badges} styles={styles} />}
            {attributes && attributes.length > 0 && (
              <S.AttributesList>
                {attributes.map((attr, index) => {
                  if (typeof attr === 'string') {
                    return (
                      <S.TextBase key={index} css={styles?.attributes}>
                        {attr}
                      </S.TextBase>
                    );
                  }
                  return <React.Fragment key={index}>{attr}</React.Fragment>;
                })}
              </S.AttributesList>
            )}
            {description && (
              <S.TextBase css={styles?.description}>{description}</S.TextBase>
            )}
          </S.TitleWrapper>
        </S.PersonInfoHeader>
      </S.PersonInfoBase>
    );
  },
);
