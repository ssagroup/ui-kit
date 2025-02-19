import { path } from '@ssa-ui-kit/utils';
import { IconProps, MapIconsType, SVGProps } from '../types';
import * as Icons from './all';
import { iconsList } from './iconsList';

type IconResultType = ({
  fill,
  size,
  ...props
}: SVGProps) => React.ReactElement;

const componentsList = (Object.keys(Icons) as Array<keyof typeof Icons>).map(
  (keyName) => path<typeof Icons, IconResultType>([keyName, keyName])(Icons),
);

const iconsMap: MapIconsType = iconsList.reduce((res, name, index) => {
  res[name] = componentsList[index];
  return res;
}, {} as MapIconsType);

const IconMapComponent = ({ name, color, ...props }: IconProps) => {
  const Component = iconsMap[name];

  if (Component == null) {
    return null;
  }

  return <Component fill={color} {...props} />;
};
export default IconMapComponent;
