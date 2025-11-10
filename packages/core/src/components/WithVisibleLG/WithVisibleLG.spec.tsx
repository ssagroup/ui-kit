import '@testing-library/jest-dom';

import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';

import { mainTheme } from '../..';

import { WithVisibleLG } from '.';

const TestComponent = () => {
  return <p>Test</p>;
};

const TestComponentWithVisible = WithVisibleLG(TestComponent);

describe('HOC: withVisibleLG', () => {
  // TODO: additional test to test display: block
  it('Should not displayed (less than LG)', () => {
    render(
      <ThemeProvider theme={mainTheme}>
        <TestComponentWithVisible />
      </ThemeProvider>,
    );

    const wrapper = screen.getByTestId('with-visible-lg');
    expect(wrapper).toHaveStyle('display: none');
  });
});
