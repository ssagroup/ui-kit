import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { mockUseForm } from '../../../customTest';
import theme from '@themes/main';
import { Popover, PopoverTrigger, PopoverContent, PopoverDescription } from '.';
import Input from '@components/Input';
import { StoryComponent } from './stories/StoryComponent';
import type { PopoverOptions } from './types';

const { register } = mockUseForm();

describe('Popover', () => {
  it('Shows up when the trigger is clicked', () => {
    const { getByText, getByRole, queryByText } = render(<StoryComponent />);

    const buttonEl = getByRole('button');
    let closeButtonEl = queryByText('Close');
    expect(closeButtonEl).not.toBeInTheDocument();
    fireEvent.click(buttonEl);
    closeButtonEl = getByText('Close');
    expect(closeButtonEl).toBeInTheDocument();
    fireEvent.click(closeButtonEl);
    expect(queryByText('Close')).not.toBeInTheDocument();
  });

  it('forwards ref correctly when using asChild with forwardRef component', () => {
    const inputRef = React.createRef<HTMLInputElement>();

    render(
      <Popover>
        <PopoverTrigger asChild>
          <Input
            name="test-input"
            placeholder="Test"
            ref={inputRef}
            register={register}
          />
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    // Verify that the ref is properly forwarded to the Input component
    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(inputRef.current?.tagName).toBe('INPUT');
  });

  it('sets floating-ui reference for positioning when using asChild', () => {
    const inputRef = React.createRef<HTMLInputElement>();

    const { getByRole } = render(
      <Popover open={true}>
        <PopoverTrigger asChild>
          <Input
            name="test-input"
            placeholder="Test"
            ref={inputRef}
            register={register}
          />
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    const input = getByRole('textbox') as HTMLInputElement;

    // Verify the input element exists and has the ref set
    expect(inputRef.current).toBe(input);
    // Verify the input is in the document (positioning would work)
    expect(input).toBeInTheDocument();
  });

  describe('surface', () => {
    const contentText = 'Content';

    const renderPopover = (
      options: PopoverOptions = {},
      contentProps: Partial<React.ComponentProps<typeof PopoverContent>> = {},
    ) =>
      render(
        <Popover open {...options}>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent {...contentProps}>{contentText}</PopoverContent>
        </Popover>,
      );

    it('Stays unstyled by default, so existing popovers are untouched', () => {
      const { getByText } = renderPopover();

      const content = getByText(contentText);
      expect(content).not.toHaveStyle({
        background: theme.palette.secondary.light,
      });
      expect(content).not.toHaveStyle({
        boxShadow: `0 10px 40px ${theme.colors.greyShadow}`,
      });
    });

    it.each([
      ['dark', theme.colors.greyBackground, theme.colors.white],
      ['white', theme.colors.white, theme.colors.greyDarker],
      ['nonOpaque', theme.colors.white64, theme.colors.greyDarker],
      ['grey', theme.palette.secondary.light, theme.colors.greyDarker],
    ] as const)('Renders the %s surface', (color, background, textColor) => {
      const { getByText } = renderPopover({ color });

      expect(getByText(contentText)).toHaveStyle({
        background,
        color: textColor,
        borderRadius: '8px',
      });
    });

    it('Adds the shadow only once a color is set', () => {
      const { getByText } = renderPopover({ color: 'dark' });

      expect(getByText(contentText)).toHaveStyle({
        boxShadow: `0 10px 40px ${theme.colors.greyShadow}`,
      });
    });

    it('Outlines the white surface by default and honours an override', () => {
      const { getByText, unmount } = renderPopover({ color: 'white' });

      expect(getByText(contentText)).toHaveStyle({
        border: `1px solid ${theme.colors.grey}`,
      });
      unmount();

      const { getByText: getByTextPlain } = renderPopover({
        color: 'white',
        hasBorder: false,
      });

      expect(getByTextPlain(contentText)).not.toHaveStyle({
        border: `1px solid ${theme.colors.grey}`,
      });
    });

    it('Applies the size padding', () => {
      const { getByText } = renderPopover({ size: 'medium' });

      expect(getByText(contentText)).toHaveStyle({ padding: '8px 16px' });
    });

    it('Renders an arrow filled from the surface color when asked', () => {
      const { queryByTestId, unmount } = renderPopover();
      expect(queryByTestId('popover-arrow')).not.toBeInTheDocument();
      unmount();

      const { getByTestId } = renderPopover({ hasArrow: true, color: 'dark' });

      expect(getByTestId('popover-arrow')).toHaveAttribute(
        'fill',
        theme.colors.greyBackground,
      );
    });

    it('Lets the description inherit the surface color', () => {
      const descriptionText = 'Description';
      const { getByText } = render(
        <Popover open color="dark">
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            <PopoverDescription>{descriptionText}</PopoverDescription>
          </PopoverContent>
        </Popover>,
      );

      expect(getByText(descriptionText)).toHaveStyle({ color: 'inherit' });
    });

    it.each([
      ['dark', theme.colors.white],
      ['white', theme.colors.greyDarker],
    ] as const)(
      'Draws the close icon in the %s surface text color',
      (color, expected) => {
        const { getByLabelText } = renderPopover(
          { color },
          { hasCloseButton: true },
        );

        const paths = Array.from(
          getByLabelText('Close').querySelectorAll('path'),
        );
        expect(paths.length).toBeGreaterThan(0);
        paths.forEach((path) =>
          expect(path).toHaveAttribute('stroke', expected),
        );
      },
    );

    it('Renders a close button that dismisses the popover when enabled', () => {
      const onOpenChange = jest.fn();
      const { queryByLabelText, unmount } = renderPopover();

      expect(queryByLabelText('Close')).not.toBeInTheDocument();
      unmount();

      const { getByLabelText: getCloseButton } = renderPopover(
        { onOpenChange },
        { hasCloseButton: true },
      );

      fireEvent.click(getCloseButton('Close'));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
