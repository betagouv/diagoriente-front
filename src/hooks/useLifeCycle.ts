import { useEffect, useRef, EffectCallback } from 'react';

export function useDidMount(fn: EffectCallback) {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    fn();
  },        []);
  return mounted.current;
}

export function useDidUpdate(fn: EffectCallback, deps?: any[]) {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      fn();
    }
  },        deps);
  return mounted.current;
}
