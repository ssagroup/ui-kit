import userEvent from '@testing-library/user-event';

import Icon from '@components/Icon';

import Button from './index';
import { ButtonProps } from './types';
import {
  primaryBtnSpecs,
  secondaryBtnSpecs,
  tertiaryBtnSpecs,
  errorBtnSpecs,
  warningBtnSpecs,
  successBtnSpecs,
  TestPropsType,
} from './fixtures';

function setup(component: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(component),
  };
}

const getElTestId = (
  elType: string,
  isDisabled?: boolean,
  variant?: ButtonProps['variant'],
) => {
  const prefix = isDisabled
    ? 'disabled'
    : ['primary', 'error', 'warning', 'success'].includes(variant || '')
      ? 'white'
      : 'grey';

  return `${prefix}-button-${elType}`;
};

const getSpecName = (props: TestPropsType) => {
  return `Renders ${props.variant} [${props.type}${',' + props.size}${
    props.text ? ',text' : ''
  }${props.startIcon ? ',startIcon' : ''}${props.endIcon ? ',endIcon' : ''}${
    props.disabled ? ',disabled' : ''
  }]`;
};

const testButton = async (spec: TestPropsType) => {
  const { type, size, variant, text, disabled, endIcon, startIcon } = spec;
  const mockOnClick = jest.fn();
  let appendIcon;
  let prependIcon;

  if (startIcon) {
    prependIcon = <Icon name={startIcon} />;
  }
  if (endIcon) {
    appendIcon = <Icon name={endIcon} />;
  }

  const { user, getByRole, getByTestId, findByTitle } = setup(
    <Button
      type={type as ButtonProps['type']}
      size={size as ButtonProps['size']}
      variant={variant as ButtonProps['variant']}
      text={text}
      endIcon={appendIcon}
      startIcon={prependIcon}
      isDisabled={disabled}
      onClick={mockOnClick}
    />,
  );

  const buttonEl = getByRole('button');
  expect(buttonEl).toHaveAttribute('type', type);

  if (text) {
    const textEl = getByTestId(getElTestId('text', disabled, variant));
    expect(textEl).toHaveTextContent(text);
  }

  await user.click(buttonEl);

  if (disabled) {
    expect(mockOnClick).not.toBeCalled();
  } else {
    expect(mockOnClick).toBeCalled();
  }

  if (startIcon) {
    const iconTitle = new RegExp(startIcon, 'i');
    const icon = await findByTitle(iconTitle);

    expect(icon).toBeInTheDocument();
  }
  if (endIcon) {
    const iconTitle = new RegExp(endIcon, 'i');
    const icon = await findByTitle(iconTitle);

    expect(icon).toBeInTheDocument();
  }
};

