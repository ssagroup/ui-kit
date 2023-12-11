import { IconProps, IMapIcons } from '../types';

import { Calendar } from './Calendar';
import { Diet } from './Diet';
import { Home } from './Home';
import { Measurements } from './Measurements';
import { Settings } from './Settings';
import { Sleep } from './Sleep';
import { Stats } from './Stats';
import { Trainings } from './Trainings';

import { Plus } from './Plus';
import { Minus } from './Minus';
import { Cross } from './Cross';
import { Check } from './Check';
import { CheckCircle } from './CheckCircle';
import { More } from './More';
import { MoreVertical } from './MoreVertical';
import { Notification } from './Notification';
import { User } from './User';
import { Union } from './Union';
import { Visible } from './Visible';
import { Invisible } from './Invisible';
import { LogIn } from './LogIn';
import { LogOut } from './LogOut';
import { Email } from './Email';
import { Lock } from './Lock';
import { Information } from './Information';
import { Warning } from './Warning';
import { Attention } from './Attention';

import { CarrotDown } from './CarrotDown';
import { CarrotUp } from './CarrotUp';
import { CarrotLeft } from './CarrotLeft';
import { CarrotRight } from './CarrotRight';

import { RadioOn } from './RadioOn';
import { Circle } from './Circle';

import { ArrowUp } from './ArrowUp';
import { ArrowDown } from './ArrowDown';

import { iconsList } from './iconsList';
import { Filter } from './Filter';
import { Search } from './Search';
import { Archive } from './Archive';
import { Bin } from './Bin';
import { Change } from './Change';
import { Copy } from './Copy';
import { Robot } from './Robot';
import { Chart } from './Chart';
import { Clock } from './Clock';

const componentsList = [
  Diet,
  Calendar,
  Home,
  Stats,
  Sleep,
  Trainings,
  Measurements,
  Settings,
  Plus,
  Minus,
  More,
  MoreVertical,
  Check,
  CheckCircle,
  Cross,
  User,
  Union,
  Notification,
  Information,
  Warning,
  Attention,
  Visible,
  Invisible,
  LogOut,
  LogIn,
  Email,
  Lock,
  CarrotDown,
  CarrotUp,
  CarrotLeft,
  CarrotRight,
  RadioOn,
  Circle,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  Archive,
  Bin,
  Change,
  Copy,
  Robot,
  Chart,
  Clock,
];

const iconsMap: IMapIcons = iconsList.reduce((res, name, index) => {
  res[name] = componentsList[index];
  return res;
}, {} as IMapIcons);

const IconMapComponent = ({ name, color, ...props }: IconProps) => {
  const Component = iconsMap[name];

  if (Component == null) {
    return null;
  }

  return <Component fill={color} {...props} />;
};
export default IconMapComponent;
