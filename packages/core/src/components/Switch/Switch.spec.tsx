import userEvent from '@testing-library/user-event';
import theme from '@themes/main';

import Switch from './index';
import { SwitchContextProvider } from './SwitchContext';

function setup(component: React.ReactNode, initialState: boolean) {
  return {
    user: userEvent.setup(),
    ...render(
      <SwitchContextProvider initialState={initialState}>
        {component}
      </SwitchContextProvider>,
    ),
  };
}

interface CheckSwitchStyleAndMarkup {
  (
    switchEl: HTMLElement,
    options: {
      isOn: boolean;
      isDisabled?: boolean;
      /**
       * Resolved on-state background of the Switch under test. Only consulted
       * for isDisabled + isOn, the one branch whose expected colour depends on
       * the `color`/`colors` props; every other state is colour-independent.
       */
      onColor?: string;
    },
  ): void;
}
const checkSwitchStyleAndMarkup: CheckSwitchStyleAndMarkup = (
  switchEl,
  { isOn, isDisabled = false, onColor = theme.palette.primary.main },
) => {
  // NOTE: we cannot test :before/:hover styles because getComputedStyle()
  // support for pseudo-classes is not implemented in the test suite yet.
  // isOn=true + !isDisabled: background not asserted — jsdom applies the
  // :hover rule unconditionally (specificity bleed), making the asserted value
  // unreliable. All other state combinations are covered below.
  expect(switchEl).toHaveStyle(`
      width: 44px;
      height: 24px;
      outline: 0;
      border-radius: 50px;
      position: relative;
      cursor: ${isDisabled ? 'auto' : 'pointer'};
    `);

  if (isDisabled && !isOn) {
    expect(switchEl).toHaveStyle(
      `background: ${theme.colors.greySelectedMenuItem};`,
    );
  } else if (isDisabled && isOn) {
    // Disabled + on keeps the on-color rather than flattening to grey; the
    // white ::after overlay that mutes it cannot be asserted here (see NOTE).
    expect(switchEl).toHaveStyle(`background: ${onColor};`);
  } else if (!isOn) {
    expect(switchEl).toHaveStyle(`background: ${theme.colors.greyFocused};`);
  }

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
      <Switch label={TEST_LABEL} disabled={isDisabled} />,
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
      <Switch label={TEST_LABEL} disabled={isDisabled} />,
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

  it('[disabled] Keeps the palette on-color when "on"', () => {
    const { getByRole } = setup(
      <Switch label={TEST_LABEL} color="success" disabled />,
      true,
    );

    expect(getByRole('switch')).toHaveStyle(
      `background: ${theme.palette.success.main};`,
    );
  });

  it('[disabled] Keeps a custom on-color when "on"', () => {
    const { getByRole } = setup(
      <Switch
        label={TEST_LABEL}
        color="custom"
        colors={{ on: '#FF6B6B' }}
        disabled
      />,
      true,
    );

    expect(getByRole('switch')).toHaveStyle('background: #FF6B6B;');
  });

  it('[disabled] Falls back to grey when "off", whatever the color', () => {
    const { getByRole } = setup(
      <Switch
        label={TEST_LABEL}
        color="custom"
        colors={{ on: '#FF6B6B' }}
        disabled
      />,
      false,
    );

    expect(getByRole('switch')).toHaveStyle(
      `background: ${theme.colors.greySelectedMenuItem};`,
    );
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
