import type { App } from 'vue';

declare global {
  interface HTMLElement {
    clickOutsideEvent?: (event: MouseEvent) => void
  }
}

const clickOutside = {
  beforeMount: (el: HTMLElement, binding: { value?: () => void }) => {
    el.clickOutsideEvent = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (el === target || el.contains(target))
        return;
      
      if (binding.value instanceof Function)
        binding.value();
    }
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el: HTMLElement) => {
    if (el.clickOutsideEvent) {
      document.removeEventListener("click", el.clickOutsideEvent);
      delete el.clickOutsideEvent;
    }
  },
};

export default (app: App) => {
  app.directive('click-outside', clickOutside);
}
