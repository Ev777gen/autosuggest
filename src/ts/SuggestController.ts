import { SuggestService } from "../api/SuggestService";
import type { SuggestItem, SuggestResponce } from "../types/suggest";

export class SuggestController {
  #suggestService: SuggestService

  constructor() {
    this.#suggestService = new SuggestService();
  }

  public async getSuggestions<T extends SuggestResponce>(query: string): Promise<SuggestItem[] | undefined> {
    const responce = await this.#suggestService.getSuggestions<T>(query);
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
