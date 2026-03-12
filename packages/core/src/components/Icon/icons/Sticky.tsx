import { SVGProps } from '@components/Icon/types';

export const Sticky = ({
  fill = '#000',
  size = 24,
  tooltip = 'Sticky',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M2.5 1C1.67157 1 1 1.67157 1 2.5V13.5C1 14.3284 1.67157 15 2.5 15H8.58579C8.98361 15 9.36514 14.842 9.64645 14.5607L14.5607 9.64645C14.842 9.36514 15 8.98361 15 8.58579V2.5C15 1.67157 14.3284 1 13.5 1H2.5ZM2 2.5C2 2.22386 2.22386 2 2.5 2H13.5C13.7761 2 14 2.22386 14 2.5V8H9.5C8.67157 8 8 8.67157 8 9.5V14H2.5C2.22386 14 2 13.7761 2 13.5V2.5ZM9 13.7929V9.5C9 9.22386 9.22386 9 9.5 9H13.7929L9 13.7929Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'sticky';
