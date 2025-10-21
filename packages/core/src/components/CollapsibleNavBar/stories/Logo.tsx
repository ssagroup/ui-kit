import ResponsiveImage from '@components/ResponsiveImage';

import * as S from './styles';

export const Logo = () => (
  <ResponsiveImage
    css={S.ResponsiveLogo}
    srcSet="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Large_WhiteBG.svg?alt=media&token=7a13db1e-83b9-41cc-9381-ff569c7f77f7 69w, https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Medium_WhiteBG.svg?alt=media&token=1a538009-1970-4e19-97d5-16eb28981ad7 55w"
    sizes="(min-width: 900px) 55px, (min-width: 1440px) 69px"
    src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Small_WhiteBG.svg?alt=media&token=b3a57f8f-545f-494f-b046-76adfbc969b7"
    alt="SSA UI Kit"
  />
);

export const DarkLogo = () => (
  <ResponsiveImage
    css={S.ResponsiveLogo}
    srcSet="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Large_BlackBG.svg?alt=media&token=621a5341-f24b-438e-84eb-ad58f2104cae 69w, https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Medium_BlackBG.svg?alt=media&token=e19a8d8b-7622-47da-89fa-158628a54554 55w"
    sizes="(min-width: 900px) 55px, (min-width: 1440px) 69px"
    src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Small_BlackBG.svg?alt=media&token=0e5fd02b-4266-4fc6-beb1-9bac9d466fa6"
    alt="SSA UI Kit"
  />
);
