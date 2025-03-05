import { SVGProps } from '@components/Icon/types';

export const MinusCircleInverted = ({
  fill = '#000',
  size = 24,
  tooltip = 'Minus circle inverted',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M1.66663 10C1.66663 5.40835 5.40829 1.66669 9.99996 1.66669C14.5916 1.66669 18.3333 5.40835 18.3333 10C18.3333 14.5917 14.5916 18.3334 9.99996 18.3334C5.40829 18.3334 1.66663 14.5917 1.66663 10ZM5.97496 10C5.97496 10.3417 6.25829 10.625 6.59996 10.625H13.2666C13.6166 10.625 13.8916 10.3417 13.8916 10C13.8916 9.65835 13.6083 9.37502 13.2666 9.37502H6.59996C6.25829 9.37502 5.97496 9.65835 5.97496 10Z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'minus-circle-inverted';
