import { fireEvent } from '../../../customTest';
import { act } from 'react';
import type { LineSeries, Point } from '@nivo/line';
import userEvent from '@testing-library/user-event';
import ResizeObserver from 'resize-observer-polyfill';
import theme from '@themes/main';

import Button from '@components/Button';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';

import Tooltip, { SimpleChartTooltip, ProgressChartTooltip } from './index';
import type { TooltipProps } from './types';

function setup(component: React.ReactElement) {
  const user = userEvent.setup();
  return {
    user,
    ...render(component),
  };
}

window.ResizeObserver = ResizeObserver;
const tooltipText = 'Tooltip';

/**
 * This is to fix the following error that shows up in the test suite.
 * Error: `NaN` is an invalid value for the `left` css style property at svg
 *
 * The error doesn't break tests.
 *
 * It's caused by NaN values (width and height) returned from the
 * #getCssDimensions() function at @floating-ui/dom.
 * */

describe('Tooltip', () => {
  beforeEach(() => {
    const getComputedStyle = window.getComputedStyle;
    jest.spyOn(window, 'getComputedStyle').mockImplementation((...args) => {
      const result = getComputedStyle(
        ...(args as [Element, string | null | undefined]),
      );

      const el = args[0];
      if (el instanceof SVGSVGElement) {
        /**
         * Inspired by
         * https://github.com/jsdom/jsdom/issues/135#issuecomment-68191941
         * */
        Object.defineProperties(result, {
          offsetHeight: {
            get() {
              return 0;
            },
          },
          offsetWidth: {
            get() {
              return 0;
            },
          },
          width: {
            get() {
              return 0;
            },
          },
          height: {
            get() {
              return 0;
            },
          },
        });
      }
      return result;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Shows up when the trigger is clicked', async () => {
    const { user, queryByText, getByText, getByRole, getByTestId } = setup(
      <Tooltip>
        <TooltipTrigger>
          <Button size="medium" text="Click me!" />
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>,
    );

    const buttonEl = getByRole('button');
    expect(queryByText(tooltipText)).not.toBeInTheDocument();

    await user.click(buttonEl);

    getByText(tooltipText);
    getByTestId('floating-arrow');

    await user.click(document.body);

    expect(queryByText(tooltipText)).not.toBeInTheDocument();
  });

  it('Shows up when the trigger is hovered', async () => {
    const { user, queryByText, getByText, getByRole, getByTestId } = setup(
      <Tooltip enableClick={false} enableHover={true}>
        <TooltipTrigger>
          <Button size="medium" text="Hover over me!" />
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>,
    );

    const buttonEl = getByRole('button');
    expect(queryByText(tooltipText)).not.toBeInTheDocument();

    await userEvent.click(buttonEl, { skipHover: true });
    expect(queryByText(tooltipText)).not.toBeInTheDocument();

    await user.hover(buttonEl);
    getByText(tooltipText);
    getByTestId('floating-arrow');
  });

  it('respects hoverOpenDelay and hoverCloseDelay', () => {
    const OPEN_DELAY = 100;
    const CLOSE_DELAY = 50;

    jest.useFakeTimers();
    try {
      const { queryByText, getByText, getByRole } = setup(
        <Tooltip
          enableClick={false}
          enableHover
          hoverOpenDelay={OPEN_DELAY}
          hoverCloseDelay={CLOSE_DELAY}>
          <TooltipTrigger>
            <Button size="medium" text="Hover me" />
          </TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>,
      );

      const button = getByRole('button');
      expect(queryByText(tooltipText)).not.toBeInTheDocument();

      fireEvent.mouseEnter(button);
      expect(queryByText(tooltipText)).not.toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(OPEN_DELAY);
      });
      getByText(tooltipText);

      fireEvent.mouseLeave(button);
      expect(queryByText(tooltipText)).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(CLOSE_DELAY);
      });
      expect(queryByText(tooltipText)).not.toBeInTheDocument();
    } finally {
      jest.useRealTimers();
    }
  });

  it('allows interacting with content when allowHoverContent is set', async () => {
    const interactiveText = 'Tooltip Link';
    const { user, getByRole, getByText, queryByText } = setup(
      <Tooltip enableClick={false} enableHover allowHoverContent>
        <TooltipTrigger>
          <Button size="medium" text="Hover for actions" />
        </TooltipTrigger>
        <TooltipContent>
          <a href="https://example.com">{interactiveText}</a>
        </TooltipContent>
      </Tooltip>,
    );

    const trigger = getByRole('button');
    await user.hover(trigger);

    const link = getByText(interactiveText);
    expect(link).toBeInTheDocument();

    fireEvent.pointerLeave(trigger, { relatedTarget: link });
    fireEvent.pointerEnter(link, { relatedTarget: trigger });

    expect(queryByText(interactiveText)).toBeInTheDocument();

    await user.click(link);
  });

  it("Doesn't show arrow", async () => {
    const { user, queryByText, getByText, getByRole, queryByTestId } = setup(
      <Tooltip hasArrow={false}>
        <TooltipTrigger>
          <Button size="medium" text="Click me!" />
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>,
    );

    const buttonEl = getByRole('button');
    expect(queryByText(tooltipText)).not.toBeInTheDocument();

    await user.click(buttonEl);
    getByText(tooltipText);
    expect(queryByTestId('floating-arrow')).not.toBeInTheDocument();
  });

  it("Doesn't render not valid triggers", () => {
    const { queryByText } = setup(
      <Tooltip>
        <TooltipTrigger>Trigger </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>,
    );

    expect(queryByText('Trigger')).not.toBeInTheDocument();
  });

  it('Throws an error if not wrapped with <Tooltip />', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      /* No-op */
    });

    const errorText =
      'The component should be wrapped with <Tooltip> to have access to the context';
    expect(() => setup(<TooltipTrigger>Trigger</TooltipTrigger>)).toThrow(
      errorText,
    );
    expect(() => setup(<TooltipContent>{tooltipText}</TooltipContent>)).toThrow(
      errorText,
    );

    (console.error as jest.Mock).mockRestore();
  });

  it('Shows up by default', () => {
    const { queryByText } = setup(
      <Tooltip defaultOpen>
        <TooltipTrigger>
          <Button size="medium" text="Click me!" />
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>,
    );

    expect(queryByText(tooltipText)).toBeInTheDocument();
  });

  describe('appearance', () => {
    const renderTooltip = (props: Partial<TooltipProps> = {}) =>
      setup(
        <Tooltip defaultOpen {...props}>
          <TooltipTrigger>
            <Button size="medium" text="Click me!" />
          </TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>,
      );

    it('Renders the grey surface with a shadow by default', () => {
      const { getByText } = renderTooltip();

      const content = getByText(tooltipText);
      expect(content).toHaveStyle({
        background: theme.palette.secondary.light,
        color: theme.colors.greyDarker,
        boxShadow: `0 10px 40px ${theme.colors.greyShadow}`,
      });
      expect(content).not.toHaveStyle({
        border: `1px solid ${theme.colors.grey}`,
      });
    });

    it.each([
      ['dark', theme.colors.greyBackground, theme.colors.white],
      ['nonOpaque', theme.colors.white64, theme.colors.greyDarker],
      ['white', theme.colors.white, theme.colors.greyDarker],
    ] as const)('Renders the %s surface', (color, background, textColor) => {
      const { getByText } = renderTooltip({ color });

      expect(getByText(tooltipText)).toHaveStyle({
        background,
        color: textColor,
      });
    });

    it('Outlines the white surface by default', () => {
      const { getByText } = renderTooltip({ color: 'white' });

      expect(getByText(tooltipText)).toHaveStyle({
        border: `1px solid ${theme.colors.grey}`,
      });
    });

    it('Allows the border to be toggled independently of the color', () => {
      const { getByText, unmount } = renderTooltip({
        color: 'white',
        hasBorder: false,
      });

      expect(getByText(tooltipText)).not.toHaveStyle({
        border: `1px solid ${theme.colors.grey}`,
      });
      unmount();

      const { getByText: getByTextDark } = renderTooltip({
        color: 'dark',
        hasBorder: true,
      });

      expect(getByTextDark(tooltipText)).toHaveStyle({
        border: `1px solid ${theme.colors.grey}`,
      });
    });

    it('Drops the shadow when hasShadow is false', () => {
      const { getByText } = renderTooltip({ hasShadow: false });

      expect(getByText(tooltipText)).not.toHaveStyle({
        boxShadow: `0 10px 40px ${theme.colors.greyShadow}`,
      });
    });

    it('Fills the arrow with the surface color', () => {
      const { getByTestId } = renderTooltip({ color: 'dark' });

      expect(getByTestId('floating-arrow')).toHaveAttribute(
        'fill',
        theme.colors.greyBackground,
      );
    });

    it('Strokes the arrow when the tooltip is bordered', () => {
      const { getByTestId } = renderTooltip({ color: 'white' });

      const paths = Array.from(
        getByTestId('floating-arrow').querySelectorAll('path'),
      );
      expect(
        paths.some((path) => path.getAttribute('stroke') === theme.colors.grey),
      ).toBe(true);
    });

    it('Renders a title above the content', () => {
      const titleText = 'Headline';
      const { getByText } = setup(
        <Tooltip defaultOpen>
          <TooltipTrigger>
            <Button size="medium" text="Click me!" />
          </TooltipTrigger>
          <TooltipContent title={titleText} maxWidth={200}>
            {tooltipText}
          </TooltipContent>
        </Tooltip>,
      );

      const title = getByText(titleText);
      expect(title).toBeInTheDocument();
      // `color: inherit` is explicit so a global `* { color }` reset can't
      // repaint the headline away from the surface color.
      expect(title).toHaveStyle({ fontWeight: 700, color: 'inherit' });

      const content = title.parentElement as HTMLElement;
      expect(content).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '200px',
      });
      expect(content).toHaveTextContent(tooltipText);
    });

    it("Doesn't constrain the width without maxWidth", () => {
      const { getByText } = renderTooltip();

      expect(getByText(tooltipText).style.maxWidth).toBe('');
    });
  });

  describe('SimpleChartTooltip', () => {
    const point: Point<LineSeries> = {
      id: '',
      seriesIndex: 0,
      seriesId: '',
      indexInSeries: 0,
      absIndex: 0,
      seriesColor: '',
      x: 1,
      y: 1,
      color: 'white',
      borderColor: 'black',
      data: {
        x: 1,
        xFormatted: 'x-formatted',
        y: 1,
        yFormatted: 'y-formatted',
      },
    };

    it('Renders with the default formatting', () => {
      const { getByText } = setup(<SimpleChartTooltip point={point} />);
      getByText('x-formatted - y-formatted');
    });

    const chartText = 'x-formatted - y-formatted';

    it('Keeps the legend text size at the default size, scales beyond it', () => {
      const { getByText, unmount } = setup(
        <SimpleChartTooltip point={point} />,
      );

      expect(getByText(chartText)).toHaveStyle({ fontSize: '0.579rem' });
      unmount();

      const { getByText: getByTextMedium } = setup(
        <SimpleChartTooltip point={point} size="medium" />,
      );

      expect(getByTextMedium(chartText)).toHaveStyle({ fontSize: '12px' });
    });

    it("Doesn't cast the surface shadow", () => {
      const { getByText } = setup(<SimpleChartTooltip point={point} />);

      expect(getByText(chartText)).not.toHaveStyle({
        boxShadow: `0 10px 40px ${theme.colors.greyShadow}`,
      });
    });

    it('Renders with a custom formatting', () => {
      const renderFn = ({
        xFormatted,
        yFormatted,
      }: {
        xFormatted: string | number;
        yFormatted: string | number;
      }) => `${xFormatted} - ${yFormatted}`.toUpperCase();

      const { getByText } = setup(
        <SimpleChartTooltip point={point} renderValue={renderFn} />,
      );
      getByText('X-FORMATTED - Y-FORMATTED');
    });
  });

  describe('ProgressChartTooltip', () => {
    it('Renders with an icon', () => {
      const caption = 'Calories';
      const value = 90;
      const valueFormatted = '90';
      const iconName = 'arrow-up';

      const { getByText, getByRole, container } = setup(
        <ProgressChartTooltip
          caption={caption}
          value={value}
          valueFormatted={valueFormatted}
          iconName={iconName}
        />,
      );

      getByText(caption);
      getByText(valueFormatted);
      expect(container.querySelector('svg')).toBeInTheDocument();

      const progressBar = getByRole('progressbar');

      expect(progressBar).toHaveStyle(
        `background-color: ${theme.colors.green}`,
      );
      expect(progressBar).toHaveStyle('width: 90%');
    });

    it('Renders without an icon', () => {
      const caption = 'Calories';
      const value = 80;
      const valueFormatted = '80';

      const { getByText, getByRole, container } = setup(
        <ProgressChartTooltip
          caption={caption}
          value={value}
          valueFormatted={valueFormatted}
        />,
      );

      getByText(caption);
      getByText(valueFormatted);
      expect(container.querySelector('svg')).not.toBeInTheDocument();

      const progressBar = getByRole('progressbar');

      expect(progressBar).toHaveStyle(
        `background-color: ${theme.colors.green}`,
      );
      expect(progressBar).toHaveStyle('width: 80%');
    });

    it('Renders with a customized progress bar', () => {
      const caption = 'Calories';
      const value = 85;
      const valueFormatted = '85';
      const barProps = {
        color: 'purple' as keyof MainColors,
      };

      const { getByText, getByRole, container } = setup(
        <ProgressChartTooltip
          caption={caption}
          value={value}
          valueFormatted={valueFormatted}
          barProps={barProps}
        />,
      );

      getByText(caption);
      getByText(valueFormatted);
      expect(container.querySelector('svg')).not.toBeInTheDocument();

      const progressBar = getByRole('progressbar');

      expect(progressBar).toHaveStyle(
        `background-color: ${theme.colors.purple}`,
      );
      expect(progressBar).toHaveStyle('width: 85%');
    });
  });
});
