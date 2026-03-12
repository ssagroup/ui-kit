import { SVGProps } from '@components/Icon/types';

export const Inventory = ({
  fill = '#000',
  size = 24,
  tooltip = 'Inventory',
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
      d="M4 4h6v6H4V4Zm1.5 1.5v3h3v-3h-3ZM14 4h6v6h-6V4Zm1.5 1.5v3h3v-3h-3ZM4 14h6v6H4v-6Zm1.5 1.5v3h3v-3h-3ZM14 14h6v6h-6v-6Zm1.5 1.5v3h3v-3h-3Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'inventory';
