import { useState } from 'react';

export function useSelectInput<T>(
  initialValue: T,
  initialOpen: boolean = false,
): [T, boolean, (value: T) => void, () => void, () => void] {
  const [value, valueChange] = useState(initialValue);
  const [open, openChange] = useState(initialOpen);
  const onOpen = () => openChange(true);
  const onClose = () => openChange(false);

  function onChange(value: T) {
    valueChange(value);
    onClose();
  }
  return [value, open, onChange, onOpen, onClose];
}
