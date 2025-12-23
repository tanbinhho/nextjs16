import ProductListInfinite from '@/components/ProductListInfinite';
import ProductSwiperInfiniteClient from '@/components/ProductSwiperInfiniteClient';
import { fetchProducts } from '@/services/productApi';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'All Products | My Shop',
    description: 'Browse our latest products with the best prices and quality.',
    alternates: {
      canonical: '/products',
    },
    openGraph: {
      type: 'website',
      title: 'All Products | My Shop',
      description: 'Browse our latest products with the best prices and quality.',
    },
    twitter: {
      card: 'summary',
      title: 'All Products | My Shop',
      description: 'Browse our latest products with the best prices and quality.',
    },
  };
}

export default async function SSRPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products-infinite'],
    queryFn: fetchProducts,
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Server-Side Rendering Product List (SSR, Infinite Scroll)
      </h1>

      <HydrationBoundary state={dehydratedState}>
        <ProductSwiperInfiniteClient />
        <ProductListInfinite />
      </HydrationBoundary>
    </main>
  );
}
