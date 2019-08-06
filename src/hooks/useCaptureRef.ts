import { Ref, useEffect } from 'react';

export function useCaptureRef<T>(value: T | null, ref?: Ref<T | null>) {
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') ref(value);
      // eslint-disable-next-line
      else (ref.current as any) = ref;
    }
    return () => {
      if (ref) {
        if (typeof ref === 'function') ref(null);
        // eslint-disable-next-line
        else (ref.current as any) = null;
      }
    };
  });
}
