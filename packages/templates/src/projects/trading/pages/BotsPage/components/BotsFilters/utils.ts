import { EnumsList, EnumsApiListResponse } from '@trading/types';
import { FiltersData } from './types';
import { SearchType } from '../../types';

export type ApiKeyToTitle = Array<{
  title: string;
  botsApiKey: string;
  selectedItems?: string[];
}>;

export const API_KEY_TO_TITLE: ApiKeyToTitle = [
  {
    title: 'Exchange',
    botsApiKey: 'platform',
  },
  {
    title: 'Strategy',
    botsApiKey: 'strategy',
  },
  {
    title: 'Status',
    botsApiKey: 'status',
  },
  {
    title: 'Pair',
    botsApiKey: 'instrument',
  },
];

export const makeFilters = (
  apiKeyToTitle: ApiKeyToTitle,
  data: EnumsApiListResponse['result'],
  keyPostfix: SearchType[0] = '',
) => {
  const filters: FiltersData = {};
  apiKeyToTitle.forEach(({ title, selectedItems = [], botsApiKey }) => {
    filters[botsApiKey] = {
      id: botsApiKey,
      title,
      isOpened: false,
      ariaControls: `${botsApiKey}-panel`,
      selectedItems,
      items: {},
    };
    data[botsApiKey as EnumsList]?.forEach(({ key, localizedName }) => {
      filters[botsApiKey].items[key] = {
        key: `${botsApiKey}-${key}${keyPostfix}`,
        name: key.toString(),
        content: {
          statePath: [botsApiKey, 'items', key],
          text: localizedName,
        },
      };
    });
  });
  return filters;
};
