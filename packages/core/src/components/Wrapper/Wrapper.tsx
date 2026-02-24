import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

/**
 * Wrapper - Flexible flexbox container component
 *
 * A styled div component that provides a flexible flexbox layout container
 * with optional fade animation. Useful for wrapping content with consistent
 * flex layout, alignment, and visibility animations.
 *
 * Features:
 * - Flexbox layout with configurable direction and alignment
 * - Optional fade in/out animation with configurable delay
 * - Visibility control with smooth transitions
 * - Full width by default
 *
 * @category Components
 * @subcategory Layout

 * @example
 * ```tsx
 * // Basic wrapper
 * <Wrapper>
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 * </Wrapper>
 * ```
 *
 * @example
 * ```tsx
 * // Vertical layout
 * <Wrapper direction="column" alignItems="flex-start">
 *   <Typography>Item 1</Typography>
 *   <Typography>Item 2</Typography>
 * </Wrapper>
 * ```
 *
 * @example
 * ```tsx
 * // With fade animation
 * <Wrapper fade isVisible={isVisible} fadeDelay={0.5}>
 *   <Content />
 * </Wrapper>
 * ```
 *
 * @example
 * ```tsx
 * // Conditionally visible
 * <Wrapper isVisible={showContent}>
 *   {showContent && <DynamicContent />}
 * </Wrapper>
 * ```
 */
/** Flex container direction (maps to CSS flex-direction) */
export type WrapperDirection =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse';

/** Cross-axis alignment (maps to CSS align-items) */
export type WrapperAlignItems =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'stretch'
  | 'baseline'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'
  | 'normal';

/** Main-axis alignment (maps to CSS justify-content) */
export type WrapperJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'normal';

const Wrapper = styled.div<
  {
    /**
     * Flex direction (row, column, row-reverse, column-reverse)
     * @default 'row'
     */
    direction?: WrapperDirection;

    /**
     * Align items value (flex-start, center, flex-end, stretch, baseline, etc.)
     * @default 'center'
     */
    alignItems?: WrapperAlignItems;

    /**
     * Justify content value (flex-start, center, flex-end, space-between, etc.)
     */
    justifyContent?: WrapperJustifyContent;

    /**
     * Enable fade in/out transition animation
     * @default false
     */
    fade?: boolean;

    /**
     * Fade animation duration in seconds
     * @default 0.3
     */
    fadeDelay?: number;

    /**
     * Visibility state
     * When false, element has opacity 0 and visibility hidden
     * @default true
     */
    isVisible?: boolean;
  } & CommonProps
>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent};` : ''}
  width: 100%;
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};

  ${({ isVisible = true, fade, fadeDelay = 0.3 }) => {
    const baseStyles = `
      opacity: ${isVisible ? 1 : 0};
    `;

    if (fade) {
      return `
        ${baseStyles}
        transition: opacity ${fadeDelay}s ease-in-out, visibility ${fadeDelay}s ease-in-out;
        visibility: ${isVisible ? 'visible' : 'hidden'};
        ${!isVisible ? `transition-delay: 0s, ${fadeDelay}s;` : ''}
      `;
    }

    return `
      ${baseStyles}
      visibility: ${isVisible ? 'visible' : 'hidden'};
    `;
  }}
`;

export default Wrapper;
