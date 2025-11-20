import userEvent from '@testing-library/user-event';
import React from 'react';

import Icon from '@components/Icon';

import { Chip } from './index';
import theme from '@themes/main';
import { screen } from '../../../customTest';

describe('Chip', () => {
  describe('Rendering', () => {
    it('Renders with label', () => {
      render(<Chip label="Test Chip" />);

      const chip = screen.getByText('Test Chip');
      expect(chip).toBeInTheDocument();
    });

    it('Renders with ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Chip label="Test Chip" ref={ref} />);

      expect(ref.current?.textContent).toBe('Test Chip');
    });
  });

  describe('Sizes', () => {
    it('Renders small size', () => {
      render(<Chip label="Small" size="small" />);

      const chip = screen.getByText('Small').closest('div');
      expect(chip).toHaveStyle('height: 24px');
      expect(chip).toHaveStyle('font-size: 12px');
    });

    it('Renders large size', () => {
      render(<Chip label="Large" size="large" />);

      const chip = screen.getByText('Large').closest('div');
      expect(chip).toHaveStyle('height: 40px');
      expect(chip).toHaveStyle('font-size: 16px');
    });
  });

  describe('Variants', () => {
    it('Renders filled variant', () => {
      render(<Chip label="Filled" />);

      const chip = screen.getByText('Filled').closest('div');
      expect(chip).toHaveStyleRule(
        'background-color',
        theme.colors.greyLighter,
      );
      expect(chip).toHaveStyleRule('border', 'none');
    });

    it('Renders outlined variant', () => {
      render(<Chip label="Outlined" variant="outlined" />);

      const chip = screen.getByText('Outlined').closest('div');
      expect(chip).toHaveStyleRule('background-color', theme.colors.white);
      expect(chip).toHaveStyleRule('border', `1px solid ${theme.colors.grey}`);
    });
  });

  describe('Colors', () => {
    it('Renders with default color', () => {
      render(<Chip label="Default" />);

      const chip = screen.getByText('Default').closest('div');
      expect(chip).toHaveStyleRule('color', theme.colors.greyDarker);
    });

    it('Renders with primary color (filled)', () => {
      render(<Chip label="Primary" color="primary" />);

      const chip = screen.getByText('Primary').closest('div');
      expect(chip).toHaveStyleRule('background-color', theme.colors.blueRoyal);
      expect(chip).toHaveStyleRule('color', theme.colors.white);
    });

    it('Renders with primary color (outlined)', () => {
      render(<Chip label="Primary" color="primary" variant="outlined" />);

      const chip = screen.getByText('Primary').closest('div');
      expect(chip).toHaveStyleRule('background-color', theme.colors.white);
      expect(chip).toHaveStyleRule(
        'border',
        `1px solid ${theme.colors.blueRoyal}`,
      );
      expect(chip).toHaveStyleRule('color', theme.colors.blueRoyal);
    });

    it('Renders with warning color', () => {
      render(<Chip label="Warning" color="warning" />);

      const chip = screen.getByText('Warning').closest('div');
      expect(chip).toHaveStyleRule('background-color', theme.colors.yellow);
      expect(chip).toHaveStyleRule('color', theme.colors.white);
    });
  });

  describe('Disabled State', () => {
    it('Renders disabled chip', () => {
      render(<Chip label="Disabled" disabled />);

      const chip = screen.getByText('Disabled').closest('[aria-disabled]');
      expect(chip).toHaveAttribute('aria-disabled', 'true');
      expect(chip).toHaveStyleRule('opacity', '0.6');
    });

    it('Disabled chip does not trigger onClick', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();

      render(<Chip label="Disabled" disabled onClick={mockOnClick} />);

      const chip = screen.getByText('Disabled');
      await user.click(chip);

      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('Disabled chip does not show delete button', () => {
      const mockOnDelete = jest.fn();

      render(<Chip label="Disabled" disabled onDelete={mockOnDelete} />);

      const deleteButton = screen.queryByLabelText('Delete');
      expect(deleteButton).not.toBeInTheDocument();
    });
  });

  describe('Icons and Avatars', () => {
    it('Renders with icon', () => {
      render(<Chip label="With Icon" icon={<Icon name="calendar" />} />);

      const chip = screen.getByText('With Icon');
      expect(chip).toBeInTheDocument();

      const icon = screen.getByTitle(/calendar/i);
      expect(icon).toBeInTheDocument();
    });

    it('Renders with avatar', () => {
      render(
        <Chip label="With Avatar" avatar={<div data-testid="avatar">A</div>} />,
      );

      const chip = screen.getByText('With Avatar');
      expect(chip).toBeInTheDocument();

      const avatar = screen.getByTestId('avatar');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Delete Functionality', () => {
    it('Renders delete button when onDelete is provided', () => {
      const mockOnDelete = jest.fn();

      render(<Chip label="Deletable" onDelete={mockOnDelete} />);

      const deleteButton = screen.getByLabelText('Delete');
      expect(deleteButton).toBeInTheDocument();
    });

    it('Calls onDelete on Backspace key', async () => {
      const user = userEvent.setup();
      const mockOnDelete = jest.fn();

      render(<Chip label="Deletable" onDelete={mockOnDelete} />);

      const chip = screen.getByText('Deletable').closest('div');
      chip?.focus();
      await user.keyboard('{Backspace}');

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    it('Does not call onDelete when disabled', async () => {
      const user = userEvent.setup();
      const mockOnDelete = jest.fn();

      render(<Chip label="Disabled" disabled onDelete={mockOnDelete} />);

      const deleteButton = screen.queryByLabelText('Delete');
      expect(deleteButton).not.toBeInTheDocument();

      const chip = screen.getByText('Disabled').closest('div');
      chip?.focus();
      await user.keyboard('{Backspace}');

      expect(mockOnDelete).not.toHaveBeenCalled();
    });

    it('Renders custom delete icon', () => {
      const mockOnDelete = jest.fn();

      render(
        <Chip
          label="Custom Delete"
          onDelete={mockOnDelete}
          deleteIcon={<Icon name="bin" />}
        />,
      );

      const deleteButton = screen.getByLabelText('Delete');
      expect(deleteButton).toBeInTheDocument();

      const customIcon = screen.getByTitle(/bin/i);
      expect(customIcon).toBeInTheDocument();
    });
  });

  describe('Click Functionality', () => {
    it('Calls onClick when chip is clicked', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();

      render(<Chip label="Clickable" onClick={mockOnClick} />);

      const chip = screen.getByText('Clickable');
      await user.click(chip);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('Calls onClick when clickable prop is true', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();

      render(<Chip label="Clickable" clickable onClick={mockOnClick} />);

      const chip = screen.getByText('Clickable');
      await user.click(chip);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom Styles', () => {
    it('Renders with custom CSS', () => {
      render(
        <Chip
          label="Custom"
          css={{ backgroundColor: 'red', color: 'white' }}
        />,
      );

      const chip = screen.getByText('Custom').closest('div');
      expect(chip).toHaveStyleRule('background-color', 'red');
      expect(chip).toHaveStyleRule('color', 'white');
    });

    it('Custom styles work with disabled state', () => {
      render(
        <Chip
          label="Disabled Custom"
          disabled
          css={{ backgroundColor: 'blue' }}
        />,
      );

      const chip = screen
        .getByText('Disabled Custom')
        .closest('[aria-disabled]');
      expect(chip).toHaveAttribute('aria-disabled', 'true');
      expect(chip).toHaveStyleRule('background-color', 'blue');
    });
  });
});
