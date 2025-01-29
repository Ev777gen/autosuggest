import type { APIOptions } from "./api";

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

export interface SuggestOptions extends APIOptions {
  minCharacters?: number
}

export enum SUGGEST_STATES {
  initial = 'initial',
  opened = 'opened',
  selected = 'selected',
}

export interface SuggestNotification {
  state: SUGGEST_STATES;
  tags?: SuggestItem[];
}
