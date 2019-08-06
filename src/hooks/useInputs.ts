import { useState, ChangeEvent, useRef } from 'react';

export function useTextInput(
  initialValue: string,
): [string, (e: ChangeEvent<HTMLInputElement>) => void, boolean] {
  const [value, valueChange] = useState(initialValue);
  const touched = useRef(false);
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (!touched.current) touched.current = true;
    valueChange(e.target.value);
  }
  return [value, onChange, touched.current];
}
