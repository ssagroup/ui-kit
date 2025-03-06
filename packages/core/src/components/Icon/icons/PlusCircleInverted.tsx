import { SVGProps } from '@components/Icon/types';

export const PlusCircleInverted = ({
  fill = '#000',
  size = 24,
  tooltip = 'Plus circle inverted',
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
      d="M1.66663 10C1.66663 5.40835 5.40829 1.66669 9.99996 1.66669C14.5916 1.66669 18.3333 5.40835 18.3333 10C18.3333 14.5917 14.5916 18.3334 9.99996 18.3334C5.40829 18.3334 1.66663 14.5917 1.66663 10ZM9.99996 13.9584C10.3416 13.9584 10.625 13.675 10.625 13.3334V10.625H13.3333C13.675 10.625 13.9583 10.3417 13.9583 10C13.9583 9.65835 13.675 9.37502 13.3333 9.37502H10.625V6.66669C10.625 6.32502 10.3416 6.04169 9.99996 6.04169C9.65829 6.04169 9.37496 6.32502 9.37496 6.66669V9.37502H6.66663C6.32496 9.37502 6.04163 9.65835 6.04163 10C6.04163 10.3417 6.32496 10.625 6.66663 10.625H9.37496V13.3334C9.37496 13.675 9.65829 13.9584 9.99996 13.9584Z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'plus-circle-inverted';
