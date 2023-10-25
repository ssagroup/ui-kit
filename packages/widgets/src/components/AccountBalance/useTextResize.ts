import { useEffect, useRef } from 'react';

const isOverflowing = (
  el: HTMLElement,
  container: HTMLElement | null,
): boolean => el.scrollWidth > Number(container?.clientWidth);

const resize = (el: HTMLElement) => {
  const fontSize = window.getComputedStyle(el).fontSize;
  const matchResults = fontSize.match(/(\d+)(\S+)/);

  if (matchResults) {
    const [, fsValue, fsUnit] = matchResults;
    el.style.fontSize = `${Number(fsValue) - 1}${fsUnit}`;
  }
};

export const useTextResize = (maxAttempts = 5) => {
  const textContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (textContainerRef.current != null) {
      const node = textContainerRef.current;
      const parentNode = node.parentNode as unknown as HTMLElement;

      let isLarger = isOverflowing(node, parentNode);
      let attempts = 0;

      while (attempts < maxAttempts && isLarger) {
        resize(node);
        isLarger = isOverflowing(node, parentNode);
        ++attempts;
      }

      if (isLarger) {
        node.style.wordBreak = 'break-all';
      }
    }
  }, [textContainerRef]);

  return textContainerRef;
};
