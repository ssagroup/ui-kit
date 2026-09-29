import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import * as S from '../styles';
import { TypeaheadItemProps } from '../types';
import Button from '@components/Button';
import Tooltip from '@components/Tooltip';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';
import {
  asText,
  LABEL_TOOLTIP_DELAY,
  LABEL_TOOLTIP_MAX_WIDTH,
} from '../singleLine';

export const TypeaheadOption = ({
  children,
  avatar,
  isCustomValue,
  ...rest
}: TypeaheadItemProps) => {
  const theme = useTheme();

  // `disabled` is the supported spelling, but the styled <li> below would
  // forward it to the DOM, where it is not valid on an <li>. useTypeahead has
  // already resolved it into `isDisabled`, which emotion filters out.
  const optionProps = { ...rest };
  delete optionProps.disabled;

  const tooltipText =
    asText(children) ?? asText(rest.label) ?? asText(rest.value);
  const label = (
    <div
      css={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        color: isCustomValue ? theme.palette.primary.main : 'inherit',
      }}>
      {children}{' '}
    </div>
  );

  return (
    <S.TypeaheadOption {...optionProps}>
      {avatar && (
        <S.TypeaheadItemAvatar data-testid="typeahead-option-avatar">
          {avatar}
        </S.TypeaheadItemAvatar>
      )}
      {/*
        Options are always a single ellipsised line, so every row carries the
        full label in a tooltip -- same call as the Dropdown options (#669).
        With renderOption the children are markup, so the tooltip falls back
        to the option's label.
      */}
      {tooltipText === undefined ? (
        label
      ) : (
        <Tooltip
          enableHover
          enableClick={false}
          size="medium"
          color="white"
          hoverOpenDelay={LABEL_TOOLTIP_DELAY}
          placement="top">
          <TooltipTrigger>{label}</TooltipTrigger>
          <TooltipContent maxWidth={LABEL_TOOLTIP_MAX_WIDTH}>
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      )}
      {rest.isActive && (
        <Button
          variant="tertiary"
          css={{
            height: 'auto',
            padding: 0,
          }}
          startIcon={
            <Icon
              name="check"
              size={10}
              css={{ marginLeft: 'auto', minWidth: 10 }}
            />
          }
        />
      )}
    </S.TypeaheadOption>
  );
};
