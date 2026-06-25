import { SVGProps } from '@components/Icon/types';

export const H1 = ({
  fill = '#000',
  size = 24,
  tooltip = 'H1',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{tooltip}</title>
    <g transform="translate(3, 5)">
      <path
        d="M15.9983 14V1.91528L13.3636 3.50972V1.575L15.9983 0H17.758V14H15.9983Z"
        fill={fill}
      />
      <path
        d="M0 14V0H1.73056V6.17361H9.1V0H10.8306V14H9.1V7.81667H1.73056V14H0Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'h1';
