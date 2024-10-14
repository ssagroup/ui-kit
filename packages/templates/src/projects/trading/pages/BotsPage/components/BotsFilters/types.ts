export type FiltersData = Record<
  string,
  {
    id: string;
    title: string;
    isOpened: boolean;
    ariaControls: string;
    selectedItems: string[];
    items: Record<
      string,
      {
        key: string;
        name: string;
        content: {
          statePath: string[];
          text: string;
        };
      }
    >;
  }
>;

export type BotsFiltersProps = {
  handleFiltersSubmit: (data: Record<string, string[]>) => void;
  handleFiltersClear: () => void;
  setSearchTerm: (searchTerm: string) => void;
  searchTerm?: string | null;
  filterItems: FiltersData;
  updatedCheckboxData?: FiltersData;
};
