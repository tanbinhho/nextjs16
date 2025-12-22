import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/productApi';

export function useProductsInfinite({ initialProducts }: { initialProducts?: any[] } = {}) {
  return useInfiniteQuery({
    queryKey: ['products-infinite'],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    initialData: initialProducts
      ? {
          pages: [
            {
              products: initialProducts,
              nextPage: initialProducts.length === 0 ? undefined : 1,
              total: initialProducts.length,
            },
          ],
          pageParams: [0],
        }
      : undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
