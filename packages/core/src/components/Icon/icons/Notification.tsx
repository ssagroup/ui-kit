import { SVGProps } from '@components/Icon/types';

export const Notification = ({
  fill = '#000',
  size = 24,
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 20 22"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>Notification</title>
    <path
      d="M0.776752 7.36345C0.819992 7.37426 0.865032 7.37966 0.908271 7.37966C1.14969 7.37966 1.37129 7.21572 1.43255 6.97069C1.9334 4.96728 3.12608 3.19267 4.78899 1.97837C5.0304 1.80181 5.08265 1.46491 4.90609 1.22349C4.72953 0.98207 4.39263 0.929823 4.15121 1.10638C2.28472 2.47022 0.946106 4.45922 0.383997 6.70946C0.31013 6.99772 0.48669 7.29138 0.776752 7.36345ZM15.2114 1.97837C16.8743 3.19267 18.0652 4.96548 18.5679 6.97069C18.6291 7.21572 18.8489 7.37966 19.0921 7.37966C19.1354 7.37966 19.1804 7.37426 19.2237 7.36345C19.5137 7.29138 19.6885 6.99772 19.6164 6.70765C19.0543 4.45922 17.7157 2.46842 15.8492 1.10458C15.6078 0.928021 15.2709 0.980269 15.0943 1.22169C14.9178 1.46491 14.97 1.80181 15.2114 1.97837ZM1.92799 15.3879C1.75144 16.0924 1.90638 16.8256 2.35498 17.3967C2.80179 17.9697 3.4756 18.2976 4.20165 18.2976H6.80681C7.06445 19.8289 8.39765 21 10.0011 21C11.6046 21 12.936 19.8289 13.1954 18.2976H15.8006C16.5266 18.2976 17.2004 17.9697 17.6472 17.3967C18.094 16.8238 18.249 16.0924 18.0742 15.3879L16.1194 7.58325C15.4168 4.7691 12.8999 2.80352 9.9993 2.80352C7.09868 2.80352 4.5818 4.7691 3.87916 7.58325L1.92799 15.3879ZM9.9993 19.919C8.99399 19.919 8.14903 19.229 7.90761 18.2976H12.0892C11.8496 19.229 11.0046 19.919 9.9993 19.919ZM9.9993 3.8845C12.4027 3.8845 14.489 5.51317 15.0709 7.84448L17.0221 15.6492C17.1176 16.0293 17.0329 16.4221 16.7933 16.7319C16.5518 17.04 16.1897 17.2166 15.7988 17.2166H4.19985C3.8089 17.2166 3.44677 17.04 3.20535 16.7319C2.96393 16.4239 2.88106 16.0293 2.97654 15.6492L4.92771 7.84448C5.50964 5.51317 7.59593 3.8845 9.9993 3.8845Z"
      fill={fill}
      stroke={fill}
      strokeWidth="0.3"
    />
  </svg>
);
