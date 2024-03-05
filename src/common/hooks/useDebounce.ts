import {useEffect, useState} from 'react';

export const useDebounce = <T>(
  initalState: T,
  syncValue: (newState: T) => unknown,
) => {
  const [state, setState] = useState(initalState);
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      syncValue(state);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [state, 500]);
  return [state, setState] as const;
};
