import { css } from '@emotion/react';
import { within } from '@testing-library/dom';

import { PieChart, PieChartLegend } from './index';
import { accountData } from './stories/fixtures';

const colorNames = ['blueLight', 'turquoise'] as unknown as Array<
  keyof MainColors
>;

const ResponsivePieMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));

describe('PieChart', () => {
  it('Renders', () => {
    const { getByTestId, getByRole } = render(
      <PieChart data={accountData} title={<h1>4578.89</h1>} />,
    );

    getByTestId('responsive-pie');
    getByRole('heading', { name: '4578.89' });
  });

  it('Renders with a Legend', () => {
    const { getByTestId, getByRole } = render(
      <PieChart data={accountData} title={<h1>4578.89</h1>}>
        <PieChartLegend data={accountData} colors={colorNames} />
      </PieChart>,
    );

    getByTestId('responsive-pie');
    getByRole('heading', { name: '4578.89' });

    for (const { label, value } of accountData) {
      getByRole('heading', { name: label });
      getByRole('heading', { name: String(value) });
    }
  });

  describe('PieChartLegend', () => {
    it('Renders with customized values and labels', () => {
      const { getByRole } = render(
        <PieChart data={accountData} title={<h1>4578.89</h1>}>
          <PieChartLegend
            data={accountData}
            colors={colorNames}
            renderValue={({ value }) => `1-${value}`}
            renderLabel={({ label }) => `1-${label}`}
          />
        </PieChart>,
      );

      for (const { label, value } of accountData) {
        getByRole('heading', { name: `1-${label}` });
        getByRole('heading', { name: `1-${value}` });
      }
    });

    it('Renders with custom styles', () => {
      const { getAllByRole } = render(
        <PieChart data={accountData} title={<h1>4578.89</h1>}>
          <PieChartLegend
            data={accountData}
            colors={colorNames}
            markerStyles={css`
              background-color: indigo;
              border-radius: 0;
            `}
            labelListStyles={css`
              background-color: forestgreen;
            `}
            valueListStyles={css`
              background-color: aqua;
            `}
          />
        </PieChart>,
      );

      const [labelListEl, valueListEl] = getAllByRole('list');
      expect(labelListEl).toHaveStyle(`background-color: forestgreen`);
      expect(valueListEl).toHaveStyle(`background-color: aqua `);

      const listItemEls = within(labelListEl).getAllByRole('listitem');

      for (const el of listItemEls) {
        expect(el.firstChild).toHaveStyle(`
          background-color: indigo;
          border-radius: 0;
        `);
      }
    });
  });
});
