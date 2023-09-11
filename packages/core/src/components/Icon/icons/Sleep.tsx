import { SVGProps } from '@components/Icon/types';

export const Sleep = ({ fill = '#000', size = 24 }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Sleep</title>
    <path
      d="M6.00833 2.0001C5.86499 2.002 5.7252 2.04501 5.60557 2.12402C4.00925 3.14394 2.65193 4.502 1.63258 6.0992C1.57541 6.18206 1.53552 6.2756 1.51529 6.37424C1.49506 6.47287 1.4949 6.57457 1.51482 6.67327C1.53474 6.77196 1.57434 6.86563 1.63124 6.94868C1.68814 7.03172 1.76119 7.10245 1.84601 7.15662C1.93084 7.2108 2.0257 7.24732 2.12495 7.264C2.22419 7.28068 2.32577 7.27718 2.42363 7.25371C2.52149 7.23024 2.61363 7.18728 2.69453 7.12739C2.77543 7.06751 2.84343 6.99192 2.89449 6.90516C3.79647 5.49188 4.99859 4.2891 6.41109 3.38663C6.55019 3.30043 6.65725 3.17103 6.71591 3.01821C6.77458 2.86538 6.78161 2.69754 6.73595 2.54034C6.69028 2.38314 6.59443 2.24522 6.46304 2.14766C6.33164 2.05011 6.17194 1.99828 6.00833 2.0001ZM17.9692 2.0001C17.8075 2.00312 17.6512 2.05841 17.5235 2.15772C17.3958 2.25703 17.3037 2.39502 17.2609 2.55107C17.2181 2.70711 17.2269 2.87282 17.286 3.02343C17.3451 3.17404 17.4514 3.30146 17.5889 3.38663C19.0014 4.2891 20.2035 5.49188 21.1055 6.90516C21.1566 6.99192 21.2246 7.06751 21.3055 7.12739C21.3864 7.18727 21.4785 7.23024 21.5764 7.25371C21.6742 7.27718 21.7758 7.28068 21.8751 7.26399C21.9743 7.24731 22.0692 7.2108 22.154 7.15662C22.2388 7.10244 22.3119 7.03172 22.3688 6.94868C22.4257 6.86563 22.4653 6.77196 22.4852 6.67327C22.5051 6.57457 22.5049 6.47287 22.4847 6.37424C22.4645 6.2756 22.4246 6.18206 22.3674 6.0992C21.3481 4.502 19.9907 3.14394 18.3944 2.12402C18.2684 2.04078 18.1202 1.99759 17.9692 2.0001ZM12 3.00512C6.76945 3.00512 2.51319 7.26371 2.51319 12.4971C2.51319 15.3532 3.80753 17.8881 5.80939 19.6298L4.72983 20.71C4.65795 20.779 4.60057 20.8617 4.56104 20.9532C4.5215 21.0448 4.50062 21.1432 4.49961 21.2429C4.49859 21.3426 4.51747 21.4415 4.55514 21.5338C4.5928 21.6261 4.6485 21.71 4.71896 21.7805C4.78942 21.851 4.87323 21.9067 4.96548 21.9444C5.05773 21.9821 5.15658 22.001 5.25622 22C5.35586 21.9989 5.4543 21.9781 5.54576 21.9385C5.63723 21.8989 5.71989 21.8415 5.78891 21.7696L7.01864 20.5392C8.47058 21.4429 10.168 21.9892 12 21.9892C13.832 21.9892 15.5294 21.4429 16.9814 20.5392L18.2111 21.7696C18.2801 21.8415 18.3628 21.8989 18.4542 21.9385C18.5457 21.9781 18.6441 21.9989 18.7438 22C18.8434 22.001 18.9423 21.9821 19.0345 21.9444C19.1268 21.9067 19.2106 21.851 19.281 21.7805C19.3515 21.71 19.4072 21.6261 19.4449 21.5338C19.4825 21.4415 19.5014 21.3426 19.5004 21.2429C19.4994 21.1432 19.4785 21.0448 19.439 20.9532C19.3994 20.8617 19.342 20.779 19.2702 20.71L18.1906 19.6298C20.1925 17.8881 21.4868 15.3532 21.4868 12.4971C21.4868 7.26371 17.2306 3.00512 12 3.00512ZM12 4.50386C16.421 4.50386 19.9889 8.07369 19.9889 12.4971C19.9889 16.9206 16.421 20.4904 12 20.4904C7.57898 20.4904 4.01111 16.9206 4.01111 12.4971C4.01111 8.07369 7.57898 4.50386 12 4.50386ZM10.8 13.3439L10.7992 7.7003C10.7992 7.3137 11.1125 7.00025 11.4991 7.0002C11.8857 7.00014 12.1992 7.31349 12.1992 7.70009L12.1999 12.6035L17.3302 11.3209C17.7053 11.2271 18.0853 11.4552 18.1791 11.8302C18.2729 12.2053 18.0448 12.5853 17.6698 12.6791L11.6698 14.1791C11.2947 14.2729 10.9147 14.0448 10.8209 13.6698C10.8 13.586 10.7951 13.5021 10.8043 13.4211C10.8015 13.3957 10.8001 13.37 10.8 13.3439Z"
      fill={fill}
    />
    <path
      d="M5.60557 2.12402L5.63249 2.16616L5.63313 2.16574L5.60557 2.12402ZM6.00833 2.0001L6.00777 1.95011L6.00767 1.95011L6.00833 2.0001ZM1.63258 6.0992L1.67376 6.1276L1.67472 6.12609L1.63258 6.0992ZM1.51529 6.37424L1.46631 6.36419L1.51529 6.37424ZM1.51482 6.67327L1.56383 6.66337H1.56383L1.51482 6.67327ZM1.63124 6.94868L1.58999 6.97694H1.58999L1.63124 6.94868ZM2.12495 7.264L2.13323 7.21469H2.13323L2.12495 7.264ZM2.42363 7.25371L2.43529 7.30233H2.4353L2.42363 7.25371ZM2.69453 7.12739L2.66478 7.0872H2.66478L2.69453 7.12739ZM2.89449 6.90516L2.85232 6.87824L2.8514 6.8798L2.89449 6.90516ZM6.41109 3.38663L6.38475 3.34413L6.38417 3.3445L6.41109 3.38663ZM6.71591 3.01821L6.76259 3.03612L6.71591 3.01821ZM6.73595 2.54034L6.78396 2.52639V2.52639L6.73595 2.54034ZM6.46304 2.14766L6.43323 2.18781V2.18781L6.46304 2.14766ZM17.5235 2.15772L17.5542 2.19719L17.5235 2.15772ZM17.9692 2.0001L17.9684 1.95011L17.9683 1.95011L17.9692 2.0001ZM17.2609 2.55107L17.2126 2.53784V2.53784L17.2609 2.55107ZM17.5889 3.38663L17.6158 3.34449L17.6152 3.34413L17.5889 3.38663ZM21.1055 6.90516L21.1486 6.87978L21.1477 6.87826L21.1055 6.90516ZM21.3055 7.12739L21.3352 7.0872L21.3055 7.12739ZM21.5764 7.25371L21.588 7.20508L21.5764 7.25371ZM21.8751 7.26399L21.8668 7.21469L21.8751 7.26399ZM22.154 7.15662L22.1809 7.19876V7.19876L22.154 7.15662ZM22.3688 6.94868L22.3275 6.92041V6.92041L22.3688 6.94868ZM22.4852 6.67327L22.4362 6.66337V6.66337L22.4852 6.67327ZM22.3674 6.0992L22.3253 6.12611L22.3263 6.12759L22.3674 6.0992ZM18.3944 2.12402L18.3669 2.16575L18.3675 2.16616L18.3944 2.12402ZM5.80939 19.6298L5.84475 19.6652L5.88263 19.6273L5.84221 19.5921L5.80939 19.6298ZM4.72983 20.71L4.76448 20.746L4.7652 20.7453L4.72983 20.71ZM4.56104 20.9532L4.60694 20.9731L4.56104 20.9532ZM4.55514 21.5338L4.60143 21.5149L4.55514 21.5338ZM4.71896 21.7805L4.68359 21.8158L4.71896 21.7805ZM4.96548 21.9444L4.94657 21.9907H4.94657L4.96548 21.9444ZM5.25622 22L5.25571 21.95H5.25571L5.25622 22ZM5.54576 21.9385L5.52592 21.8926H5.52592L5.54576 21.9385ZM5.78891 21.7696L5.75354 21.7343L5.75283 21.735L5.78891 21.7696ZM7.01864 20.5392L7.04507 20.4967L7.01135 20.4758L6.98328 20.5039L7.01864 20.5392ZM16.9814 20.5392L17.0167 20.5039L16.9886 20.4758L16.9549 20.4967L16.9814 20.5392ZM18.2111 21.7696L18.2472 21.735L18.2465 21.7343L18.2111 21.7696ZM18.4542 21.9385L18.4741 21.8926L18.4542 21.9385ZM18.7438 22L18.7433 22.05L18.7438 22ZM19.0345 21.9444L19.0534 21.9907H19.0534L19.0345 21.9444ZM19.281 21.7805L19.3164 21.8158L19.281 21.7805ZM19.439 20.9532L19.3931 20.9731L19.439 20.9532ZM19.2702 20.71L19.2348 20.7453L19.2355 20.746L19.2702 20.71ZM18.1906 19.6298L18.1578 19.5921L18.1174 19.6273L18.1552 19.6652L18.1906 19.6298ZM10.7992 7.7003L10.8492 7.70029V7.70029L10.7992 7.7003ZM10.8 13.3439L10.85 13.3438L10.8 13.3439ZM11.4991 7.0002L11.4991 7.0502L11.4991 7.0002ZM12.1992 7.70009L12.1492 7.7001L12.1992 7.70009ZM12.1999 12.6035L12.1499 12.6035L12.1499 12.6675L12.2121 12.652L12.1999 12.6035ZM17.3302 11.3209L17.3181 11.2724L17.3302 11.3209ZM18.1791 11.8302L18.2276 11.8181L18.1791 11.8302ZM11.6698 14.1791L11.6819 14.2276H11.6819L11.6698 14.1791ZM10.8209 13.6698L10.8694 13.6576L10.8209 13.6698ZM10.8043 13.4211L10.8552 13.4269L10.854 13.4156L10.8043 13.4211ZM5.63313 2.16574C5.74477 2.092 5.87523 2.05187 6.00899 2.0501L6.00767 1.95011C5.85476 1.95213 5.70564 1.99801 5.57801 2.0823L5.63313 2.16574ZM1.67472 6.12609C2.69017 4.53503 4.0423 3.18216 5.63249 2.16616L5.57865 2.08189C3.97621 3.10571 2.61369 4.46898 1.59043 6.0723L1.67472 6.12609ZM1.56427 6.38428C1.58316 6.29223 1.62038 6.20493 1.67373 6.12759L1.59142 6.0708C1.53044 6.1592 1.48789 6.25898 1.46631 6.36419L1.56427 6.38428ZM1.56383 6.66337C1.54524 6.57126 1.54539 6.47634 1.56427 6.38428L1.46631 6.36419C1.44473 6.4694 1.44456 6.57788 1.46581 6.68316L1.56383 6.66337ZM1.67249 6.92041C1.61938 6.84291 1.58243 6.75549 1.56383 6.66337L1.46581 6.68316C1.48706 6.78844 1.5293 6.88835 1.58999 6.97694L1.67249 6.92041ZM1.87293 7.11448C1.79376 7.06392 1.72559 6.99792 1.67249 6.92041L1.58999 6.97694C1.65069 7.06552 1.72861 7.14097 1.8191 7.19876L1.87293 7.11448ZM2.13323 7.21469C2.04062 7.19912 1.95209 7.16504 1.87293 7.11448L1.8191 7.19876C1.90959 7.25655 2.01079 7.29551 2.11666 7.3133L2.13323 7.21469ZM2.41197 7.20509C2.32065 7.22699 2.22585 7.23025 2.13323 7.21469L2.11666 7.3133C2.22253 7.3311 2.3309 7.32737 2.43529 7.30233L2.41197 7.20509ZM2.66478 7.0872C2.58928 7.14309 2.5033 7.18318 2.41197 7.20509L2.4353 7.30233C2.53969 7.27729 2.63797 7.23146 2.72427 7.16758L2.66478 7.0872ZM2.8514 6.8798C2.80375 6.96078 2.74028 7.03132 2.66478 7.0872L2.72427 7.16758C2.81057 7.1037 2.88312 7.02307 2.93759 6.93052L2.8514 6.8798ZM6.38417 3.3445C4.96554 4.25088 3.75823 5.45886 2.85235 6.87826L2.93664 6.93206C3.83471 5.5249 5.03163 4.32733 6.43801 3.42877L6.38417 3.3445ZM6.66923 3.00029C6.61448 3.14292 6.51456 3.26369 6.38475 3.34413L6.43743 3.42913C6.58581 3.33718 6.70002 3.19914 6.76259 3.03612L6.66923 3.00029ZM6.68793 2.55429C6.73055 2.70101 6.72399 2.85765 6.66923 3.00029L6.76259 3.03612C6.82517 2.87311 6.83267 2.69408 6.78396 2.52639L6.68793 2.55429ZM6.43323 2.18781C6.55585 2.27885 6.64531 2.40757 6.68793 2.55429L6.78396 2.52639C6.73525 2.3587 6.63301 2.21158 6.49284 2.10752L6.43323 2.18781ZM6.00889 2.0501C6.16157 2.0484 6.31061 2.09676 6.43323 2.18781L6.49284 2.10752C6.35268 2.00345 6.18231 1.94816 6.00777 1.95011L6.00889 2.0501ZM17.5542 2.19719C17.6733 2.10451 17.8193 2.05291 17.9702 2.0501L17.9683 1.95011C17.7958 1.95333 17.629 2.01231 17.4928 2.11825L17.5542 2.19719ZM17.3091 2.56429C17.349 2.41865 17.435 2.28987 17.5542 2.19719L17.4928 2.11825C17.3566 2.22419 17.2583 2.37139 17.2126 2.53784L17.3091 2.56429ZM17.3326 3.00516C17.2774 2.86459 17.2691 2.70993 17.3091 2.56429L17.2126 2.53784C17.167 2.70429 17.1764 2.88105 17.2395 3.0417L17.3326 3.00516ZM17.6152 3.34413C17.4869 3.26464 17.3877 3.14572 17.3326 3.00516L17.2395 3.0417C17.3025 3.20236 17.4159 3.33828 17.5626 3.42914L17.6152 3.34413ZM21.1477 6.87826C20.2418 5.45886 19.0345 4.25088 17.6158 3.3445L17.562 3.42877C18.9684 4.32733 20.1653 5.5249 21.0634 6.93206L21.1477 6.87826ZM21.3352 7.0872C21.2597 7.03132 21.1963 6.96078 21.1486 6.8798L21.0624 6.93052C21.1169 7.02307 21.1894 7.1037 21.2757 7.16758L21.3352 7.0872ZM21.588 7.20508C21.4967 7.18318 21.4107 7.14309 21.3352 7.0872L21.2757 7.16758C21.362 7.23146 21.4603 7.27729 21.5647 7.30233L21.588 7.20508ZM21.8668 7.21469C21.7742 7.23025 21.6794 7.22699 21.588 7.20508L21.5647 7.30233C21.6691 7.32736 21.7775 7.3311 21.8833 7.3133L21.8668 7.21469ZM22.1271 7.11448C22.0479 7.16504 21.9594 7.19912 21.8668 7.21469L21.8833 7.3133C21.9892 7.29551 22.0904 7.25655 22.1809 7.19876L22.1271 7.11448ZM22.3275 6.92041C22.2744 6.99792 22.2062 7.06392 22.1271 7.11448L22.1809 7.19876C22.2714 7.14097 22.3493 7.06552 22.41 6.97694L22.3275 6.92041ZM22.4362 6.66337C22.4176 6.75549 22.3806 6.84291 22.3275 6.92041L22.41 6.97694C22.4707 6.88835 22.5129 6.78843 22.5342 6.68316L22.4362 6.66337ZM22.4357 6.38428C22.4546 6.47634 22.4548 6.57126 22.4362 6.66337L22.5342 6.68316C22.5554 6.57788 22.5553 6.4694 22.5337 6.36419L22.4357 6.38428ZM22.3263 6.12759C22.3796 6.20493 22.4168 6.29223 22.4357 6.38428L22.5337 6.36419C22.5121 6.25898 22.4696 6.1592 22.4086 6.0708L22.3263 6.12759ZM18.3675 2.16616C19.9577 3.18216 21.3098 4.53503 22.3253 6.12609L22.4096 6.0723C21.3863 4.46898 20.0238 3.10571 18.4214 2.08189L18.3675 2.16616ZM17.9701 2.0501C18.111 2.04775 18.2493 2.08806 18.3669 2.16574L18.422 2.0823C18.2876 1.99351 18.1295 1.94743 17.9684 1.95011L17.9701 2.0501ZM2.56319 12.4971C2.56319 7.2913 6.79709 3.05512 12 3.05512V2.95512C6.74181 2.95512 2.46319 7.23613 2.46319 12.4971H2.56319ZM5.84221 19.5921C3.85037 17.8591 2.56319 15.3376 2.56319 12.4971H2.46319C2.46319 15.3688 3.76469 17.9171 5.77657 19.6675L5.84221 19.5921ZM4.7652 20.7453L5.84475 19.6652L5.77402 19.5945L4.69447 20.6746L4.7652 20.7453ZM4.60694 20.9731C4.64383 20.8876 4.69739 20.8105 4.76447 20.746L4.69519 20.6739C4.61852 20.7476 4.55731 20.8358 4.51514 20.9334L4.60694 20.9731ZM4.5496 21.2434C4.55055 21.1504 4.57004 21.0585 4.60694 20.9731L4.51514 20.9334C4.47297 21.031 4.45069 21.1361 4.44961 21.2424L4.5496 21.2434ZM4.60143 21.5149C4.56628 21.4288 4.54866 21.3365 4.5496 21.2434L4.44961 21.2424C4.44853 21.3488 4.46867 21.4543 4.50884 21.5527L4.60143 21.5149ZM4.75432 21.7451C4.68856 21.6794 4.63658 21.6011 4.60143 21.5149L4.50884 21.5527C4.54902 21.6512 4.60843 21.7406 4.68359 21.8158L4.75432 21.7451ZM4.98439 21.8981C4.89829 21.8629 4.82008 21.8109 4.75432 21.7451L4.68359 21.8158C4.75875 21.891 4.84816 21.9505 4.94657 21.9907L4.98439 21.8981ZM5.25571 21.95C5.16272 21.9509 5.07048 21.9333 4.98439 21.8981L4.94657 21.9907C5.04499 22.0309 5.15043 22.051 5.25673 22.05L5.25571 21.95ZM5.52592 21.8926C5.44056 21.9295 5.34869 21.949 5.25571 21.95L5.25673 22.05C5.36302 22.0489 5.46803 22.0266 5.56561 21.9844L5.52592 21.8926ZM5.75283 21.735C5.68842 21.8021 5.61128 21.8557 5.52592 21.8926L5.56561 21.9844C5.66319 21.9422 5.75137 21.8809 5.82498 21.8042L5.75283 21.735ZM6.98328 20.5039L5.75354 21.7343L5.82427 21.805L7.05401 20.5745L6.98328 20.5039ZM12 21.9392C10.1782 21.9392 8.4898 21.396 7.04507 20.4967L6.99222 20.5816C8.45137 21.4899 10.1578 22.0392 12 22.0392V21.9392ZM16.9549 20.4967C15.5102 21.396 13.8218 21.9392 12 21.9392V22.0392C13.8422 22.0392 15.5486 21.4899 17.0078 20.5816L16.9549 20.4967ZM18.2465 21.7343L17.0167 20.5039L16.946 20.5745L18.1757 21.805L18.2465 21.7343ZM18.4741 21.8926C18.3887 21.8557 18.3116 21.8021 18.2472 21.735L18.175 21.8042C18.2486 21.8809 18.3368 21.9422 18.4344 21.9844L18.4741 21.8926ZM18.7443 21.95C18.6513 21.949 18.5594 21.9295 18.4741 21.8926L18.4344 21.9844C18.532 22.0266 18.637 22.0489 18.7433 22.05L18.7443 21.95ZM19.0156 21.8981C18.9295 21.9333 18.8373 21.9509 18.7443 21.95L18.7433 22.05C18.8496 22.051 18.955 22.0309 19.0534 21.9907L19.0156 21.8981ZM19.2457 21.7451C19.1799 21.8109 19.1017 21.8629 19.0156 21.8981L19.0534 21.9907C19.1518 21.9505 19.2412 21.891 19.3164 21.8158L19.2457 21.7451ZM19.3986 21.5149C19.3634 21.6011 19.3114 21.6794 19.2457 21.7451L19.3164 21.8158C19.3916 21.7406 19.451 21.6512 19.4912 21.5527L19.3986 21.5149ZM19.4504 21.2434C19.4513 21.3365 19.4337 21.4288 19.3986 21.5149L19.4912 21.5527C19.5313 21.4543 19.5515 21.3488 19.5504 21.2424L19.4504 21.2434ZM19.3931 20.9731C19.43 21.0585 19.4495 21.1504 19.4504 21.2434L19.5504 21.2424C19.5493 21.1361 19.527 21.031 19.4849 20.9334L19.3931 20.9731ZM19.2355 20.746C19.3026 20.8105 19.3562 20.8876 19.3931 20.9731L19.4849 20.9334C19.4427 20.8358 19.3815 20.7476 19.3048 20.6739L19.2355 20.746ZM18.1552 19.6652L19.2348 20.7453L19.3055 20.6746L18.226 19.5945L18.1552 19.6652ZM21.4368 12.4971C21.4368 15.3376 20.1496 17.8591 18.1578 19.5921L18.2234 19.6675C20.2353 17.9171 21.5368 15.3688 21.5368 12.4971H21.4368ZM12 3.05512C17.2029 3.05512 21.4368 7.2913 21.4368 12.4971H21.5368C21.5368 7.23613 17.2582 2.95512 12 2.95512V3.05512ZM20.0389 12.4971C20.0389 8.0461 16.4487 4.45386 12 4.45386V4.55386C16.3934 4.55386 19.9389 8.10128 19.9389 12.4971H20.0389ZM12 20.5404C16.4487 20.5404 20.0389 16.9482 20.0389 12.4971H19.9389C19.9389 16.893 16.3934 20.4404 12 20.4404V20.5404ZM3.96111 12.4971C3.96111 16.9482 7.55134 20.5404 12 20.5404V20.4404C7.60662 20.4404 4.06111 16.893 4.06111 12.4971H3.96111ZM12 4.45386C7.55134 4.45386 3.96111 8.0461 3.96111 12.4971H4.06111C4.06111 8.10128 7.60662 4.55386 12 4.55386V4.45386ZM10.7492 7.70031L10.75 13.3439L10.85 13.3438L10.8492 7.70029L10.7492 7.70031ZM11.4991 6.9502C11.0849 6.95026 10.7492 7.28609 10.7492 7.70031L10.8492 7.70029C10.8492 7.34131 11.1401 7.05025 11.4991 7.0502L11.4991 6.9502ZM12.2492 7.70009C12.2492 7.28587 11.9133 6.95013 11.4991 6.9502L11.4991 7.0502C11.8581 7.05014 12.1492 7.34111 12.1492 7.7001L12.2492 7.70009ZM12.2499 12.6035L12.2492 7.70009L12.1492 7.7001L12.1499 12.6035L12.2499 12.6035ZM12.2121 12.652L17.3424 11.3694L17.3181 11.2724L12.1878 12.555L12.2121 12.652ZM17.3424 11.3694C17.6906 11.2823 18.0435 11.4941 18.1306 11.8424L18.2276 11.8181C18.1271 11.4163 17.7199 11.1719 17.3181 11.2724L17.3424 11.3694ZM18.1306 11.8424C18.2177 12.1906 18.0059 12.5435 17.6576 12.6306L17.6819 12.7276C18.0837 12.6271 18.3281 12.2199 18.2276 11.8181L18.1306 11.8424ZM17.6576 12.6306L11.6576 14.1306L11.6819 14.2276L17.6819 12.7276L17.6576 12.6306ZM11.6576 14.1306C11.3094 14.2177 10.9565 14.0059 10.8694 13.6576L10.7724 13.6819C10.8729 14.0837 11.2801 14.3281 11.6819 14.2276L11.6576 14.1306ZM10.8694 13.6576C10.8499 13.5798 10.8454 13.5019 10.854 13.4267L10.7546 13.4154C10.7447 13.5023 10.75 13.5923 10.7724 13.6819L10.8694 13.6576ZM10.75 13.3439C10.7501 13.3718 10.7516 13.3994 10.7546 13.4265L10.854 13.4156C10.8514 13.3921 10.8501 13.3681 10.85 13.3438L10.75 13.3439Z"
      fill={fill}
    />
  </svg>
);
