import { useEffect, useRef } from 'react';
import { useWindowSize } from '@hooks/useWindowResize';

const FONT_SIZE_REG_EXP = /(\d+\.?\d+)(\S+)/;

const isOverflowing = (
  el: HTMLElement,
  container: HTMLElement | null,
): boolean => el.scrollWidth > Number(container?.clientWidth);

const resize = (el: HTMLElement, step: number) => {
  const fontSize = window.getComputedStyle(el).fontSize;
  const matchResults = fontSize.match(FONT_SIZE_REG_EXP);

  if (matchResults) {
    const [, fsValue, fsUnit] = matchResults;
    el.style.fontSize = `${Number(fsValue) - step}${fsUnit}`;
  }
};

/**
 * The hook does N attempts to decrease the font size
 * if its text content doesn't fit its parent's width.
 * If the text still overflows, it sets the `word-break` css rule.
 * The hook doesn't enlarge the font size if the parent's
 * width becomes wider.
 * */
export const useTextSizeDecrease = (maxAttempts = 5, step = 1) => {
  const textContainerRef = useRef<HTMLElement>(null);
  const attemptsRef = useRef<number>(0);
  const { width } = useWindowSize();

  const checkAndResize = () => {
    if (textContainerRef.current == null) {
      return;
    }

    const node = textContainerRef.current;
    const parentNode = node.parentNode as unknown as HTMLElement;

    let isLarger = isOverflowing(node, parentNode);

    while (attemptsRef.current < maxAttempts && isLarger) {
      resize(node, step);
      isLarger = isOverflowing(node, parentNode);
      ++attemptsRef.current;
    }

    if (isLarger) {
      node.style.wordBreak = 'break-all';
    }
  };

  useEffect(() => {
    checkAndResize();
  }, [textContainerRef, width]);

  return textContainerRef;
};
