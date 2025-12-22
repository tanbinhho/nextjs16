import ProductListInfiniteHybridClientWrapper from '@/components/ProductListInfiniteHybridClientWrapper';
import ProductSwiperInfiniteClient from '@/components/ProductSwiperInfiniteClient';
import { fetchProducts } from '@/services/productApi';
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
  const { products: initialProducts } = await fetchProducts({ pageParam: 0 });

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Products',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: initialProducts.length,
      itemListElement: initialProducts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.title,
        url: `https://your-domain.com/products/${p.id}`,
      })),
    },
  };

  return (
    <main className="p-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listSchema),
        }}
      />

      <h1 className="text-2xl font-bold mb-4">
        Server-Side Rendering Product List (SSR, Infinite Scroll)
      </h1>

      <ProductSwiperInfiniteClient initialProducts={initialProducts} />

      <ProductListInfiniteHybridClientWrapper initialProducts={initialProducts} />
    </main>
  );
}
