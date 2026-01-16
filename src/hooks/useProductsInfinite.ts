import { productQuery } from '@/queries/product.query';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useProductsInfinite() {
  return useInfiniteQuery({
    // queryKey: ['products-infinite'],
    // queryFn: fetchProducts,
    ...productQuery.list(),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
