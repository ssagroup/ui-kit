import ResponsiveImage from '@components/ResponsiveImage';
import * as S from './styles';

export const Logo = () => (
  <ResponsiveImage
    css={S.ResponsiveLogo}
    srcSet="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Large_Left_WhiteBG.png?alt=media&token=b6f7850c-2f1d-421c-a26f-f1f1280d676c 69w, https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Medium_Left_WhiteBG.png?alt=media&token=27f3fcb9-c419-4e12-a18f-a16d362f54bf 55w"
    sizes="(min-width: 900px) 55px, (min-width: 1440px) 69px"
    src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Small_Left_WhiteBG.png?alt=media&token=c565fdb0-4ad9-42f5-8077-3249a5d727d8"
    alt="SSA UI Kit"
  />
);
