import { SVGProps } from '@components/Icon/types';

export const Filter = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 21 20"
    fill="none"
    {...props}>
    <title>Filter</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0189 10.0002C16.8598 10.0002 18.3522 8.50775 18.3522 6.66683C18.3522 4.82588 16.8598 3.3335 15.0189 3.3335C13.4657 3.3335 12.1606 4.3958 11.7905 5.8335H2.51888C2.05865 5.8335 1.68555 6.2066 1.68555 6.66683C1.68555 7.12707 2.05865 7.50016 2.51888 7.50016H11.7905C12.1606 8.93783 13.4657 10.0002 15.0189 10.0002ZM13.3522 6.66683C13.3522 7.5873 14.0984 8.3335 15.0189 8.3335C15.9394 8.3335 16.6855 7.5873 16.6855 6.66683C16.6855 5.74635 15.9394 5.00016 15.0189 5.00016C14.0984 5.00016 13.3522 5.74635 13.3522 6.66683ZM1.68555 13.3335C1.68555 11.4926 3.17793 10.0002 5.01888 10.0002C6.57208 10.0002 7.87716 11.0625 8.2472 12.5002H17.5189C17.9791 12.5002 18.3522 12.8732 18.3522 13.3335C18.3522 13.7937 17.9791 14.1668 17.5189 14.1668H8.2472C7.87716 15.6045 6.57208 16.6668 5.01888 16.6668C3.17793 16.6668 1.68555 15.1744 1.68555 13.3335ZM6.68555 13.3335C6.68555 12.413 5.93936 11.6668 5.01888 11.6668C4.09841 11.6668 3.35221 12.413 3.35221 13.3335C3.35221 14.254 4.09841 15.0002 5.01888 15.0002C5.93936 15.0002 6.68555 14.254 6.68555 13.3335Z"
      fill={fill}
    />
  </svg>
);
