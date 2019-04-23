import { useEffect, useRef, EffectCallback } from 'react';

export function useDidMount(fn: EffectCallback) {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      fn();
    }
  });
}
