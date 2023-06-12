import userEvent from '@testing-library/user-event';
import theme from '@themes/main';

import Switch from './index';
import { SwitchContextProvider } from './SwitchContext';

function setup(component, initialState) {
  return {
    user: userEvent.setup(),
    ...render(
      <SwitchContextProvider initialState={initialState}>
        {component}
      </SwitchContextProvider>,
    ),
  };
}

const checkSwitchStyleAndMarkup = (switchEl, { isOn, isDisabled = false }) => {
  // NOTE: we cannot test :before/:hover styles because getComputedStyle()
  // support for pseudo-classes is not implemented in the test suite yet.
  expect(switchEl).toHaveStyle(`
      width: 44px;
      height: 24px;
      background: ${
        isDisabled
          ? theme.colors.greyDisabled
          : isOn
          ? `linear-gradient(117.5deg, ${theme.colors.greenLighter}, ${theme.colors.green})`
          : theme.colors.greyFocused
      };
      outline: 0;
      border-radius: 50px;
      position: relative;
      cursor: ${isDisabled ? 'auto' : 'pointer'};
    `);

  expect(switchEl.firstChild).not.toBeInTheDocument();
  expect(switchEl).toHaveAttribute('aria-checked', isOn.toString());
  expect(switchEl).toHaveAttribute('type', 'button');
  expect(switchEl).toHaveAttribute('aria-label', TEST_LABEL);

  if (isDisabled) {
    expect(switchEl).toBeDisabled();
    expect(switchEl).toHaveAttribute('aria-readonly', 'true');
  } else {
    expect(switchEl).toBeEnabled();
    expect(switchEl).toHaveAttribute('aria-readonly', 'false');
  }
};

const TEST_LABEL = 'Test Switch';

describe('Switch', () => {
  it('[enabled] Renders in the "on" state', async () => {
    const isOn = true;
    const { user, getByRole } = setup(<Switch label={TEST_LABEL} />, isOn);

    let switchEl = getByRole('switch');

    checkSwitchStyleAndMarkup(switchEl, { isOn });

    await user.click(switchEl);

    switchEl = getByRole('switch');
    expect(switchEl).toHaveFocus();

    checkSwitchStyleAndMarkup(switchEl, { isOn: false });
  });

  it('[enabled] Renders in the "off" state', async () => {
    const isOn = false;
    const { user, getByRole } = setup(<Switch label={TEST_LABEL} />, isOn);

    let switchEl = getByRole('switch');

    checkSwitchStyleAndMarkup(switchEl, { isOn });

    await user.click(switchEl);

    switchEl = getByRole('switch');
    expect(switchEl).toHaveFocus();

    checkSwitchStyleAndMarkup(switchEl, { isOn: true });
  });

  it('[disabled] Renders in the "on" state', async () => {
    const isOn = true;
    const isDisabled = true;
    const { user, getByRole } = setup(
      <Switch label={TEST_LABEL} isDisabled={isDisabled} />,
      isOn,
    );

    let switchEl = getByRole('switch');

    checkSwitchStyleAndMarkup(switchEl, { isOn, isDisabled: true });

    await user.click(switchEl);

    switchEl = getByRole('switch');
    expect(switchEl).not.toHaveFocus();

    checkSwitchStyleAndMarkup(switchEl, { isOn, isDisabled: true });
  });

  it('[disabled] Renders in the "off" state', async () => {
    const isDisabled = true;
    const isOn = false;
    const { user, getByRole } = setup(
      <Switch label={TEST_LABEL} isDisabled={isDisabled} />,
      isOn,
    );

    let switchEl = getByRole('switch');

    checkSwitchStyleAndMarkup(switchEl, { isOn, isDisabled: true });

    await user.click(switchEl);

    switchEl = getByRole('switch');
    expect(switchEl).not.toHaveFocus();

    checkSwitchStyleAndMarkup(switchEl, { isOn, isDisabled: true });
  });

  it('[enabled] Reacts to keyboard events when "on"', async () => {
    const isOn = true;
    const { user, getByRole } = setup(<Switch label={TEST_LABEL} />, isOn);

    let switchEl = getByRole('switch');

    await user.tab();

    switchEl = getByRole('switch');
    expect(switchEl).toHaveFocus();

    await user.keyboard('[Space]');

    expect(switchEl).toHaveFocus();
  });

  it('[enabled] Reacts to keyboard events when "off"', async () => {
    const isOn = false;
    const { user, getByRole } = setup(<Switch label={TEST_LABEL} />, isOn);

    let switchEl = getByRole('switch');

    await user.tab();

    switchEl = getByRole('switch');
    expect(switchEl).toHaveFocus();

    await user.keyboard('[Space]');

    expect(switchEl).toHaveFocus();
  });

  it('test default initial state', () => {
    const { getByRole } = render(
      <SwitchContextProvider>
        <Switch label="demo" />
      </SwitchContextProvider>,
    );

    const switchEl = getByRole('switch');

    expect(switchEl).toHaveAttribute('aria-checked', 'false');
  });
});
