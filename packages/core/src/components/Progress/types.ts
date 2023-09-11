export interface ProgressProps {
  children:
    | React.ReactElement<React.PropsWithChildren<{ vertical?: boolean }>>
    | React.ReactElement<React.PropsWithChildren<{ vertical?: boolean }>>[];
}
