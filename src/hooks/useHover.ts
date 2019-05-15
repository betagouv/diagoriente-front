import { useState, MouseEvent } from 'react';

export function useHover(
  initialValue: boolean,
): [boolean, (e: MouseEvent<HTMLElement>) => void, (e: MouseEvent<HTMLElement>) => void] {
  const [value, valueChange] = useState(initialValue);
  function onHoverIn(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    valueChange(true);
  }
  function onHoverOut(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    valueChange(false);
  }
  return [value, onHoverIn, onHoverOut];
}
