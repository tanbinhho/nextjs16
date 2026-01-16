import { fetchProducts, getProduct } from '@/services/productApi';

export const productQuery = {
  all: ['product'] as const,

  list: () => ({
    queryKey: [...productQuery.all, 'infinite'],
    queryFn: fetchProducts,
  }),

  detail: (id: string) => ({
    queryKey: [...productQuery.all, 'detail', id],
    queryFn: () => getProduct(id),
  }),
};
