export const debounce = (func: (...args: any) => any, ms: number): (...args: any) => any => {
  let timeout: number;
  return (...args: any): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), ms);
  };
}
