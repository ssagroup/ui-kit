import userEvent from '@testing-library/user-event';

import Icon from '@components/Icon';

import Button from './index';
import { ButtonProps } from './types';
import {
  primaryBtnSpecs,
  secondaryBtnSpecs,
  tertiaryBtnSpecs,
  infoBtnSpecs,
  attentionBtnSpecs,
  TestPropsType,
} from './fixtures';

function setup(component: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(component),
  };
}

const getElTestId = (
  elType: string,
  isDisabled?: boolean,
  variant?: ButtonProps['variant'],
  isHovered?: boolean,
) => {
  const prefix = isDisabled
    ? 'disabled'
    : ['primary', 'info', 'attention'].includes(variant || '')
      ? 'white'
      : variant === 'tertiary' && isHovered
        ? 'greylight'
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

const testTertiaryBtnHoverState = async (spec: TestPropsType) => {
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

  await user.hover(buttonEl);

  if (text) {
    const textEl = getByTestId(getElTestId('text', disabled, variant, true));
    expect(textEl).toHaveTextContent(text);
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
      expect(queryByTestId('greylight-button-text')).not.toBeInTheDocument();
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
      const { getByTestId } = render(<Button text="Button" />);

      const span = getByTestId('white-button-text');

      expect(span).toBeInTheDocument();
      expect(span).toHaveStyleRule('color', 'rgba(255, 255, 255, 1)');
      expect(span).toHaveTextContent('Button');
    });
  });

  describe('Info', () => {
    infoBtnSpecs.forEach((spec) =>
      it(getSpecName(spec), () => testButton(spec)),
    );

    it('Renders with custom styles', () => {
      const { getByRole } = render(
        <Button
          size="small"
          variant="info"
          text="Click me!"
          css={{ backgroundColor: 'blue' }}
        />,
      );

      const buttonEl = getByRole('button');
      expect(buttonEl).toHaveStyleRule('background-color', 'blue');
    });

    it('Renders with full width', () => {
      const { getByRole } = render(
        <Button block={true} variant="info" text="Click me!" />,
      );

      const buttonWrapper = getByRole('button').closest('div');

      expect(buttonWrapper).toHaveStyleRule('width', '100%');
    });

    it('Renders with a custom text component', () => {
      const { queryByTestId, getByText } = render(
        <Button size="small" variant="info">
          Click me!
        </Button>,
      );

      getByText('Click me!');
      expect(queryByTestId('disabled-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('white-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('grey-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('greylight-button-text')).not.toBeInTheDocument();
    });

    it('Renders with custom aria-* attributes', () => {
      const { getByRole } = render(
        <Button size="small" variant="info" aria-current="true">
          Click me!
        </Button>,
      );

      expect(getByRole('button')).toHaveAttribute('aria-current', 'true');
    });

    it('Throw error when without register', () => {
      jest.spyOn(console, 'error').mockImplementation();

      expect(() => render(<Button variant="info" />)).toThrow(
        'Button must have either text or icon or children',
      );
    });

    it('Renders with default style', () => {
      const { getByTestId } = render(<Button variant="info" text="Button" />);

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
      expect(queryByTestId('greylight-button-text')).not.toBeInTheDocument();
    });

    it('Renders with custom aria-* attributes', () => {
      const { getByRole } = render(
        <Button size="small" variant="secondary" aria-current="true">
          Click me!
        </Button>,
      );

      expect(getByRole('button')).toHaveAttribute('aria-current', 'true');
    });

    it('Trow error when without register', () => {
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

    tertiaryBtnSpecs.forEach((spec) =>
      it(`${getSpecName(spec)} hover`, () => testTertiaryBtnHoverState(spec)),
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
      expect(queryByTestId('greylight-button-text')).not.toBeInTheDocument();
    });

    it('Renders with custom aria-* attributes', () => {
      const { getByRole } = render(
        <Button size="small" variant="tertiary" aria-current="true">
          Click me!
        </Button>,
      );

      expect(getByRole('button')).toHaveAttribute('aria-current', 'true');
    });

    it('Trow error when without register', () => {
      jest.spyOn(console, 'error').mockImplementation();

      expect(() => render(<Button variant="tertiary" />)).toThrow(
        'Button must have either text or icon or children',
      );
    });

    it('Renders with default style when hovered', async () => {
      const { user, getByTestId, getByRole } = setup(
        <Button variant="tertiary" text="Button" />,
      );

      const buttonEl = getByRole('button');
      await user.hover(buttonEl);

      const span = getByTestId('greylight-button-text');
      expect(span).toBeInTheDocument();
      expect(span).toHaveStyleRule('color', 'rgba(77, 82, 87, 1)');
      expect(span).toHaveTextContent('Button');
    });
  });

  describe('Attention', () => {
    attentionBtnSpecs.forEach((spec) =>
      it(getSpecName(spec), () => testButton(spec)),
    );

    it('Renders with custom styles', () => {
      const { getByRole } = render(
        <Button
          size="small"
          variant="attention"
          text="Click me!"
          css={{ backgroundColor: 'pink' }}
        />,
      );

      const buttonEl = getByRole('button');
      expect(buttonEl).toHaveStyleRule('background-color', 'pink');
    });

    it('Renders with full width', () => {
      const { getByRole } = render(
        <Button block={true} variant="attention" text="Click me!" />,
      );

      const buttonWrapper = getByRole('button').closest('div');

      expect(buttonWrapper).toHaveStyleRule('width', '100%');
    });

    it('Renders with a custom text component', () => {
      const { queryByTestId, getByText } = render(
        <Button size="small" variant="attention">
          Click me!
        </Button>,
      );

      getByText('Click me!');
      expect(queryByTestId('disabled-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('white-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('grey-button-text')).not.toBeInTheDocument();
      expect(queryByTestId('greylight-button-text')).not.toBeInTheDocument();
    });

    it('Renders with custom aria-* attributes', () => {
      const { getByRole } = render(
        <Button size="small" variant="attention" aria-current="true">
          Click me!
        </Button>,
      );

      expect(getByRole('button')).toHaveAttribute('aria-current', 'true');
    });

    it('Throw error when without register', () => {
      jest.spyOn(console, 'error').mockImplementation();

      expect(() => render(<Button variant="attention" />)).toThrow(
        'Button must have either text or icon or children',
      );
    });

    it('Renders with default style', () => {
      const { getByTestId } = render(
        <Button variant="attention" text="Button" />,
      );

      const span = getByTestId('white-button-text');

      expect(span).toBeInTheDocument();
      expect(span).toHaveStyleRule('color', 'rgba(255, 255, 255, 1)');
      expect(span).toHaveTextContent('Button');
    });
  });

  describe('Custom', () => {
    it('Renders with the "custom" variant', () => {
      const { getByRole } = render(
        <Button variant="custom" text="Click me!" size="small" />,
      );

      expect(getByRole('button')).not.toHaveStyleRule(
        'background-color',
        'ButtonFace',
      );
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
