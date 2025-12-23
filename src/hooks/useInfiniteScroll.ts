import { useEffect, RefObject } from 'react';

interface UseInfiniteScrollOptions {
  enabled?: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll(
  ref: RefObject<HTMLDivElement | null>,
  { enabled = true, onLoadMore }: UseInfiniteScrollOptions,
) {
  useEffect(() => {
    if (!enabled) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onLoadMore, ref]);
}