describe('Button', () => {
  describe('Primary', () => {
    primaryBtnSpecs.forEach((spec) =>
      it(getSpecName(spec), () => testButton(spec)),
    );

    it('Renders with custom styles', () => {
      const { getByRole } = render(
        <Button
          size="small"
          variant="primary"
          text="Click me!"
          css={{ backgroundColor: 'blue' }}
        />,
      );

      const buttonEl = getByRole('button');
      expect(buttonEl).toHaveStyleRule('background-color', 'blue');
    });

    it('Renders with full width', () => {
      const { getByRole } = render(
        <Button block={true} variant="primary" text="Click me!" />,
      );

      const buttonWrapper = getByRole('button').closest('div');

      expect(buttonWrapper).toHaveStyleRule('width', '100%');
    });

    it('Renders with a custom text component', () => {
      const { queryByTestId, getByText } = render(
        <Button size="small" variant="primary">
          Click me!
        </Button>,
      );

      getByText('Click me!');
      expect(queryByTestId('disabled-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('white-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('grey-button-text')).not.toBeInTheDocument();
    });

    it('Renders with custom aria-* attributes', () => {
      const { getByRole } = render(
        <Button size="small" variant="primary" aria-current="true">
          Click me!
        </Button>,
      );

      expect(getByRole('button')).toHaveAttribute('aria-current', 'true');
    });

    it('Throw error when without register', () => {
      jest.spyOn(console, 'error').mockImplementation();

      expect(() => render(<Button variant="primary" />)).toThrow(
        'Button must have either text or icon or children',
      );
    });

    it('Renders with default style', () => {
      const { getByTestId } = render(<Button variant="primary" text="Button" />);

      const span = getByTestId('white-button-text');

      expect(span).toBeInTheDocument();
      expect(span).toHaveStyleRule('color', 'rgba(255, 255, 255, 1)');
      expect(span).toHaveTextContent('Button');
    });
  });

  describe('Error', () => {
    errorBtnSpecs.forEach((spec) =>
      it(getSpecName(spec), () => testButton(spec)),
    );

    it('Renders with custom styles', () => {
      const { getByRole } = render(
        <Button
          size="small"
          variant="error"
          text="Click me!"
          css={{ backgroundColor: 'blue' }}
        />,
      );

      const buttonEl = getByRole('button');
      expect(buttonEl).toHaveStyleRule('background-color', 'blue');
    });

    it('Renders with full width', () => {
      const { getByRole } = render(
        <Button block={true} variant="error" text="Click me!" />,
      );

      const buttonWrapper = getByRole('button').closest('div');

      expect(buttonWrapper).toHaveStyleRule('width', '100%');
    });

    it('Renders with a custom text component', () => {
      const { queryByTestId, getByText } = render(
        <Button size="small" variant="error">
          Click me!
        </Button>,
      );

      getByText('Click me!');
      expect(queryByTestId('disabled-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('white-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('grey-button-text')).not.toBeInTheDocument();
    });

    it('Renders with custom aria-* attributes', () => {
      const { getByRole } = render(
        <Button size="small" variant="error" aria-current="true">
          Click me!
        </Button>,
      );

      expect(getByRole('button')).toHaveAttribute('aria-current', 'true');
    });

    it('Throw error when without register', () => {
      jest.spyOn(console, 'error').mockImplementation();

      expect(() => render(<Button variant="error" />)).toThrow(
        'Button must have either text or icon or children',
      );
    });

    it('Renders with default style', () => {
      const { getByTestId } = render(<Button variant="error" text="Button" />);

      const span = getByTestId('white-button-text');

      expect(span).toBeInTheDocument();
      expect(span).toHaveStyleRule('color', 'rgba(255, 255, 255, 1)');
      expect(span).toHaveTextContent('Button');
    });
  });

  describe('Secondary', () => {
    secondaryBtnSpecs.forEach((spec) =>
      it(getSpecName(spec), () => testButton(spec)),
    );

    it('Renders with custom styles', () => {
      const { getByRole } = render(
        <Button
          size="small"
          variant="secondary"
          text="Click me!"
          css={{ backgroundColor: 'blue' }}
        />,
      );

      const buttonEl = getByRole('button');

      expect(buttonEl).toHaveStyleRule('background-color', 'blue');
    });

    it('Renders with full width', () => {
      const { getByRole } = render(
        <Button block={true} variant="secondary" text="Click me!" />,
      );

      const buttonWrapper = getByRole('button').closest('div');

      expect(buttonWrapper).toHaveStyleRule('width', '100%');
    });

    it('Renders with a custom text component', () => {
      const { queryByTestId, getByText } = render(
        <Button size="small" variant="secondary">
          Secondary button
        </Button>,
      );

      getByText('Secondary button');
      expect(queryByTestId('disabled-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('white-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('grey-button-text')).not.toBeInTheDocument();
    });

    it('Renders with custom aria-* attributes', () => {
      const { getByRole } = render(
        <Button size="small" variant="secondary" aria-current="true">
          Click me!
        </Button>,
      );

      expect(getByRole('button')).toHaveAttribute('aria-current', 'true');
    });

    it('Throw error when without register', () => {
      jest.spyOn(console, 'error').mockImplementation();

      expect(() => render(<Button variant="secondary" />)).toThrow(
        'Button must have either text or icon or children',
      );
    });

    it('Renders with default style', () => {
      const { getByTestId } = render(
        <Button variant="secondary" text="Button" />,
      );

      const span = getByTestId('grey-button-text');

      expect(span).toBeInTheDocument();
      expect(span).toHaveStyleRule('color', 'rgba(43, 45, 49, 1)');
      expect(span).toHaveTextContent('Button');
    });
  });

  describe('Tertiary', () => {
    tertiaryBtnSpecs.forEach((spec) =>
      it(getSpecName(spec), () => testButton(spec)),
    );

    it('Renders with custom styles', () => {
      const { getByRole } = render(
        <Button
          size="small"
          variant="tertiary"
          text="Click me!"
          css={{ backgroundColor: 'blue' }}
        />,
      );

      const buttonEl = getByRole('button');
      expect(buttonEl).toHaveStyleRule('background-color', 'blue');
    });

    it('Renders with full width', () => {
      const { getByRole } = render(
        <Button block={true} variant="tertiary" text="Click me!" />,
      );

      const buttonWrapper = getByRole('button').closest('div');

      expect(buttonWrapper).toHaveStyleRule('width', '100%');
    });

    it('Renders with a custom text component', () => {
      const { queryByTestId, getByText } = render(
        <Button size="small" variant="tertiary">
          Tertiary button
        </Button>,
      );

      getByText('Tertiary button');
      expect(queryByTestId('disabled-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('white-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('grey-button-text')).not.toBeInTheDocument();
    });

    it('Renders with custom aria-* attributes', () => {
      const { getByRole } = render(
        <Button size="small" variant="tertiary" aria-current="true">
          Click me!
        </Button>,
      );

      expect(getByRole('button')).toHaveAttribute('aria-current', 'true');
    });

    it('Throw error when without register', () => {
      jest.spyOn(console, 'error').mockImplementation();

      expect(() => render(<Button variant="tertiary" />)).toThrow(
        'Button must have either text or icon or children',
      );
    });

    it('Renders with default style', () => {
      const { getByTestId } = render(
        <Button variant="tertiary" text="Button" />,
      );

      const span = getByTestId('grey-button-text');

      expect(span).toBeInTheDocument();
      expect(span).toHaveStyleRule('color', 'rgba(43, 45, 49, 1)');
      expect(span).toHaveTextContent('Button');
    });
  });

  describe('Warning', () => {
    warningBtnSpecs.forEach((spec) =>
      it(getSpecName(spec), () => testButton(spec)),
    );

    it('Renders with custom styles', () => {
      const { getByRole } = render(
        <Button
          size="small"
          variant="warning"
          text="Click me!"
          css={{ backgroundColor: 'pink' }}
        />,
      );

      const buttonEl = getByRole('button');
      expect(buttonEl).toHaveStyleRule('background-color', 'pink');
    });

    it('Renders with full width', () => {
      const { getByRole } = render(
        <Button block={true} variant="warning" text="Click me!" />,
      );

      const buttonWrapper = getByRole('button').closest('div');

      expect(buttonWrapper).toHaveStyleRule('width', '100%');
    });

    it('Renders with a custom text component', () => {
      const { queryByTestId, getByText } = render(
        <Button size="small" variant="warning">
          Click me!
        </Button>,
      );

      getByText('Click me!');
      expect(queryByTestId('disabled-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('white-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('grey-button-text')).not.toBeInTheDocument();
    });

    it('Renders with custom aria-* attributes', () => {
      const { getByRole } = render(
        <Button size="small" variant="warning" aria-current="true">
          Click me!
        </Button>,
      );

      expect(getByRole('button')).toHaveAttribute('aria-current', 'true');
    });

    it('Throw error when without register', () => {
      jest.spyOn(console, 'error').mockImplementation();

      expect(() => render(<Button variant="warning" />)).toThrow(
        'Button must have either text or icon or children',
      );
    });

    it('Renders with default style', () => {
      const { getByTestId } = render(
        <Button variant="warning" text="Button" />,
      );

      const span = getByTestId('white-button-text');

      expect(span).toBeInTheDocument();
      expect(span).toHaveStyleRule('color', 'rgba(255, 255, 255, 1)');
      expect(span).toHaveTextContent('Button');
    });
  });

  describe('Success', () => {
    successBtnSpecs.forEach((spec) =>
      it(getSpecName(spec), () => testButton(spec)),
    );

    it('Renders with custom styles', () => {
      const { getByRole } = render(
        <Button
          size="small"
          variant="success"
          text="Click me!"
          css={{ backgroundColor: 'green' }}
        />,
      );

      const buttonEl = getByRole('button');
      expect(buttonEl).toHaveStyleRule('background-color', 'green');
    });

    it('Renders with full width', () => {
      const { getByRole } = render(
        <Button block={true} variant="success" text="Click me!" />,
      );

      const buttonWrapper = getByRole('button').closest('div');

      expect(buttonWrapper).toHaveStyleRule('width', '100%');
    });

    it('Renders with a custom text component', () => {
      const { queryByTestId, getByText } = render(
        <Button size="small" variant="success">
          Success
        </Button>,
      );

      getByText('Success');
      expect(queryByTestId('disabled-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('white-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('grey-button-text')).not.toBeInTheDocument();
    });

    it('Renders with custom aria-* attributes', () => {
      const { getByRole } = render(
        <Button size="small" variant="success" aria-current="true">
          Click me!
        </Button>,
      );

      expect(getByRole('button')).toHaveAttribute('aria-current', 'true');
    });

    it('Throw error when without register', () => {
      jest.spyOn(console, 'error').mockImplementation();

      expect(() => render(<Button variant="success" />)).toThrow(
        'Button must have either text or icon or children',
      );
    });

    it('Renders with default style', () => {
      const { getByTestId } = render(
        <Button variant="success" text="Button" />,
      );

      const span = getByTestId('white-button-text');

      expect(span).toBeInTheDocument();
      expect(span).toHaveStyleRule('color', 'rgba(255, 255, 255, 1)');
      expect(span).toHaveTextContent('Button');
    });
  });

  describe('Icon', () => {
    it('Renders icon at the start', async () => {
      const { findByTitle } = render(
        <Button
          startIcon={<Icon name="calendar" />}
          variant="primary"
          text="Click me!"
        />,
      );

      const icon = await findByTitle(/calendar/i);

      expect(icon).toBeInTheDocument();
    });

    it('Renders icon at the end', async () => {
      const { findByTitle } = render(
        <Button
          endIcon={<Icon name="calendar" />}
          variant="primary"
          text="Click me!"
        />,
      );

      const icon = await findByTitle(/calendar/i);

      expect(icon).toBeInTheDocument();
    });

    it('Renders icon on both sides', async () => {
      const { findByTitle } = render(
        <Button
          endIcon={<Icon name="carrot-left" />}
          startIcon={<Icon name="carrot-right" />}
          variant="primary"
          text="Click me!"
        />,
      );

      const iconLeft = await findByTitle(/carrot left/i);
      const iconRight = await findByTitle(/carrot right/i);

      expect(iconLeft).toBeInTheDocument();
      expect(iconRight).toBeInTheDocument();
    });

    it('Renders only an icon', () => {
      const { container, getByTitle } = render(
        <Button startIcon={<Icon name="archive" />} />,
      );

      const icon = getByTitle(/archive/i);
      expect(icon).toBeInTheDocument();

      const spans = container.getElementsByTagName('span');
      expect(spans).toHaveLength(1);
    });
  });

  describe('Disabled', () => {
    it('Renders with default style', () => {
      const { getByTestId } = render(<Button isDisabled text="Button" />);

      const span = getByTestId('disabled-button-text');

      expect(span).toBeInTheDocument();
      expect(span).toHaveStyleRule('color', 'rgba(43, 45, 49, 0.4)');
      expect(span).toHaveTextContent('Button');
    });
  });
});
