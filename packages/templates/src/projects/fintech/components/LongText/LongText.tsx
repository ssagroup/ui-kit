import DomPurify from 'dompurify';

import { useTheme } from '@emotion/react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@ssa-ui-kit/core';

import { ALLOWED_TAGS } from './constants';
import * as S from './styled';
import { LongTextProps } from './types';

export const LongText = ({
  text,
  longText,
  overflow = 'hidden',
  allowTags = false,
  triggerCSS,
}: LongTextProps) => {
  const theme = useTheme();
  if (!text) {
    return null;
  }

  const textHTMLSanitized = DomPurify.sanitize(text as unknown as string, {
    ALLOWED_TAGS,
  });

  const longTextHTMLSanitized = DomPurify.sanitize(
    longText as unknown as string,
    {
      ALLOWED_TAGS,
    },
  );

  return (
    <Tooltip
      enableClick={false}
      enableHover
      size="medium"
      offsetOptions={0}
      placement={'bottom-start'}
      hasArrow={false}>
      <TooltipTrigger>
        <S.TooltipTriggerContent overflow={overflow} css={triggerCSS}>
          {allowTags ? (
            <div dangerouslySetInnerHTML={{ __html: textHTMLSanitized }} />
          ) : (
            text
          )}
        </S.TooltipTriggerContent>
      </TooltipTrigger>
      <TooltipContent
        css={{
          borderRadius: 3,
          background: theme.colors.greyGraphite,
          fontWeight: 600,
          fontSize: 12,
          color: theme.colors.white,
          padding: '5px 8px 5px 5px',
          whiteSpace: 'pre-line',
          lineHeight: '20px',
          marginTop: 2,
        }}>
        {allowTags ? (
          <div
            dangerouslySetInnerHTML={{
              __html: longTextHTMLSanitized || textHTMLSanitized,
            }}
          />
        ) : (
          <>{longText || text}</>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
