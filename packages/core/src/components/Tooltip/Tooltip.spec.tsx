import { waitFor } from '../../../customTest';
import { Point } from '@nivo/line';
import userEvent from '@testing-library/user-event';
import ResizeObserver from 'resize-observer-polyfill';
import theme from '@themes/main';

import Button from '@components/Button';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';

import Tooltip, { SimpleChartTooltip, ProgressChartTooltip } from './index';

function setup(component) {
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
      <Tooltip isOpen>
        <TooltipTrigger>
          <Button size="medium" text="Click me!" />
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>,
    );

    expect(queryByText(tooltipText)).toBeInTheDocument();
  });

  describe('SimpleChartTooltip', () => {
    const point: Point = {
      id: '',
      index: 0,
      serieId: '',
      serieColor: '',
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

    it('Renders with a custom formatting', () => {
      const renderFn = ({ xFormatted, yFormatted }) =>
        `${xFormatted} - ${yFormatted}`.toUpperCase();

      const { getByText } = setup(
        <SimpleChartTooltip point={point} renderValue={renderFn} />,
      );
      getByText('X-FORMATTED - Y-FORMATTED');
    });
  });

  describe('ProgressChartTooltip', () => {
    it('Renders with an icon', async () => {
      const caption = 'Calories';
      const value = 90;
      const valueFormatted = '90';
      const iconName = 'arrow-up';

      const { getByText, getByRole, findByTitle } = setup(
        <ProgressChartTooltip
          caption={caption}
          value={value}
          valueFormatted={valueFormatted}
          iconName={iconName}
        />,
      );

      getByText(caption);
      getByText(valueFormatted);
      await findByTitle('Arrow Up');

      const progressBar = getByRole(/progressbar/i);

      expect(progressBar).toHaveStyle(
        `background-color: ${theme.colors.green}`,
      );
      expect(progressBar).toHaveStyle('width: 90%');
    });

    it('Renders without an icon', async () => {
      const caption = 'Calories';
      const value = 80;
      const valueFormatted = '80';

      const { getByText, getByRole, queryByTitle } = setup(
        <ProgressChartTooltip
          caption={caption}
          value={value}
          valueFormatted={valueFormatted}
        />,
      );

      getByText(caption);
      getByText(valueFormatted);
      await waitFor(() =>
        expect(queryByTitle('Arrow Up')).not.toBeInTheDocument(),
      );

      const progressBar = getByRole(/progressbar/i);

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

      const { getByText, getByRole, queryByTitle } = setup(
        <ProgressChartTooltip
          caption={caption}
          value={value}
          valueFormatted={valueFormatted}
          barProps={barProps}
        />,
      );

      getByText(caption);
      getByText(valueFormatted);
      expect(queryByTitle('Arrow Up')).not.toBeInTheDocument();

      const progressBar = getByRole(/progressbar/i);

      expect(progressBar).toHaveStyle(
        `background-color: ${theme.colors.purple}`,
      );
      expect(progressBar).toHaveStyle('width: 85%');
    });
  });
});
