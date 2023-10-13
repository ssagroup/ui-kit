export type ElementInfo = {
  name: string;
  element: React.MutableRefObject<HTMLElement | null>;
  visibility?: boolean;
};
