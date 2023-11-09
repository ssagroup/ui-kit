import { SVGProps } from '@components/Icon/types';

export const Chart = ({ fill = '#000', size = 15 }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 22 22"
    fill="none">
    <title>Chart</title>
    <g clipPath="url(#clip0_2353_10249)">
      <path
        d="M15.9118 19.3153L15.9119 19.3152C16.1279 19.1374 16.1629 18.8202 15.9915 18.5992L15.9914 18.5991L10.2667 11.2396V2.24969C10.2667 1.96446 10.0352 1.73301 9.75 1.73301C4.8614 1.73301 0.9 6.08572 0.9 11.4163C0.9 16.7557 5.24395 21.0997 10.5833 21.0997C11.771 21.0997 12.6938 20.9922 13.526 20.7137C14.359 20.4349 15.0948 19.987 15.9118 19.3153ZM10.5833 20.0664C5.81355 20.0664 1.93332 16.1861 1.93332 11.4164C1.93332 6.83058 5.17123 3.0801 9.23332 2.78478V11.4164C9.23332 11.531 9.27152 11.6427 9.34279 11.7337C9.34284 11.7338 9.3429 11.7338 9.34295 11.7339L14.8604 18.8277C14.2411 19.2904 13.6698 19.5955 13.0225 19.7874C12.346 19.9879 11.5811 20.0664 10.5833 20.0664Z"
        fill={fill}
        stroke={fill}
        strokeWidth="0.2"
      />
      <path
        d="M11.4167 11.1H20.5834C20.8686 11.1 21.1 10.8685 21.1 10.5833C21.1 5.24395 16.756 0.9 11.4167 0.9C11.1315 0.9 10.9 1.13145 10.9 1.41668V10.5834C10.9 10.8686 11.1315 11.1 11.4167 11.1ZM11.9333 10.0666V1.94877C16.2925 2.20673 19.7933 5.70751 20.0512 10.0666H11.9333Z"
        fill={fill}
        stroke={fill}
        strokeWidth="0.2"
      />
      <path
        d="M18.0192 19.3336L18.0189 19.3339C17.9231 19.4225 17.7972 19.4721 17.6668 19.4721L18.0192 19.3336ZM18.0192 19.3336C19.9769 17.5072 21.1001 14.9258 21.1001 12.2497C21.1001 11.9645 20.8687 11.733 20.5835 11.733H12.2501M18.0192 19.3336L12.2501 11.733M12.2501 11.733C12.0517 11.733 11.8691 11.8475 11.7832 12.0274M12.2501 11.733L11.7832 12.0274M11.7832 12.0274C11.6974 12.2073 11.7232 12.4202 11.8482 12.5743M11.7832 12.0274L11.8482 12.5743M11.8482 12.5743C11.8483 12.5743 11.8483 12.5743 11.8483 12.5744M11.8482 12.5743L11.8483 12.5744M11.8483 12.5744L17.2645 19.2795C17.2645 19.2796 17.2646 19.2797 17.2647 19.2797C17.3549 19.3926 17.4872 19.4606 17.63 19.471C17.6298 19.471 17.6296 19.471 17.6295 19.471L11.8483 12.5744ZM20.0512 12.7664C19.9288 14.7847 19.0958 16.7118 17.7089 18.185L13.332 12.7664H20.0512Z"
        fill={fill}
        stroke={fill}
        strokeWidth="0.2"
      />
    </g>
    <defs>
      <clipPath id="clip0_2353_10249">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
