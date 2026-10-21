import { MouseEvent, ReactNode } from 'react';
import { useTheme } from '@emotion/react';

import Avatar from '@components/Avatar';
import { AvatarSizes } from '@components/Avatar/types';
import Checkbox from '@components/Checkbox';
import Icon from '@components/Icon';
import Tooltip from '@components/Tooltip';
import TooltipContent from '@components/TooltipContent';
import TooltipTrigger from '@components/TooltipTrigger';

import {
  ContextMenuIncludeExcludeType,
  ContextMenuIndicator,
  ContextMenuItem,
  ContextMenuItemState,
  ContextMenuValue,
} from './types';
import { asText, LABEL_TOOLTIP_DELAY, LABEL_TOOLTIP_MAX_WIDTH } from './utils';
import * as S from './styles';

const INCLUDE_EXCLUDE_TEXT: Record<ContextMenuIncludeExcludeType, string> = {
  include: 'included',
  exclude: 'excluded',
  selected: 'selected',
};

export interface ContextMenuOptionProps<V extends ContextMenuValue> {
  id: string;
  item: ContextMenuItem<V>;
  state: ContextMenuItemState;
  role: 'option' | 'menuitem';
  /** Resolved indicator; `null` in `includeExclude` mode. */
  indicator: ContextMenuIndicator | null;
  renderItem?: (
    item: ContextMenuItem<V>,
    state: ContextMenuItemState,
  ) => ReactNode;
  /** Row click. Not called for include / exclude rows, whose controls choose. */
  onActivate: () => void;
  /** An include / exclude control was clicked. */
  onIncludeExclude: (type: ContextMenuIncludeExcludeType) => void;
  onHover: () => void;
}

const renderAvatar = (avatar: ContextMenuItem['avatar']) =>
  typeof avatar === 'string' ? (
    <Avatar size={AvatarSizes.small} image={avatar} />
  ) : (
    avatar
  );

/** The default row content: status / avatar, label, description and slots. */
const ItemContent = <V extends ContextMenuValue>({
  item,
}: {
  item: ContextMenuItem<V>;
}) => {
  const { label, description, avatar, status, startContent, endContent } = item;
  // A node label gets the tooltip only through an explicit textValue: the
  // label itself must not be rendered twice.
  const tooltipText = asText(label) ?? item.textValue;

  return (
    <>
      {status ? (
        <span css={S.status} style={{ background: status }} aria-hidden />
      ) : null}
      {avatar ? <span css={S.slot}>{renderAvatar(avatar)}</span> : null}
      {startContent ? <span css={S.slot}>{startContent}</span> : null}
      {/*
        Tooltip on every text row, as in Dropdown (#669): detecting truncation
        would mean measuring each row, and the delay keeps it out of the way.
        Click is off so a click still chooses the option.
      */}
      {tooltipText === undefined ? (
        <span css={S.label}>{label}</span>
      ) : (
        <Tooltip
          enableHover
          enableClick={false}
          size="medium"
          color="white"
          hoverOpenDelay={LABEL_TOOLTIP_DELAY}
          placement="top">
          <TooltipTrigger>
            <span css={S.label}>{label}</span>
          </TooltipTrigger>
          <TooltipContent maxWidth={LABEL_TOOLTIP_MAX_WIDTH}>
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      )}
      {description ? <span css={S.description}>{description}</span> : null}
      {endContent ? <span css={S.slot}>{endContent}</span> : null}
    </>
  );
};

/** One option row of a `ContextMenu`. Internal. */
export const ContextMenuOption = <V extends ContextMenuValue>({
  id,
  item,
  state,
  role,
  indicator,
  renderItem,
  onActivate,
  onIncludeExclude,
  onHover,
}: ContextMenuOptionProps<V>) => {
  const theme = useTheme();
  const { selected, active, disabled, includeExcludeType } = state;
  const isIncludeExclude = indicator === null;
  const isIncludeExcludeRow = isIncludeExclude && !item.selectOnly;

  // In includeExclude mode the filled icons mark the choice, so the row keeps
  // its resting background (as in FiltersMultiSelect).
  const showSelectedBackground =
    selected && !isIncludeExclude && indicator !== 'checkCircle';

  const handleClick = () => {
    if (disabled || isIncludeExcludeRow) return;
    onActivate();
  };

  const handleControlClick =
    (type: ContextMenuIncludeExcludeType) => (event: MouseEvent) => {
      event.stopPropagation();
      if (!disabled) onIncludeExclude(type);
    };

  const circleIcon = (
    type: ContextMenuIncludeExcludeType,
    name: 'plus-circle' | 'minus-circle' | 'check-circle',
    color: string | undefined,
  ) => (
    // Mouse-only shortcut: the row is keyboard-operable through Enter on the
    // list, and nested controls inside an option are not allowed.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <span
      css={S.includeExcludeControl}
      aria-disabled={disabled || undefined}
      data-type={type}
      onClick={handleControlClick(type)}>
      <Icon
        name={includeExcludeType === type ? `${name}-inverted` : name}
        size={20}
        color={color}
      />
    </span>
  );

  return (
    // Keyboard is handled by the list (aria-activedescendant).
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li
      id={id}
      role={role}
      css={S.option}
      aria-selected={role === 'option' ? selected : undefined}
      aria-disabled={disabled || undefined}
      data-active={active || undefined}
      data-selected={showSelectedBackground || undefined}
      onClick={handleClick}
      onMouseMove={disabled ? undefined : onHover}>
      {indicator === 'checkbox' ? (
        <span css={S.checkbox} aria-hidden inert>
          <Checkbox checked={selected} disabled={disabled} />
        </span>
      ) : null}
      {renderItem ? renderItem(item, state) : <ItemContent item={item} />}
      {indicator === 'check' && selected ? (
        <span css={S.slot} aria-hidden>
          <Icon name="check" size={12} color={theme.colors.greyDarker} />
        </span>
      ) : null}
      {indicator === 'checkCircle' ? (
        <span css={S.slot} aria-hidden>
          <Icon
            name={selected ? 'check-circle-inverted' : 'check-circle'}
            size={20}
            color={theme.colors.blue}
          />
        </span>
      ) : null}
      {isIncludeExclude ? (
        <span css={S.includeExcludeControls} aria-hidden>
          {item.selectOnly ? (
            circleIcon('selected', 'check-circle', theme.colors.blue)
          ) : (
            <>
              {circleIcon('include', 'plus-circle', theme.colors.greenDark)}
              {circleIcon('exclude', 'minus-circle', theme.colors.redDark)}
            </>
          )}
        </span>
      ) : null}
      {includeExcludeType ? (
        <span css={S.visuallyHidden}>
          , {INCLUDE_EXCLUDE_TEXT[includeExcludeType]}
        </span>
      ) : null}
    </li>
  );
};
