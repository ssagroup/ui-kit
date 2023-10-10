export const processElementsVisible = ({
  refsByKey,
  wrapperRef,
}: {
  refsByKey?: Record<string, HTMLElement | null>;
  wrapperRef?: React.RefObject<HTMLDivElement>;
}) => {
  refsByKey &&
    Object.values(refsByKey)
      .filter(Boolean)
      .map((element) => {
        if (element && wrapperRef && wrapperRef.current) {
          element.style.visibility =
            element.offsetLeft < wrapperRef.current.offsetLeft
              ? 'hidden'
              : 'visible';
        }
      });
};
