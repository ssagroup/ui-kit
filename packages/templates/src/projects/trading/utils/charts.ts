// The number of X-axis labels that can be displayed without
// overlapping each other
const MAX_X_AXIS_LABELS = 8;
const MAX_X_AXIS_LENGTH_VALUE = 30;

const getFilterFn = (data: Array<unknown>) => {
  /*
   * When we have up to 16 items in the data array, using a "2" as the
   * divider will give us up to 8 labels on the X axis, which is
   * <= MAX_X_AXIS_LABELS and, therefore, can be displayed without labels
   * overlapping each other.
   * */
  const divider =
    data.length > MAX_X_AXIS_LABELS * 2
      ? data.length > MAX_X_AXIS_LENGTH_VALUE
        ? 6
        : 5
      : 3;

  return (_: unknown, i: number) =>
    i === 0 || i === data.length - 1 || i % divider === 0;
};

export const getLabelsToShow = <D extends object>(data: D[], key: keyof D) => {
  return (
    data.length <= MAX_X_AXIS_LABELS ? data : data.filter(getFilterFn(data))
  ).map((item) => item[key]);
};

export const calculateChartMargin = <D extends object>(
  data: D[],
  item: keyof D,
) => {
  const itemsLengthArr: number[] = [];
  data.forEach((dataItem) => {
    const itemString = `${dataItem[item]}`;
    itemsLengthArr.push(itemString.length);
  });
  const result = Math.max(...itemsLengthArr);

  return result * 3;
};

const getTextWidth = (
  text: string,
  font: string,
  context: CanvasRenderingContext2D | null,
) => {
  (context as CanvasRenderingContext2D).font =
    font || getComputedStyle(document.body).font;

  return (context as CanvasRenderingContext2D).measureText(text).width;
};

export const calculateChartMarginWithCanvas = <D extends object>({
  data,
  item,
  font,
  processFunction,
}: {
  data: D[];
  item: keyof D;
  font: string;
  processFunction?: (value: string) => string;
}) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const itemsLengthArr: number[] = [];
  data.forEach((dataItem) => {
    const itemString = `${dataItem[item]}`;
    itemsLengthArr.push(
      processFunction
        ? getTextWidth(processFunction(itemString), font, context)
        : getTextWidth(itemString, font, context),
    );
  });
  const result = Math.max(...itemsLengthArr);

  return result;
};

export const getExtendedInfo = (data: Array<number | null>) => {
  const notNullable = data.filter((value): value is number => value !== null);
  return {
    original: data,
    notNullable,
    min: Math.min(...notNullable),
    max: Math.max(...notNullable),
    get diff() {
      return this.max - this.min;
    },
    get step() {
      return this.diff * 0.1;
    },
    get minWithStep() {
      const result = this.min - this.step;
      return result >= 0 ? result : this.min / 2;
    },
    get maxWithStep() {
      return this.max + this.step;
    },
  };
};
