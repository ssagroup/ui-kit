import Tooltip from '@components/Tooltip';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';
import { IconProps } from './types';
import IconsMap from './icons';

/**
 * Icon - Renders one of the kit's built-in SVG icons by name.
 *
 * `name` is type-checked against the generated icon list, so a typo fails to
 * compile instead of rendering nothing. Browse the full set under
 * "Design System / Icons" in Storybook.
 *
 * ### Accessibility
 * Icons are **decorative by default** — no `tooltip` means no accessible name,
 * which is what you want when the icon sits next to a text label. When the icon
 * is the only content of a control, give it a name: either pass `tooltip`, or
 * put an `aria-label` on the surrounding button.
 *
 * ### Passing `tooltip` changes the markup
 * With `tooltip` the icon is wrapped in a `Tooltip` plus an `inline-flex` span,
 * so it is no longer a bare `<svg>` at that position. If the parent relies on
 * the svg being a direct child (grid placement, `& > svg` selectors), style the
 * wrapper instead — or leave `tooltip` off and use `aria-label`.
 *
 * ### Sizing and colour
 * `size` sets both width and height. `color` paints the glyph and defaults to
 * black; some icons paint with `stroke` rather than `fill`, so to dim an icon
 * prefer `opacity` over recolouring.
 *
 * @category Components
 * @subcategory Display
 *
 * @example
 * ```tsx
 * // Decorative — the adjacent text already names the action
 * <Button startIcon={<Icon name="plus" size={16} />} text="Add member" />
 * ```
 *
 * @example
 * ```tsx
 * // Icon-only control: name it, or screen readers announce nothing
 * <Icon name="information" size={16} tooltip="Salary is pre-tax" />
 * ```
 *
 * @example
 * ```tsx
 * // Same accessible name, without the extra wrapper element
 * <button aria-label="Delete row">
 *   <Icon name="bin" size={20} />
 * </button>
 * ```
 */
const Icon = ({ name, color = '#000', size, tooltip, ...props }: IconProps) => {
  const icon = (
    <IconsMap
      name={name}
      color={color}
      size={size}
      {...(tooltip ? { 'aria-label': tooltip } : {})}
      {...props}
    />
  );

  if (!tooltip) {
    return icon;
  }

  return (
    <Tooltip enableHover enableClick={false}>
      <TooltipTrigger>
        <span style={{ display: 'inline-flex' }}>{icon}</span>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};
export default Icon;
