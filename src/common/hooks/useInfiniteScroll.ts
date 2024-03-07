import React, {useEffect} from 'react';

// i will not test this as it is diminishing returns
export const useInfiniteScroll = (
  fetchNextFunction: () => void,
  loadOn: React.RefObject<HTMLElement>,
) => {
  useEffect(() => {
    // make a new intersection observer, when the loadOn ref is in view, call the fetchNextFunction
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextFunction();
        }
      },
      {threshold: 1},
    );
    // observe the loadOn ref
    if (loadOn.current) {
      observer.observe(loadOn.current);
    }
    // clean up the observer
    return () => observer.disconnect();
  }, [fetchNextFunction, loadOn]);
};
