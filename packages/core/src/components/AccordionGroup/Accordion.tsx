import CardBase from '@components/Card/CardBase';
import { useControllableState } from '@ssa-ui-kit/hooks';
import { resolveAriaProp, resolveOpenState } from '@utils/deprecation';
import { AccordionViewProps } from './types';
import { wrapperStyles } from './styles';

/**
 * Accordion - Individual accordion item component
 *
 * A single accordion item that can be expanded or collapsed. Uses render props pattern
 * for flexible content and title rendering. Must be used as a child of AccordionGroup.
 *
 * The component renders a CardBase with a title header and collapsible content panel.
 * The open/close state is managed by the parent AccordionGroup through context.
 *
 * @category Components
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Accordion
 *   id="accordion-1"
 *   title="Click to expand"
 *   aria-controls="panel-1"
 *   defaultOpen={false}
 *   renderTitle={AccordionTitle}
 *   renderContent={(props) => (
 *     <AccordionContent {...props}>
 *       <p>Accordion content goes here</p>
 *     </AccordionContent>
 *   )}
 * />
 * ```
 *
 * @see {@link AccordionGroup} - Parent container component
 * @see {@link AccordionTitle} - Default title render function
 * @see {@link AccordionContent} - Default content component
 *
 * @accessibility
 * - Uses role="region" for semantic structure
 * - ARIA controls and labelledby attributes for accessibility
 * - Keyboard accessible
 */
export const Accordion = (props: AccordionViewProps) => {
  const {
    title,
    'aria-controls': ariaControlsNative,
    ariaControls,
    id,
    size = 'empty',
    contentProps,
    renderTitle,
    renderContent,
    onClick,
    // Consumed via `resolveOpenState(props)` below rather than destructured for
    // use — pulled out here only so they cannot ride `rest` onto the DOM.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    open: _open,
    defaultOpen: _defaultOpen,
    isOpened: _isOpened,
    onOpenChange: _onOpenChange,
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ...rest
  } = props;

  const panelId = resolveAriaProp(
    'Accordion',
    'aria-controls',
    ariaControlsNative,
    ariaControls,
  );

  // Inside an AccordionGroup the group injects `open` on every render and owns
  // the state, so the accordion is controlled. Standing alone with only
  // `defaultOpen` it owns its own state — without that it rendered whatever it
  // was given forever, so `<Accordion defaultOpen onOpenChange={…} />` could
  // report a toggle it never performed.
  //
  // `isOpened` maps to `defaultOpen`: it did double duty as consumer-authored
  // initial state and as the state the group injected, and only the group ever
  // updated it.
  const openState = resolveOpenState('Accordion', props, {
    defaultAlias: 'isOpened',
  });

  const [openValue, setOpen] = useControllableState<boolean>({
    controlled: openState.isControlled,
    value: openState.open,
    defaultValue: openState.defaultOpen,
    finalValue: false,
    onChange: openState.onOpenChange,
  });
  const isAccordionOpen = Boolean(openValue);

  const handleToggle = () => {
    onClick?.();
    setOpen(!isAccordionOpen);
  };

  return (
    <CardBase role="region" tabIndex={0} css={wrapperStyles[size]} {...rest}>
      {renderTitle({
        id,
        open: isAccordionOpen,
        // Both spellings go to the render props for the deprecation window.
        // Unlike the props above this is not a consumer opt-in — the group
        // injects the state — so a custom renderTitle written against
        // `isOpened` keeps working without the consumer changing anything.
        isOpened: isAccordionOpen,
        title,
        size,
        'aria-controls': panelId,
        // Mirrored onto the deprecated key only for consumers who asked for it
        // that way. A custom `renderTitle` typically spreads its props onto the
        // header element, and an unconditional `ariaControls` would ride along
        // to the DOM as an unknown attribute.
        ...(ariaControls !== undefined ? { ariaControls: panelId } : {}),
        onClick: handleToggle,
      })}
      {renderContent({
        id: `${panelId}`,
        open: isAccordionOpen,
        isOpened: isAccordionOpen,
        size,
        ...contentProps,
        ...{ ['aria-labelledby']: `${id}` },
      })}
    </CardBase>
  );
};
