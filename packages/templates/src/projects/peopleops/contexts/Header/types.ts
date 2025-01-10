export type HeaderContentRef = Element | DocumentFragment;
export interface HeaderContextContent {
  headerContentRef: React.RefObject<HeaderContentRef>;
  renderHeaderContent: (
    content: JSX.Element | null,
  ) => React.ReactPortal | null;
}
