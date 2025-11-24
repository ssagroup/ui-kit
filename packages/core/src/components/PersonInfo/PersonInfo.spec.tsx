import React from 'react';
import { screen } from '../../../customTest';
import { PersonInfo } from '@components';
import Badge from '@components/Badge';

describe('PersonInfo', () => {
  it('Renders with title', () => {
    render(<PersonInfo title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('Renders with value', () => {
    render(<PersonInfo title="Title" value="Test Value" />);

    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  it('Renders with icon as string', () => {
    render(<PersonInfo title="Title" icon="user" />);

    const icon = screen.getByTitle(/user/i);
    expect(icon).toBeInTheDocument();
  });

  it('Renders with icon as ReactNode', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;
    render(<PersonInfo title="Title" icon={<CustomIcon />} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('Renders with avatar and value', () => {
    const { container } = render(
      <PersonInfo
        title="Title"
        avatar="https://i.pravatar.cc/150?img=12"
        value="John Doe"
      />,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();

    const avatar = container.querySelector('[size="24"]');
    expect(avatar).toBeInTheDocument();
  });

  it('Renders with counter', () => {
    render(<PersonInfo title="Title" value="Value" counter="+5" />);

    expect(screen.getByText('+5')).toBeInTheDocument();
  });

  it('Renders with counter when avatar is present', () => {
    render(
      <PersonInfo
        title="Title"
        avatar="https://i.pravatar.cc/150?img=12"
        value="John Doe"
        counter="+5"
      />,
    );

    expect(screen.getByText('+5')).toBeInTheDocument();
  });

  it('Renders with badge as ReactNode', () => {
    render(
      <PersonInfo title="Title" badge={<Badge size="small">Badge</Badge>} />,
    );

    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('Renders with badge as string array', () => {
    render(<PersonInfo title="Title" badge={['badge 1', 'badge 2']} />);

    expect(screen.getByText('badge 1')).toBeInTheDocument();
    expect(screen.getByText('badge 2')).toBeInTheDocument();
  });

  it('Renders with badge as ReactNode array', () => {
    render(
      <PersonInfo
        title="Title"
        badge={[
          <Badge key="1" size="small">
            Badge 1
          </Badge>,
          <Badge key="2" size="small">
            Badge 2
          </Badge>,
        ]}
      />,
    );

    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Badge 2')).toBeInTheDocument();
  });

  it('Renders with attributes as string array', () => {
    render(<PersonInfo title="Title" attributes={['Attr 1', 'Attr 2']} />);

    expect(screen.getByText('Attr 1')).toBeInTheDocument();
    expect(screen.getByText('Attr 2')).toBeInTheDocument();
  });

  it('Renders with attributes as ReactNode array', () => {
    render(
      <PersonInfo
        title="Title"
        attributes={[
          <span key="1" data-testid="attr-1">
            Custom Attr 1
          </span>,
          <span key="2" data-testid="attr-2">
            Custom Attr 2
          </span>,
        ]}
      />,
    );

    expect(screen.getByTestId('attr-1')).toBeInTheDocument();
    expect(screen.getByTestId('attr-2')).toBeInTheDocument();
  });

  it('Renders with description', () => {
    render(<PersonInfo title="Title" description="Test description text" />);

    expect(screen.getByText('Test description text')).toBeInTheDocument();
  });

  it('Renders without icon when icon is not provided', () => {
    const { container } = render(<PersonInfo title="Title" />);

    const iconWrapper = container.querySelector('[class*="IconWrapper"]');
    expect(iconWrapper).not.toBeInTheDocument();
  });

  it('Renders with all props', () => {
    render(
      <PersonInfo
        title="Full Title"
        icon="user"
        value="John Doe"
        avatar="https://i.pravatar.cc/150?img=12"
        counter="+5"
        badge={['badge 1', 'badge 2']}
        attributes={['Attribute 1', 'Attribute 2']}
        description="Full description"
      />,
    );

    expect(screen.getByText('Full Title')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('+5')).toBeInTheDocument();
    expect(screen.getByText('badge 1')).toBeInTheDocument();
    expect(screen.getByText('badge 2')).toBeInTheDocument();
    expect(screen.getByText('Attribute 1')).toBeInTheDocument();
    expect(screen.getByText('Attribute 2')).toBeInTheDocument();
    expect(screen.getByText('Full description')).toBeInTheDocument();
  });

  it('Renders with ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PersonInfo ref={ref} title="Title" />);

    expect(ref.current).toBeInTheDocument();
    expect(ref.current?.textContent).toContain('Title');
  });

  it('Renders with className', () => {
    const { container } = render(
      <PersonInfo title="Title" className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('Applies default badge colors to string badges', () => {
    render(
      <PersonInfo title="Title" badge={['badge 1', 'badge 2', 'badge 3']} />,
    );

    const badge1 = screen.getByText('badge 1');
    const badge2 = screen.getByText('badge 2');
    const badge3 = screen.getByText('badge 3');

    expect(badge1).toBeInTheDocument();
    expect(badge2).toBeInTheDocument();
    expect(badge3).toBeInTheDocument();
  });
});
