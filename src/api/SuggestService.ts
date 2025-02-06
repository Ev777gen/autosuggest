export class SuggestService {
  #apiURL = import.meta.env.ENV_AUTO_SUGGEST_SERVER_URL
  #abortController: AbortController | null = null

  constructor() {}

  private get _isPreviousRequestNotCompleted(): boolean {
    return Boolean(this.#abortController);
  }

  public async getSuggestions<T>(query: string): Promise<T | undefined> {
    if (this._isPreviousRequestNotCompleted)
      this.#abortController!.abort();

    this.#abortController = new AbortController();

    const url = `${this.#apiURL}?q=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url, { signal: this.#abortController.signal });
      if (!response.ok) {
        switch (response.status) {
          case 400:
            throw new Error('Неправильный запрос. Попробуйте еще раз');

          case 500:
            throw new Error('Сервер не отвечает. Попробуйте повторить запрос позже');
        
          default:
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
      }
      
      const data = await response.json();
      return data;
    } 
    catch (err: unknown) {
      const wasAborted = err instanceof Error && err.name === 'AbortError';
      if (wasAborted)
        return;

      throw err;
    } 
    finally {
      this.#abortController = null;
    }
  }
}