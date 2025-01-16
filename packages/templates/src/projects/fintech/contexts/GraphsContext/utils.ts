import { pathOr } from '@ssa-ui-kit/utils';
import { GraphsListItem } from '@fintech/types';

export const calculateRightLeftMargins = ({
  font,
  data,
  rightMarginPaths,
  leftMarginPaths,
}: {
  font: string;
  data: GraphsListItem[];
  rightMarginPaths: Array<Array<string>>;
  leftMarginPaths: Array<Array<string>>;
}) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  (context as CanvasRenderingContext2D).font =
    font || getComputedStyle(document.body).font;

  const rightMargins: number[] = [];
  const leftMargins: number[] = [];

  data.map((item) => {
    rightMarginPaths.forEach((marginPath) => {
      const value = pathOr<GraphsListItem, string>('0', marginPath)(item);
      const width = (context as CanvasRenderingContext2D).measureText(
        value,
      ).width;
      rightMargins.push(width);
    });
    leftMarginPaths.forEach((marginPath) => {
      const value = pathOr<GraphsListItem, string>('0', marginPath)(item);
      const width = (context as CanvasRenderingContext2D).measureText(
        value,
      ).width;
      leftMargins.push(width);
    });
  });
  const result = {
    rightMargin: Math.max(...rightMargins),
    leftMargin: Math.max(...leftMargins),
  };
  return result;
};
