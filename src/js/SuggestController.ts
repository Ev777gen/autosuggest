import { SuggestService } from "../api/SuggestService";
import type { SuggestItem, SuggestOptions, SuggestResponce } from "../types/suggest";

export class SuggestController {
  static #MIN_CHARACTERS = 3
  #suggestService: SuggestService
  #minCharacters?: number

  constructor(options?: SuggestOptions) {
    if (options?.minCharacters)
      this.#minCharacters = options.minCharacters;

    this.#suggestService = new SuggestService(options);
  }

  public async getSuggestions<T extends SuggestResponce>(query: string, apiURL?: string, minCharacters?: number): Promise<SuggestItem[] | undefined> {
    minCharacters = minCharacters || this.#minCharacters || SuggestController.#MIN_CHARACTERS;
    if (query.length < minCharacters)
      return;

    const responce = await this.#suggestService.getSuggestions<T>(query, apiURL);
    
    if (!responce)
      return [];

    return this.#extractData(responce);
  }

  #extractData(responce: SuggestResponce): SuggestItem[] {
    if (Array.isArray(responce))
      return responce;
    
    return responce.data;
  }
}

export const suggestController = new SuggestController();
