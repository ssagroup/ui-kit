import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import { WithVisibleSM } from '.';
import { mainTheme } from '../..';

const TestComponent = () => {
  return <p>Test</p>;
};

const TestComponentWithVisible = WithVisibleSM(TestComponent);

describe('HOC: WithVisibleSM', () => {
  // TODO: additional test to test display: none
  it('Should be displayed', () => {
    render(
      <ThemeProvider theme={mainTheme}>
        <TestComponentWithVisible />
      </ThemeProvider>,
    );

    const wrapper = screen.getByTestId('with-visible-sm');
    expect(wrapper).toHaveStyle('display: block');
  });
});
