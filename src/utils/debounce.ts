export function debounce(func: (...args: any) => any, ms: number): (...args: any) => any {
  let timeout: number;
  return function(...args: any): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), ms);
  };
}