import { Matcher, screen, waitFor, within } from '@testing-library/dom';

import Stepper from './index';
import Step from '@components/Step';
import StepLabel from '@components/StepLabel';

const getCheckIcon = async (query: Matcher) => {
  const item = await screen.findByText(query);
  const icon = item.parentNode as HTMLElement;

  const checkIcon = await within(icon).queryByTitle(/check/i);

  return checkIcon;
};

describe('Stepper', () => {
  it('Default stepper with 1 item check', async () => {
    const steps = ['itemA', 'itemB'];

    render(
      <Stepper activeStep={1}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>,
    );

    await waitFor(async () => {
      const stepper = await screen.findByTestId('stepper');

      expect(stepper).toHaveStyle('flex-direction: row');

      await screen.findByText(/itemA/i);
      await screen.findByText(/itemB/i);

      const itemA = await screen.findByText(/itemA/i);
      const iconA = itemA.parentNode as HTMLElement;

      await within(iconA).findByTitle(/check/i);

      const itemB = await screen.findByText(/itemB/i);
      const iconB = itemB.parentNode as HTMLElement;

      const checkIconB = await within(iconB).queryByTitle(/check/i);

      expect(checkIconB).not.toBeInTheDocument();
    });
  });

  it('Default stepper with no item check', async () => {
    const steps = ['itemA', 'itemB'];

    render(
      <Stepper activeStep={0}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>,
    );

    const checkIconA = await getCheckIcon(/itemA/i);

    expect(checkIconA).not.toBeInTheDocument();

    const checkIconB = await getCheckIcon(/itemB/i);

    expect(checkIconB).not.toBeInTheDocument();
  });

  it('Vertical stepper with 2 item check', async () => {
    const steps = ['itemA', 'itemB'];

    render(
      <Stepper activeStep={1} orientation="vertical">
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>,
    );

    await waitFor(async () => {
      const stepper = await screen.findByTestId('stepper');

      expect(stepper).toHaveStyle('flex-direction: column');

      await screen.findByText(/itemA/i);
      await screen.findByText(/itemB/i);

      await getCheckIcon(/itemA/i);
      await getCheckIcon(/itemB/i);
    });
  });

  it('Stepper with inverted items', async () => {
    const steps = ['itemA', 'itemB'];

    render(
      <Stepper activeStep={1} inverted>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>,
    );

    await waitFor(async () => {
      const [topItem, bottomItem] = await screen.queryAllByText(/item/i);

      expect(topItem).toHaveTextContent(/itemB/i);
      expect(bottomItem).toHaveTextContent(/itemA/i);
    });
  });
});
