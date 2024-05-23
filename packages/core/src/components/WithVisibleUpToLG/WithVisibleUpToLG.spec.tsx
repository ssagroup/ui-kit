import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import { WithVisibleUpToLG } from '.';
import { mainTheme } from '../..';

jest.mock('d3-color', () => ({}));

const TestComponent = () => {
  return <p>Test</p>;
};

const TestComponentWithVisible = WithVisibleUpToLG(TestComponent);

describe('HOC: WithVisibleUpToLG', () => {
  // TODO: additional test to test display: block
  it('Should not displayed (less than LG)', () => {
    render(
      <ThemeProvider theme={mainTheme}>
        <TestComponentWithVisible />
      </ThemeProvider>,
    );

    const wrapper = screen.getByTestId('with-visible-up-to-lg');
    expect(wrapper).toHaveStyle('display: none');
  });
});
