export enum SUGGEST_ITEM_TYPES {
  user = 'user',
  company = 'company',
}

export interface SuggestItem {
  type: SUGGEST_ITEM_TYPES;
  alias: string;
  name?: string;
  avatar?: string;
}

export interface SuggestDropdownItem {
  id: string;
  item: SuggestItem;
}

export interface SuggestResponce {
  data: SuggestItem[];
}
