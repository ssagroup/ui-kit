import { SVGProps } from '@components/Icon/types';

export const CardText = ({
  fill = '#000',
  size = 24,
  tooltip = 'Card Text',
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
      d="M14.5 3C14.7761 3 15 3.22386 15 3.5V12.5C15 12.7761 14.7761 13 14.5 13H1.5C1.22386 13 1 12.7761 1 12.5V3.5C1 3.22386 1.22386 3 1.5 3H14.5ZM1.5 2C0.671573 2 0 2.67157 0 3.5V12.5C0 13.3284 0.671573 14 1.5 14H14.5C15.3284 14 16 13.3284 16 12.5V3.5C16 2.67157 15.3284 2 14.5 2H1.5Z"
      fill={fill}
    />
    <path
      d="M3 5.5C3 5.22386 3.22386 5 3.5 5H12.5C12.7761 5 13 5.22386 13 5.5C13 5.77614 12.7761 6 12.5 6H3.5C3.22386 6 3 5.77614 3 5.5ZM3 8C3 7.72386 3.22386 7.5 3.5 7.5H12.5C12.7761 7.5 13 7.72386 13 8C13 8.27614 12.7761 8.5 12.5 8.5H3.5C3.22386 8.5 3 8.27614 3 8ZM3 10.5C3 10.2239 3.22386 10 3.5 10H9.5C9.77614 10 10 10.2239 10 10.5C10 10.7761 9.77614 11 9.5 11H3.5C3.22386 11 3 10.7761 3 10.5Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'card-text';
