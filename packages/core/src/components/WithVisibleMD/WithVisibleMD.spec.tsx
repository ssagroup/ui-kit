import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import { WithVisibleMD } from '.';
import { mainTheme } from '../..';

jest.mock('d3-color', () => ({}));

const TestComponent = () => {
  return <p>Test</p>;
};

const TestComponentWithVisible = WithVisibleMD(TestComponent);

describe('HOC: WithVisibleMD', () => {
  // TODO: additional test to test display: block
  it('Should not displayed (less than MD)', () => {
    render(
      <ThemeProvider theme={mainTheme}>
        <TestComponentWithVisible />
      </ThemeProvider>,
    );

    const wrapper = screen.getByTestId('with-visible-md');
    expect(wrapper).toHaveStyle('display: none');
  });
});
