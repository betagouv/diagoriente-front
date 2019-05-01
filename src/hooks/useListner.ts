import { useEffect, useRef } from 'react';

export function useListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | EventListenerOptions,
): void {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      window.removeEventListener(type, listener, options);
    }
    window.addEventListener(type, listener);
    return () => window.removeEventListener(type, listener, options);
  });
}
