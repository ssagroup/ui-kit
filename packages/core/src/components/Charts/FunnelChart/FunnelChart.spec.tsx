import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import theme from '@themes/main';
import { FunnelChart } from './';
import { getDefaultColors, getGeometry, DESIGN_HEIGHT } from './utils';

const data = [
  { label: 'Visitors', value: 120 },
  { label: 'Leads', value: 0 },
  { label: 'Customers', value: 0 },
];

describe('FunnelChart', () => {
  it('Should number the levels and show values beside them', () => {
    const { getAllByTestId, getAllByText, getByText } = render(
      <FunnelChart data={data} withPointer />,
    );

    expect(getAllByTestId('funnel-chart-level')).toHaveLength(3);
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('120')).toBeInTheDocument();
    expect(getAllByText('0')).toHaveLength(2);
  });

  it('Should give every level the same height regardless of value', () => {
    const { getAllByTestId } = render(
      <FunnelChart type="triangle" data={data} withTooltip={false} />,
    );

    const heights = getAllByTestId('funnel-chart-level').map((level) =>
      Number(level.getAttribute('height')),
    );
    // Levels overlap the next one by half a unit to hide seams.
    expect(heights[0]).toBeCloseTo(heights[2] + 0.5);
    expect(heights[1]).toBeCloseTo(heights[2] + 0.5);
  });

  it('Should expose levels through the accessible name', () => {
    const { getByRole } = render(<FunnelChart data={data} />);

    expect(
      getByRole('img', { name: 'Visitors: 120, Leads: 0, Customers: 0' }),
    ).toBeInTheDocument();
  });

  it('Should pass the item and index to render props', () => {
    const { getByText, queryByText } = render(
      <FunnelChart
        data={data}
        withPointer
        renderLabel={(item) => item.label}
        renderPointerLabel={(item, index) => `${index}: ${item.value} users`}
      />,
    );

    expect(getByText('Visitors')).toBeInTheDocument();
    expect(getByText('0: 120 users')).toBeInTheDocument();
    expect(queryByText('1')).not.toBeInTheDocument();
  });

  it('Should hide level labels but keep pointer labels', () => {
    const { queryByText, getByText } = render(
      <FunnelChart data={data} withPointer withLabels={false} />,
    );

    expect(queryByText('1')).not.toBeInTheDocument();
    expect(getByText('120')).toBeInTheDocument();
  });

  it('Should show the tooltip on hover', async () => {
    const user = userEvent.setup();
    const { getAllByTestId, findByText } = render(
      <FunnelChart
        data={data}
        renderTooltip={(item, index) => `${index + 1}. ${item.label}`}
      />,
    );

    await user.hover(getAllByTestId('funnel-chart-level')[1]);

    expect(await findByText('2. Leads')).toBeInTheDocument();
  });

  it('Should prefer item colours over the palette', () => {
    const { getAllByTestId } = render(
      <FunnelChart
        data={[{ label: 'A', value: 1, color: 'red' }, ...data]}
        withTooltip={false}
      />,
    );

    expect(getAllByTestId('funnel-chart-level')[0]).toHaveAttribute(
      'fill',
      'red',
    );
  });

  it('Should take level colours from the theme', () => {
    const customTheme = {
      ...theme,
      colors: { ...theme.colors, greenLime: 'rgb(1, 2, 3)' as const },
    };
    const { getAllByTestId } = render(
      <ThemeProvider theme={customTheme}>
        <FunnelChart data={data} withTooltip={false} />
      </ThemeProvider>,
    );

    expect(getAllByTestId('funnel-chart-level')[0]).toHaveAttribute(
      'fill',
      'rgb(1, 2, 3)',
    );
  });

  it('Should render no levels without data', () => {
    const { queryAllByTestId, queryByRole } = render(<FunnelChart data={[]} />);

    expect(queryAllByTestId('funnel-chart-level')).toHaveLength(0);
    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  describe('sizing', () => {
    const ResizeObserverMock = global.ResizeObserver;
    let observed: Element[];

    beforeEach(() => {
      observed = [];
      // Report a 200×200 container as soon as an element is observed.
      global.ResizeObserver = jest.fn((callback: ResizeObserverCallback) => ({
        observe: (element: Element) => {
          observed.push(element);
          callback(
            [
              {
                contentRect: { width: 200, height: 200 },
              } as ResizeObserverEntry,
            ],
            {} as ResizeObserver,
          );
        },
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      })) as unknown as typeof ResizeObserver;
      jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((callback) => {
          callback(0);
          return 0;
        });
    });

    afterEach(() => {
      global.ResizeObserver = ResizeObserverMock;
      jest.restoreAllMocks();
    });

    it('Should measure the container when data arrives after an empty render', () => {
      const { rerender, getByRole, container } = render(
        <FunnelChart data={[]} />,
      );
      rerender(<FunnelChart data={data} />);

      expect(observed).toContain(getByRole('img'));
      expect(
        Number(container.querySelector('svg')?.getAttribute('height')),
      ).toBeCloseTo(200);
    });

    it('Should keep the shape at half size when pointer labels cannot fit', () => {
      jest
        .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
        .mockReturnValue(1000);
      const { container } = render(<FunnelChart data={data} withPointer />);

      const fitScale = Math.min(
        200 / DESIGN_HEIGHT,
        200 / getGeometry('funnel', data.length).width,
      );
      expect(
        Number(container.querySelector('svg')?.getAttribute('height')),
      ).toBeCloseTo(DESIGN_HEIGHT * fitScale * 0.5);
    });
  });
});

describe('FunnelChart utils', () => {
  it('Should take the palette from the top for triangles and the bottom for funnels', () => {
    const { colors } = theme;
    expect(getDefaultColors(theme, 'triangle', 3)).toEqual([
      colors.blueCornflower,
      colors.blueSky,
      colors.greenLime,
    ]);
    expect(getDefaultColors(theme, 'funnel', 3)).toEqual([
      colors.greenLime,
      colors.blueSky,
      colors.blueCornflower,
    ]);
    expect(getDefaultColors(theme, 'funnel', 2)).toEqual([
      colors.blueSoft,
      colors.blueVivid,
    ]);
  });

  it('Should repeat the palette beyond six levels', () => {
    expect(getDefaultColors(theme, 'triangle', 8)).toHaveLength(8);
    expect(getDefaultColors(theme, 'funnel', 8).every(Boolean)).toBe(true);
  });

  it('Should end the funnel stem at the bottom of the frame', () => {
    const { bands } = getGeometry('funnel', 6);

    expect(bands[5].bottom).toBe(DESIGN_HEIGHT);
    expect(bands[0].bottom - bands[0].top).toBeCloseTo(25.42, 1);
  });
});
