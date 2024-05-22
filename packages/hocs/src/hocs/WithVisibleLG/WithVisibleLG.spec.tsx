import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import { mainTheme } from '@ssa-ui-kit/core';
import { WithVisibleLG } from '.';

jest.mock('d3-color', () => ({}));

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
