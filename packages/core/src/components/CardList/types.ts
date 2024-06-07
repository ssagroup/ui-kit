export type Item = {
  id: string | number;
  [prop: string | number | symbol]: unknown;
};

export interface CardListProps<ItemType extends Item> {
  title: string;
  items: Array<ItemType>;
  renderItem: (item: ItemType) => React.ReactNode;
}
