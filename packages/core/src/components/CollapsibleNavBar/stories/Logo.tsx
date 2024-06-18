import ResponsiveImage from '@components/ResponsiveImage';
import * as S from './styles';

export const Logo = () => (
  <ResponsiveImage
    css={S.ResponsiveLogo}
    srcSet="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FCTP_Large_Left.png?alt=media&token=b6fe7ab8-fd0b-475f-bb08-360311f27693 69w, https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FCTP_Medium_Left.png?alt=media&token=a1aeba69-7c07-40c9-aeac-c2477640870d 55w"
    sizes="(min-width: 900px) 55px, (min-width: 1440px) 69px"
    src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FCTP_Small_Left.png?alt=media&token=bff7149e-3b90-4657-8a11-040e83990e6f"
    alt="SSA CTP logo"
  />
);
