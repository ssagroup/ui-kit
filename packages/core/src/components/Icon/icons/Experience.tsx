import { SVGProps } from '@components/Icon/types';

export const Experience = ({
  fill = '#000',
  size = 24,
  tooltip = 'Experience',
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
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-6-4-6 4v2H8V6h2l4-2.5L18 6v10H8V6V4Zm4 4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm0 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'experience';
