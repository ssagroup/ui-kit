export interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'caption';
  weight?: 'lighter' | 'regular' | 'medium' | 'bold';
  gutter?: boolean;
  color?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  ref?: React.Ref<HTMLElement>;
  id?: string;
}
