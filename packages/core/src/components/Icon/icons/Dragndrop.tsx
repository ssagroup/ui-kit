import { SVGProps } from '@components/Icon/types';

export const Dragndrop = ({
  fill = '#000',
  size = 24,
  tooltip = 'Dragndrop',
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
    <g transform="translate(8.4, 20.4) rotate(-90)">
      <path
        d="M1.8 0C0.81 0 0 0.81 0 1.8C0 2.79 0.81 3.6 1.8 3.6C2.79 3.6 3.6 2.79 3.6 1.8C3.6 0.81 2.79 0 1.8 0Z"
        fill={fill}
      />
      <path
        d="M8.4 0C7.41 0 6.6 0.81 6.6 1.8C6.6 2.79 7.41 3.6 8.4 3.6C9.39 3.6 10.2 2.79 10.2 1.8C10.2 0.81 9.39 0 8.4 0Z"
        fill={fill}
      />
      <path
        d="M15 0C14.01 0 13.2 0.81 13.2 1.8C13.2 2.79 14.01 3.6 15 3.6C15.99 3.6 16.8 2.79 16.8 1.8C16.8 0.81 15.99 0 15 0Z"
        fill={fill}
      />
    </g>
    <g transform="translate(12, 20.4) rotate(-90)">
      <path
        d="M1.8 0C0.81 0 0 0.81 0 1.8C0 2.79 0.81 3.6 1.8 3.6C2.79 3.6 3.6 2.79 3.6 1.8C3.6 0.81 2.79 0 1.8 0Z"
        fill={fill}
      />
      <path
        d="M8.4 0C7.41 0 6.6 0.81 6.6 1.8C6.6 2.79 7.41 3.6 8.4 3.6C9.39 3.6 10.2 2.79 10.2 1.8C10.2 0.81 9.39 0 8.4 0Z"
        fill={fill}
      />
      <path
        d="M15 0C14.01 0 13.2 0.81 13.2 1.8C13.2 2.79 14.01 3.6 15 3.6C15.99 3.6 16.8 2.79 16.8 1.8C16.8 0.81 15.99 0 15 0Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'dragndrop';
