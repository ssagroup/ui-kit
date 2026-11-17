/**
 * `buttonV2` (#704): Button disabled colour and icon gap, ButtonGroup wrapper.
 *
 * Each block pins both sides of the flag. The flag-off assertions are what
 * every app still gets by default, so they must not drift until the flag and
 * its old branch are deleted.
 */
import { Fragment, ReactNode } from 'react';
import { screen } from '@testing-library/react';
import { FeatureFlag, FeatureFlagsProvider } from '@contexts/FeatureFlags';
import { resetFeatureFlagWarnings } from '@contexts/FeatureFlags/createFeatureFlags';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { ButtonGroup, ButtonGroupButton } from '@components/ButtonGroup';
import { resetButtonGroupWarnings } from '@components/ButtonGroup/ButtonGroup';
import { ButtonProps } from '@components/Button/types';
import theme from '@themes/main';

const withFlag = (ui: ReactNode, on: boolean) => (
  <FeatureFlagsProvider flags={{ [FeatureFlag.buttonV2]: on }}>
    {ui}
  </FeatureFlagsProvider>
);

const icon = <Icon name="plus" size={12} color="currentColor" />;
const iconWrappers = (button: HTMLElement) =>
  Array.from(button.children).filter(
    (el): el is HTMLElement =>
      el instanceof HTMLElement && el.querySelector('svg') !== null,
  );

const items = [
  { id: 'day', text: 'Day' },
  { id: 'week', text: 'Week' },
];

describe.each([true, false])('buttonV2 = %s', (on) => {
  describe('Button disabled colour', () => {
    it.each(['primary', 'secondary', 'error', 'custom'] as const)(
      '%s: greys the whole button only with the flag',
      (variant) => {
        render(
          withFlag(
            <Button variant={variant} disabled startIcon={icon}>
              Reject
            </Button>,
            on,
          ),
        );
        const button = screen.getByRole('button', { name: 'Reject' });

        if (on) {
          expect(button).toHaveStyleRule('color', theme.colors.grey40, {
            target: ':disabled',
          });
          expect(button).toHaveStyleRule('cursor', 'not-allowed', {
            target: ':disabled',
          });
        } else {
          expect(button).not.toHaveStyleRule('color', expect.anything(), {
            target: ':disabled',
          });
        }
      },
    );

    it('keeps the grey text label either way', () => {
      render(withFlag(<Button disabled text="Save" />, on));
      expect(screen.getByTestId('disabled-button-text')).toBeInTheDocument();
    });
  });

  describe('Button icon gap', () => {
    it('children label: gap only with the flag', () => {
      render(
        withFlag(
          <Button startIcon={icon} endIcon={icon}>
            Add note
          </Button>,
          on,
        ),
      );
      const [start, end] = iconWrappers(screen.getByRole('button'));
      expect(start.style.margin).toBe(on ? '' : '0px');
      expect(end.style.margin).toBe(on ? '' : '0px');
    });

    it('text label: gap either way', () => {
      render(withFlag(<Button startIcon={icon} text="Add note" />, on));
      const [start] = iconWrappers(screen.getByRole('button'));
      expect(start.style.margin).toBe('');
    });

    it.each([
      ['null', null],
      ['false', false],
      ['empty string', ''],
      ['array of nothing', [null, false, undefined]],
      ['fragment of nothing', <>{false}</>],
      [
        'nested fragments of nothing',
        <>{[<Fragment key="a">{null}</Fragment>, '']}</>,
      ],
    ])('children that render nothing (%s): icon-only, no gap', (_, kids) => {
      render(
        withFlag(
          <Button startIcon={icon} aria-label="Add">
            {kids}
          </Button>,
          on,
        ),
      );
      const [start] = iconWrappers(screen.getByRole('button'));
      expect(start.style.margin).toBe('0px');
    });

    it('block mode centres the content as one group only with the flag', () => {
      render(withFlag(<Button block startIcon={icon} text="Submit" />, on));
      const button = screen.getByRole('button');
      if (on) {
        expect(button).toHaveStyleRule('justify-content', 'center');
        expect(button.parentElement).not.toHaveStyleRule(
          'margin',
          expect.anything(),
          { target: 'span' },
        );
      } else {
        expect(button.parentElement).toHaveStyleRule('margin', 'auto', {
          target: 'span',
        });
      }
    });
  });

  it('a fragment with content is a label', () => {
    render(
      withFlag(
        <Button startIcon={icon}>
          <>
            {false}
            {'Add'}
          </>
        </Button>,
        on,
      ),
    );
    const [start] = iconWrappers(screen.getByRole('button'));
    expect(start.style.margin).toBe(on ? '' : '0px');
  });

  describe('ButtonGroup wrapper', () => {
    beforeEach(() => {
      resetButtonGroupWarnings();
      resetFeatureFlagWarnings();
    });

    it('items mode: wrapper only with the flag', () => {
      const { container } = render(
        withFlag(
          <ButtonGroup items={items} className="period" aria-label="Period" />,
          on,
        ),
      );
      const root = container.firstElementChild as HTMLElement;

      if (on) {
        const group = screen.getByRole('group', { name: 'Period' });
        expect(group).toBe(root);
        expect(group).toHaveClass('period');
        expect(group.querySelectorAll(':scope > button')).toHaveLength(2);
        expect(group).toHaveStyleRule('display', 'inline-flex');
        // Phrasing content, so a group inside a <p> stays valid HTML.
        expect(group.tagName).toBe('SPAN');
      } else {
        expect(screen.queryByRole('group')).toBeNull();
        expect(root.tagName).toBe('BUTTON');
      }
    });

    it('composed mode: wrapper only with the flag', () => {
      render(
        withFlag(
          <ButtonGroup defaultValue="a" aria-labelledby="lbl">
            <ButtonGroupButton id="a">A</ButtonGroupButton>
            <ButtonGroupButton id="b">B</ButtonGroupButton>
          </ButtonGroup>,
          on,
        ),
      );
      if (on) {
        expect(screen.getByRole('group')).toHaveAttribute(
          'aria-labelledby',
          'lbl',
        );
      } else {
        expect(screen.queryByRole('group')).toBeNull();
      }
    });

    it('warns once about wrapper props only without the flag', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <>
          {withFlag(<ButtonGroup items={items} aria-label="One" />, on)}
          {withFlag(<ButtonGroup items={items} className="two" />, on)}
        </>,
      );
      const calls = warn.mock.calls.filter(([msg]) =>
        String(msg).includes('ignores `css`, `className`'),
      );
      expect(calls).toHaveLength(on ? 0 : 1);
      warn.mockRestore();
    });
  });
});

describe('Button ARIA (unflagged)', () => {
  it('accepts and forwards disclosure attributes', () => {
    // Typed object on purpose: TS does not check hyphenated JSX attributes,
    // so only a typed props object proves the type was widened.
    const props: ButtonProps = {
      text: 'Details',
      'aria-expanded': true,
      'aria-controls': 'panel-1',
      'aria-haspopup': 'dialog',
    };
    render(<Button {...props} />);
    const button = screen.getByRole('button', { name: 'Details' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls', 'panel-1');
    expect(button).toHaveAttribute('aria-haspopup', 'dialog');
  });
});
