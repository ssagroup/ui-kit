import { fireEvent, screen } from '../../../customTest';

import Modal from '@components/Modal';
import ModalContent from '@components/ModalContent';
import ModalOpenButton from '@components/ModalOpenButton';
import ModalDismissButton from '@components/ModalDismissButton';

import Button from '@components/Button';

describe('Modal', () => {
  describe('rendering', () => {
    it('does not render children when not open', () => {
      const { queryByTestId } = render(
        <div data-testid="root">
          <Modal>
            <ModalContent aria-label="label">
              <div data-testid="inner" />
            </ModalContent>
          </Modal>
        </div>,
      );
      expect(queryByTestId('root')).toBeInTheDocument();
      expect(queryByTestId('inner')).toBeNull();
    });

    it('does render children when trigger button', () => {
      const { queryByTestId } = render(
        <div data-testid="root">
          <Modal>
            <ModalOpenButton>
              <Button size="small" text="open" />
            </ModalOpenButton>
            <ModalContent aria-label="label">
              <div data-testid="inner" />
            </ModalContent>
          </Modal>
        </div>,
      );

      fireEvent.click(screen.getByText(/open/i));

      expect(queryByTestId('inner')).toBeInTheDocument();
    });

    it('without background', async () => {
      const { queryByTestId, queryAllByRole } = render(
        <div data-testid="root">
          <Modal>
            <ModalOpenButton>
              <Button size="small" text="open" />
            </ModalOpenButton>
            <ModalContent aria-label="label" noBackground={true}>
              <div data-testid="inner" />
            </ModalContent>
          </Modal>
        </div>,
      );

      fireEvent.click(screen.getByText(/open/i));

      const [, bgElement] = await queryAllByRole('button');

      expect(queryByTestId('inner')).toBeInTheDocument();
      expect(bgElement).toHaveStyleRule('background-color', 'transparent');
    });

    it('trigger button accept parallel onClick call', () => {
      const handleClick = jest.fn();

      const { queryByTestId } = render(
        <div data-testid="root">
          <Modal>
            <ModalOpenButton>
              <Button size="small" text="open" onClick={handleClick} />
            </ModalOpenButton>
            <ModalContent aria-label="label">
              <div data-testid="inner" />
            </ModalContent>
          </Modal>
        </div>,
      );

      fireEvent.click(screen.getByText(/open/i));

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(queryByTestId('inner')).toBeInTheDocument();
    });
  });

  describe('a11y', () => {
    it('can be labelled by another element', () => {
      const { getByRole, getByText } = render(
        <Modal>
          <ModalOpenButton>
            <Button size="small" text="open" />
          </ModalOpenButton>
          <ModalContent aria-label="dialog-label">
            <div data-testid="inner" />
          </ModalContent>
        </Modal>,
      );

      fireEvent.click(getByText(/open/i));

      const dialog = getByRole('dialog');

      expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-label');
    });
  });
});

describe('user events', () => {
  it('closes the dialog', () => {
    const { getByText, queryByTestId } = render(
      <Modal>
        <ModalOpenButton>
          <Button size="small" text="open" />
        </ModalOpenButton>
        <ModalContent aria-label="dialog-label">
          <ModalDismissButton>
            <Button size="small" text="close" />
          </ModalDismissButton>
          <div data-testid="inner" />
        </ModalContent>
      </Modal>,
    );

    fireEvent.click(getByText('open'));

    expect(queryByTestId('inner')).toBeInTheDocument();

    fireEvent.click(getByText('close'));

    expect(queryByTestId('inner')).toBeNull();
  });
});
