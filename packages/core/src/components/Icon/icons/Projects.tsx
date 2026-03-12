import { SVGProps } from '@components/Icon/types';

export const Projects = ({
  fill = '#000',
  size = 24,
  tooltip = 'Projects',
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
      d="M4 4a2 2 0 0 1 2-2h4l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 0v14h8V8h-4V4H6Zm6 .414L14.586 7H12v2.414Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'projects';
