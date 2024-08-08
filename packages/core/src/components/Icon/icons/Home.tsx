import { SVGProps } from '@components/Icon/types';

export const Home = ({
  fill = '#000',
  size = 24,
  tooltip = 'Home',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 18 20"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M8.97559 0.250119C8.81566 0.25558 8.66168 0.312041 8.53613 0.411252L1.42969 6.00988C0.527739 6.7207 0 7.80687 0 8.9552V18.5001C0 19.1819 0.568203 19.7501 1.25 19.7501H6.25C6.9318 19.7501 7.5 19.1819 7.5 18.5001V13.5001C7.5 13.3526 7.60248 13.2501 7.75 13.2501H10.25C10.3975 13.2501 10.5 13.3526 10.5 13.5001V18.5001C10.5 19.1819 11.0682 19.7501 11.75 19.7501H16.75C17.4318 19.7501 18 19.1819 18 18.5001V8.9552C18 7.80687 17.4723 6.7207 16.5703 6.00988L9.46387 0.411252C9.32518 0.301689 9.15225 0.244623 8.97559 0.250119ZM9 1.9552L15.6426 7.1886C16.1846 7.61578 16.5 8.26552 16.5 8.9552V18.2501H12V13.5001C12 12.5426 11.2075 11.7501 10.25 11.7501H7.75C6.79252 11.7501 6 12.5426 6 13.5001V18.2501H1.5V8.9552C1.5 8.26552 1.81537 7.61578 2.35742 7.1886L9 1.9552Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'home';
