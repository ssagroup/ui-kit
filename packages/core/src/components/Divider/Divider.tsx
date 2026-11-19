import { CSSProperties, forwardRef } from 'react';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';

import { DividerOrientation, DividerProps, DividerVariant } from './types';
import * as S from './styles';

type SeparatorAttributes = {
  role?: 'separator';
  'aria-orientation'?: 'vertical';
  'aria-label'?: string;
};

type LineProps = {
  orientation: DividerOrientation;
  variant: DividerVariant;
  stroke: number;
  color: string;
  /** Separator semantics, when the line itself carries them. */
  separator?: SeparatorAttributes;
};

const Line = ({
  orientation,
  variant,
  stroke,
  color,
  separator,
}: LineProps) => {
  const isHorizontal = orientation === 'horizontal';
  const half = stroke / 2;
  // Inset by half a stroke at both ends: the round caps grow into it.
  const svgStyle: CSSProperties = isHorizontal
    ? { left: half, top: 0, width: `calc(100% - ${stroke}px)` }
    : { top: half, left: 0, height: `calc(100% - ${stroke}px)` };

  return (
    <span
      css={S.segment}
      data-divider-line=""
      {...separator}
      style={isHorizontal ? { height: stroke } : { width: stroke }}>
      <svg
        aria-hidden="true"
        focusable="false"
        width={isHorizontal ? undefined : stroke}
        height={isHorizontal ? stroke : undefined}
        style={svgStyle}>
        <line
          x1={isHorizontal ? 0 : half}
          y1={isHorizontal ? half : 0}
          x2={isHorizontal ? '100%' : half}
          y2={isHorizontal ? half : '100%'}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={S.dashArray(variant, stroke)}
        />
      </svg>
    </span>
  );
};

/**
 * Divider - A line that separates content horizontally or vertically, with
 * optional text, a kit icon or any node in the middle.
 *
 * ### Look
 * `variant` is `solid`, `dashed` or `dotted`; `size` sets the thickness
 * (1 / 2 / 3px). `color` is `subtle` (default) or `strong`, which colour only
 * the line, or any theme color key or CSS colour, which also paints the text
 * and the icon. A node passed as children inherits the colour but can set its
 * own.
 *
 * ### Size
 * A horizontal divider fills its container's width and a vertical one the
 * height of its flex row; set `length` for a fixed size. `spacing` (default
 * 8px) keeps empty space on both sides of the line, so the divider never
 * touches its neighbours even in a parent with no gap.
 *
 * ### Accessibility
 * Renders `role="separator"`, with `aria-orientation="vertical"` when
 * vertical. Text content becomes its accessible name; pass `aria-label` to
 * name a divider that shows an icon or a node. A separator's children are
 * hidden from assistive tech, so with a node (which may be interactive) the
 * role moves to the first line piece and the node stays reachable.
 *
 * @category Components
 * @subcategory Layout
 * @example
 * ```tsx
 * <Divider />
 * <Divider variant="dashed" color="strong">Or continue with</Divider>
 * <Divider orientation="vertical" length={24} />
 * ```
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider(
    {
      orientation = 'horizontal',
      variant = 'solid',
      size = 'small',
      color = 'subtle',
      length,
      gap = S.DEFAULT_GAP,
      spacing = S.DEFAULT_SPACING,
      fontSize,
      iconSize = S.DEFAULT_ICON_SIZE,
      icon,
      children,
      'aria-label': ariaLabel,
      className,
      style,
    },
    ref,
  ) {
    const theme = useTheme();
    const colors = S.resolveColors(theme, color);
    const stroke = S.STROKE[size];
    const isHorizontal = orientation === 'horizontal';

    const isText =
      (typeof children === 'string' && children !== '') ||
      typeof children === 'number';
    const hasIcon = icon !== undefined;
    const hasNode =
      !hasIcon &&
      !isText &&
      children !== undefined &&
      children !== null &&
      typeof children !== 'boolean' &&
      children !== '';
    const hasContent = hasIcon || isText || hasNode;

    const separator: SeparatorAttributes = {
      role: 'separator',
      'aria-orientation': isHorizontal ? undefined : 'vertical',
      'aria-label': ariaLabel ?? (isText ? String(children) : undefined),
    };

    const lineProps = {
      orientation,
      variant,
      stroke,
      color: colors.line,
    };

    // Sizes go through inline style: every distinct value would otherwise
    // mint a new emotion class.
    const rootStyle: CSSProperties = isHorizontal
      ? {
          width: S.toCss(length) ?? '100%',
          paddingBlock: spacing,
          columnGap: gap,
        }
      : {
          // Without a length: stretch to the flex row, or fill a parent with
          // a fixed height. With one: sit centred in the row.
          ...(length === undefined
            ? { alignSelf: 'stretch', minHeight: '100%' }
            : { alignSelf: 'center', height: S.toCss(length) }),
          paddingInline: spacing,
          rowGap: gap,
        };

    return (
      <div
        ref={ref}
        // A separator hides its children from assistive tech: with a node
        // the first line piece carries the role so the node stays reachable.
        {...(hasNode ? {} : separator)}
        data-orientation={orientation}
        className={className}
        css={[S.root, isHorizontal ? S.horizontal : S.vertical]}
        style={{ ...rootStyle, ...style }}>
        <Line {...lineProps} separator={hasNode ? separator : undefined} />
        {hasContent && (
          <>
            <span
              css={S.content}
              data-divider-content=""
              style={{ color: colors.text, fontSize: S.toCss(fontSize) }}>
              {hasIcon ? (
                <Icon name={icon} size={iconSize} color={colors.icon} />
              ) : (
                children
              )}
            </span>
            <Line {...lineProps} />
          </>
        )}
      </div>
    );
  },
);
