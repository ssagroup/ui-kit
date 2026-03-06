export type HeaderContentRef = Element | DocumentFragment;
export interface HeaderContextContent {
  headerContentRef: React.RefObject<HeaderContentRef | null>;
  renderHeaderContent: (
    content: React.JSX.Element | null,
  ) => React.ReactPortal | null;
}
