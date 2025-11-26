import React from 'react';
import { PersonInfoProps } from './types';
import * as S from './styles';
import { PersonInfoIcon } from './PersonInfoIcon';
import { PersonInfoAvatar } from './PersonInfoAvatar';
import { PersonInfoValue } from './PersonInfoValue';
import { PersonInfoBadges } from './PersonInfoBadges';

export const PersonInfo = React.forwardRef<HTMLDivElement, PersonInfoProps>(
  function PersonInfo(
    {
      title,
      icon,
      value,
      badges,
      avatar,
      counter,
      attributes,
      description,
      styles,
      className,
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
            {avatar && (
              <PersonInfoAvatar
                avatar={avatar}
                value={value}
                counter={counter}
                styles={styles}
              />
            )}
            {!avatar && value && (
              <PersonInfoValue
                value={value}
                counter={counter}
                css={styles?.value}
                counterCss={styles?.counter}
              />
            )}
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
