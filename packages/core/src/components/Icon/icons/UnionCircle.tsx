import { SVGProps } from '@components/Icon/types';

export const UnionCircle = ({
  fill = '#000',
  size = 24,
  tooltip = 'Union Circle',
  ...props
}: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 20 20"
    fill="none"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M10 18.3337C14.5833 18.3337 18.3333 14.5837 18.3333 10.0003C18.3333 5.41699 14.5833 1.66699 10 1.66699C5.41667 1.66699 1.66667 5.41699 1.66667 10.0003C1.66667 14.5837 5.41667 18.3337 10 18.3337Z"
      stroke={fill}
      strokeOpacity="0.8"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.0004 8.46777C10.3867 8.46799 10.7004 8.78068 10.7006 9.16699V13.334C10.7004 13.7203 10.3867 14.034 10.0004 14.0342C9.61392 14.0342 9.30039 13.7204 9.30022 13.334V9.16699C9.30039 8.78054 9.61392 8.46777 10.0004 8.46777ZM10.0033 5.66699C10.5555 5.66717 11.0033 6.11482 11.0033 6.66699C11.0033 7.21917 10.5555 7.66682 10.0033 7.66699H9.99553C9.44324 7.66699 8.99553 7.21928 8.99553 6.66699C8.99553 6.11471 9.44324 5.66699 9.99553 5.66699H10.0033Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'union-circle';
