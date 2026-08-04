import { useState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Accordion, AccordionTitle } from '@components/AccordionGroup';
import { ButtonGroup } from '@components/ButtonGroup';
import Checkbox from '@components/Checkbox';
import Modal from '@components/Modal';
import ModalContent from '@components/ModalContent';
import ModalDismissButton from '@components/ModalDismissButton';
import ModalOpenButton from '@components/ModalOpenButton';
import Button from '@components/Button';
import Radio from '@components/Radio';
import RadioGroup from '@components/RadioGroup';
import { resetDeprecationWarnings } from '@utils/deprecation';

/**
 * The controlled/uncontrolled contract, pinned per component.
 *
 * Every one of these components used to hand-roll `isControlled = value !==
 * undefined`, which quietly conflated two different things: "I am not
 * controlling this" and "I am controlling this, and right now it is empty". A
 * parent resetting a controlled value back to `undefined` — a form clear, an
 * RJSF field emptying — therefore dropped the component into uncontrolled mode,
 * where it kept rendering the stale value it happened to be holding.
 *
 * That is what these tests exist to catch. The `deprecated-props` suite covers
 * the renames themselves; this one covers the *mode*, and in particular the
 * reset-to-undefined transition none of them exercised.
 *
 * @see useControllableState
 */
describe('controlled state => resetting a controlled value clears it', () => {
  beforeEach(() => {
    resetDeprecationWarnings();
  });

  describe('RadioGroup', () => {
    const radios = [
      <Radio key="a" id="r1" value="apple" text="Apple" />,
      <Radio key="b" id="r2" value="orange" text="Orange" />,
    ];

    const Harness = ({ prop }: { prop: 'value' | 'externalState' }) => {
      const [value, setValue] = useState<string | number | undefined>(
        undefined,
      );
      const stateProps =
        prop === 'value' ? { value } : { externalState: value };

      return (
        <div>
          <button onClick={() => setValue(undefined)}>reset</button>
          <RadioGroup name="fruit" {...stateProps} onChange={setValue}>
            {radios}
          </RadioGroup>
        </div>
      );
    };

    it('clears the selection when `value` is reset to undefined', async () => {
      const user = userEvent.setup();
      render(<Harness prop="value" />);

      await user.click(screen.getAllByRole('radio')[0]);
      expect(screen.getAllByRole('radio')[0]).toBeChecked();

      await user.click(screen.getByText('reset'));
      expect(screen.getAllByRole('radio')[0]).not.toBeChecked();
    });

    it('clears the selection when the deprecated `externalState` is reset', async () => {
      const user = userEvent.setup();
      render(<Harness prop="externalState" />);

      await user.click(screen.getAllByRole('radio')[0]);
      expect(screen.getAllByRole('radio')[0]).toBeChecked();

      await user.click(screen.getByText('reset'));
      expect(screen.getAllByRole('radio')[0]).not.toBeChecked();
    });

    it('stays controlled when it starts at undefined, so clicks need the parent', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <RadioGroup name="fruit" value={undefined} onChange={onChange}>
          {radios}
        </RadioGroup>,
      );

      await user.click(screen.getAllByRole('radio')[0]);

      // Reported, but not applied — the parent ignored it.
      expect(onChange).toHaveBeenCalledWith('apple');
      expect(screen.getAllByRole('radio')[0]).not.toBeChecked();
    });

    it('still moves on its own with the semi-controlled `externalState`', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup name="fruit" externalState={undefined} onChange={jest.fn()}>
          {radios}
        </RadioGroup>,
      );

      await user.click(screen.getAllByRole('radio')[0]);

      // The deprecated prop keeps its looser contract for the deprecation window.
      expect(screen.getAllByRole('radio')[0]).toBeChecked();
    });
  });

  describe('Checkbox', () => {
    it('clears when `checked` is reset to undefined', async () => {
      const user = userEvent.setup();
      const Harness = () => {
        const [checked, setChecked] = useState<boolean | undefined>(undefined);
        return (
          <div>
            <button onClick={() => setChecked(undefined)}>reset</button>
            <Checkbox
              id="c"
              text="Accept"
              checked={checked}
              onChange={setChecked}
            />
          </div>
        );
      };
      render(<Harness />);

      await user.click(screen.getByRole('checkbox'));
      expect(screen.getByRole('checkbox')).toBeChecked();

      await user.click(screen.getByText('reset'));
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('stays controlled when it starts at undefined', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <Checkbox
          id="c"
          text="Accept"
          checked={undefined}
          onChange={onChange}
        />,
      );

      await user.click(screen.getByRole('checkbox'));

      expect(onChange).toHaveBeenCalledWith(true);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });
  });

  describe('ButtonGroup', () => {
    const items = [
      { id: 'all', text: 'All' },
      { id: 'running', text: 'Running' },
    ];

    it('clears back to the fallback when `value` is reset to undefined', async () => {
      const user = userEvent.setup();
      const Harness = () => {
        const [value, setValue] = useState<string | undefined>(undefined);
        return (
          <div>
            <button onClick={() => setValue(undefined)}>reset</button>
            <ButtonGroup
              items={items}
              value={value}
              onClick={(item) => setValue(item.id as string)}
            />
          </div>
        );
      };
      render(<Harness />);

      await user.click(screen.getByText('Running'));
      expect(screen.getByText('Running').closest('button')).toHaveAttribute(
        'aria-pressed',
        'true',
      );

      await user.click(screen.getByText('reset'));
      expect(screen.getByText('Running').closest('button')).toHaveAttribute(
        'aria-pressed',
        'false',
      );
    });
  });

  describe('Modal', () => {
    it('reopens when a controlled parent moves `open` back and forth', async () => {
      const user = userEvent.setup();
      const Harness = () => {
        const [open, setOpen] = useState(false);
        return (
          <div>
            <button onClick={() => setOpen(true)}>external open</button>
            <Modal open={open} onOpenChange={setOpen}>
              <ModalContent aria-label="Confirm">
                <ModalDismissButton>
                  <Button text="Close" />
                </ModalDismissButton>
              </ModalContent>
            </Modal>
          </div>
        );
      };
      render(<Harness />);

      await user.click(screen.getByText('external open'));
      expect(screen.getByRole('dialog')).toBeVisible();

      // ModalContent unmounts rather than hides, so the dismiss button having
      // worked means the dialog is gone from the tree entirely.
      await user.click(screen.getByText('Close'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('warns once when `open` is passed without `onOpenChange` and a trigger fires', async () => {
      const user = userEvent.setup();
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <Modal open={false}>
          <ModalOpenButton>
            <Button text="Open" />
          </ModalOpenButton>
          <ModalContent aria-label="Confirm">content</ModalContent>
        </Modal>,
      );

      await user.click(screen.getByText('Open'));
      await user.click(screen.getByText('Open'));

      const inertWarnings = warnSpy.mock.calls
        .map((call) => String(call[0]))
        .filter((message) => message.includes('without `onOpenChange`'));

      expect(inertWarnings).toHaveLength(1);
      warnSpy.mockRestore();
    });
  });

  describe('Accordion', () => {
    const renderContent = ({ open }: { open?: boolean }) => (
      <div data-testid="panel">{open ? 'expanded' : 'collapsed'}</div>
    );

    it('toggles itself when standing alone with only `defaultOpen`', async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();

      render(
        <Accordion
          id="solo"
          title="Details"
          aria-controls="solo-panel"
          defaultOpen
          onOpenChange={onOpenChange}
          renderTitle={AccordionTitle}
          renderContent={renderContent}
        />,
      );

      expect(screen.getByTestId('panel')).toHaveTextContent('expanded');

      await user.click(screen.getByRole('button', { name: /details/i }));

      // Previously the accordion held no state of its own: it reported the
      // toggle and then rendered the same thing forever.
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(screen.getByTestId('panel')).toHaveTextContent('collapsed');
    });

    it('leaves the state to its parent when given `open`', async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();

      render(
        <Accordion
          id="solo"
          title="Details"
          aria-controls="solo-panel"
          open={false}
          onOpenChange={onOpenChange}
          renderTitle={AccordionTitle}
          renderContent={renderContent}
        />,
      );

      await user.click(screen.getByRole('button', { name: /details/i }));

      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.getByTestId('panel')).toHaveTextContent('collapsed');
    });
  });
});
