export function debounce(func: (...args: any) => any, ms: number): (...args: any) => any {
  let timeout: number;
  return function(...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), ms);
  };
}