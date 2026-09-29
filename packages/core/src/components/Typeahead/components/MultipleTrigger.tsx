import React, { InputHTMLAttributes, useRef } from 'react';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import Input from '@components/Input';
import Button from '@components/Button';
import Tooltip from '@components/Tooltip';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';
import { Counter } from '@components/Counter';
import * as S from '../styles';
import { useTypeaheadContext } from '../Typeahead.context';
import {
  asText,
  LABEL_TOOLTIP_DELAY,
  LABEL_TOOLTIP_MAX_WIDTH,
  useVisibleCount,
} from '../singleLine';
import { TypeaheadValue } from '../types';

const SelectedItem = ({
  selectedItem,
  isOutOfFlow,
  canShrink,
}: {
  selectedItem: TypeaheadValue;
  isOutOfFlow?: boolean;
  canShrink?: boolean;
}) => {
  const theme = useTheme();
  const context = useTypeaheadContext();
  const { singleLine } = context;
  const currentOption = context.optionsWithKey[selectedItem];
  const isCustomValue = !currentOption;
  const optionText = currentOption
    ? currentOption.children || currentOption.label || currentOption.value
    : String(selectedItem);
  const tooltipText = currentOption
    ? (asText(currentOption.children) ??
      asText(currentOption.label) ??
      asText(currentOption.value))
    : String(selectedItem);
  const avatar = currentOption?.avatar;

  const label = (
    <S.TypeaheadItemLabel
      isDisabled={context.isDisabled}
      isCustomValue={isCustomValue}
      singleLine={singleLine}>
      {optionText}
    </S.TypeaheadItemLabel>
  );

  return (
    <S.TypeaheadItem
      onClick={(e) => e.stopPropagation()}
      isDisabled={context.isDisabled}
      isCustomValue={isCustomValue}
      singleLine={singleLine}
      isOutOfFlow={isOutOfFlow}
      canShrink={canShrink}
      aria-hidden={isOutOfFlow || undefined}
      data-typeahead-chip={singleLine || undefined}>
      {avatar && (
        <S.TypeaheadItemAvatar data-testid="typeahead-item-avatar">
          {avatar}
        </S.TypeaheadItemAvatar>
      )}
      {/*
        Truncated only on a single line, where the tooltip is the one way to
        read the full label. Chips that wrap show all of it already.
      */}
      {singleLine && !isOutOfFlow && tooltipText !== undefined ? (
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
      ) : (
        label
      )}
      <S.TypeaheadItemCross
        data-testid="typeahead-item-remove"
        disabled={context.isDisabled}
        isCustomValue={isCustomValue}
        endIcon={
          <Icon
            name="cross"
            tooltip="Remove"
            size={12}
            color={
              context.isDisabled
                ? theme.colors.grey
                : isCustomValue
                  ? theme.palette.primary.main
                  : theme.colors.greyDarker
            }
            css={{
              '& path': {
                strokeWidth: 1,
              },
            }}
          />
        }
        onClick={context.handleRemoveSelectedClick(selectedItem)}
      />
    </S.TypeaheadItem>
  );
};

export const MultipleTrigger = () => {
  const theme = useTheme();
  const context = useTypeaheadContext();
  const typeaheadInputAdditionalProps: InputHTMLAttributes<HTMLInputElement> =
    {};
  const rowRef = useRef<HTMLDivElement>(null);
  const inputGroupRef = useRef<HTMLDivElement>(null);
  const hasChips = Object.values(context.optionsWithKey).length > 0;
  const visibleCount = useVisibleCount({
    enabled: context.singleLine && hasChips,
    rowRef,
    inputGroupRef,
    selectedCount: context.selectedItems.length,
    deps: [context.selectedItems, context.optionsWithKey],
  });
  const hiddenCount = Math.max(0, context.selectedItems.length - visibleCount);
  if (
    !context.selectedItems.length &&
    !context.inputValue &&
    !!context.placeholder
  ) {
    typeaheadInputAdditionalProps.placeholder = context.placeholder;
  }
  return (
    <React.Fragment>
      {hasChips &&
        (context.singleLine
          ? context.selectedItems.length > 0 && (
              <S.TypeaheadSelectedRow ref={rowRef}>
                {context.selectedItems.map((selectedItem, index) => (
                  <SelectedItem
                    key={`typeahead-selected-selectedItem-${index}`}
                    selectedItem={selectedItem}
                    isOutOfFlow={index >= visibleCount}
                    canShrink={visibleCount === 1}
                  />
                ))}
                {hiddenCount > 0 && (
                  <S.TypeaheadSelectedCounter
                    data-typeahead-counter
                    data-testid="typeahead-selected-counter"
                    aria-label={`${hiddenCount} more selected`}>
                    <Counter
                      size="small"
                      count={hiddenCount}
                      css={S.TypeaheadCounterCircle}
                    />
                  </S.TypeaheadSelectedCounter>
                )}
              </S.TypeaheadSelectedRow>
            )
          : context.selectedItems.map((selectedItem, index) => (
              <SelectedItem
                key={`typeahead-selected-selectedItem-${index}`}
                selectedItem={selectedItem}
              />
            )))}
      <S.TypeaheadInputsGroupWrapper
        ref={inputGroupRef}
        isOpen={context.isOpen}
        singleLine={context.singleLine}>
        {!context.isDisabled && (
          <Input
            name={context.inputName}
            status={'custom'}
            disabled={context.isDisabled}
            validationSchema={context.validationSchema}
            inputProps={{
              onClick: context.handleInputClick,
              onKeyDown: context.handleInputKeyDown,
              onChange: context.handleInputChange,
              value: context.inputValue,
              autoComplete: 'off',
              className: ['typeahead-input', S.TypeaheadInput(theme)].join(' '),
            }}
            wrapperClassName={S.TypeaheadInputWrapper}
            ref={context.inputRef}
          />
        )}
        <input
          type="text"
          data-testid="typeahead-input"
          aria-hidden={context.isOpen}
          readOnly
          value={context.firstSuggestion}
          tabIndex={-1}
          disabled={context.isDisabled}
          className={[
            'typeahead-input',
            S.TypeaheadInput(theme),
            S.TypeaheadInputPlaceholder(theme),
          ].join(' ')}
          {...typeaheadInputAdditionalProps}
        />
      </S.TypeaheadInputsGroupWrapper>
      {!context.isDisabled && context.selectedItems.length ? (
        <Button
          variant="tertiary"
          data-testid="remove-all-button"
          endIcon={<Icon name="cross" size={8} tooltip="Remove all" />}
          css={{
            padding: '0 10px',
            marginRight: 4,
            position: 'absolute',
            right: 0,
            zIndex: 10,
          }}
          onClick={context.handleClearAll}
        />
      ) : null}
    </React.Fragment>
  );
};
