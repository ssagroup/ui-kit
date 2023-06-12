export interface IconProps {
  name: keyof IMapIcons;
  color?: string;
  size?: number;
}
export interface IMapIcons {
  diet: React.ElementType;
  calendar: React.ElementType;
  home: React.ElementType;
  stats: React.ElementType;
  sleep: React.ElementType;
  trainings: React.ElementType;
  measurements: React.ElementType;
  settings: React.ElementType;
  plus: React.ElementType;
  minus: React.ElementType;
  check: React.ElementType;
  cross: React.ElementType;
  more: React.ElementType;
  user: React.ElementType;
  union: React.ElementType;
  notification: React.ElementType;
  visible: React.ElementType;
  invisible: React.ElementType;
  ['carrot-down']: React.ElementType;
  ['carrot-up']: React.ElementType;
  ['carrot-left']: React.ElementType;
  ['carrot-right']: React.ElementType;
  ['radio-on']: React.ElementType;
  circle: React.ElementType;
  ['arrow-up']: React.ElementType;
  ['arrow-down']: React.ElementType;
}

export interface SVGProps {
  fill?: string;
  size?: number;
}
