import { SVGProps } from '@components/Icon/types';

export const Trainings = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>Trainings</title>
    <path
      d="M6.75 3.75C5.51634 3.75 4.5 4.76634 4.5 6V6.89062C4.26408 6.80564 4.01367 6.75 3.75 6.75C2.51634 6.75 1.5 7.76634 1.5 9V11.25H0V12.75H1.5V15C1.5 16.2329 2.51544 17.25 3.75 17.25C4.01342 17.25 4.26327 17.1968 4.5 17.1123V18C4.5 19.2329 5.51544 20.25 6.75 20.25C7.3669 20.25 7.93454 19.9971 8.34082 19.5908C8.7471 19.1845 9 18.6169 9 18V12.75H15V18C15 18.6169 15.2529 19.1845 15.6592 19.5908C16.0655 19.9971 16.6331 20.25 17.25 20.25C18.4846 20.25 19.5 19.2329 19.5 18V17.1123C19.7367 17.1968 19.9866 17.25 20.25 17.25C21.4846 17.25 22.5 16.2329 22.5 15V12.75H24V11.25H22.5V9C22.5 7.76634 21.4837 6.75 20.25 6.75C19.9863 6.75 19.7359 6.80564 19.5 6.89062V6C19.5 4.76634 18.4837 3.75 17.25 3.75C16.0154 3.75 15 4.76711 15 6V11.25H9V6C9 4.76711 7.98456 3.75 6.75 3.75ZM6.75 5.25C7.17444 5.25 7.5 5.57689 7.5 6V18C7.5 18.2111 7.41699 18.3936 7.28027 18.5303C7.14355 18.667 6.9611 18.75 6.75 18.75C6.32556 18.75 6 18.4231 6 18V6C6 5.57466 6.32466 5.25 6.75 5.25ZM17.25 5.25C17.6753 5.25 18 5.57466 18 6V9V11.4785V15V18C18 18.4231 17.6744 18.75 17.25 18.75C17.0389 18.75 16.8564 18.667 16.7197 18.5303C16.583 18.3936 16.5 18.2111 16.5 18V6C16.5 5.57689 16.8256 5.25 17.25 5.25ZM3.75 8.25C4.17444 8.25 4.5 8.57689 4.5 9V11.4785V15C4.5 15.2111 4.41699 15.3936 4.28027 15.5303C4.14355 15.667 3.9611 15.75 3.75 15.75C3.32556 15.75 3 15.4231 3 15V9C3 8.57466 3.32466 8.25 3.75 8.25ZM20.25 8.25C20.6753 8.25 21 8.57466 21 9V15C21 15.4231 20.6744 15.75 20.25 15.75C20.0389 15.75 19.8564 15.667 19.7197 15.5303C19.583 15.3936 19.5 15.2111 19.5 15V9C19.5 8.57689 19.8256 8.25 20.25 8.25Z"
      fill={fill}
    />
  </svg>
);
