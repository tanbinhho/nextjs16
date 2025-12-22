import ProductListInfiniteHybridClientWrapper from '@/components/ProductListInfiniteHybridClientWrapper';
import { fetchProducts } from '@/services/productApi';

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

export default async function ISRPage() {
  // Fetch page đầu trên server (ISR)
  const { products: initialProducts } = await fetchProducts({ pageParam: 0, revalidate: 60 });

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
        Incremental Static Regeneration Product List (ISR, Infinite Scroll)
      </h1>
      <ProductListInfiniteHybridClientWrapper initialProducts={initialProducts} />
    </main>
  );
}
