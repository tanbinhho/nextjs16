// app/products/[id]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from '@/services/productApi';

// ================== ISR CONFIG ==================
export const revalidate = 60;
export const dynamicParams = true;

// ================== SEO METADATA ==================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  console.log('generateMetadata called');
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Product not found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.title} | My Shop`,
    description: product.description.slice(0, 160),
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      type: 'website',
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

// ================== PAGE ==================
export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return notFound();

  const product = await getProduct(id);
  if (!product) return notFound();

  // ===== Product Schema (JSON-LD) =====
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: [product.image],
    description: product.description,
    sku: product.id,
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://your-domain.com/products/${product.id}`,
    },
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      {/* ===== Structured Data ===== */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      {/* ===== CONTENT ===== */}
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

      <div className="flex justify-center mb-4">
        <Image
          src={product.image}
          alt={product.title}
          width={240}
          height={240}
          priority
          className="h-48 w-auto object-contain drop-shadow-md"
        />
      </div>
  
      <div className="mb-2 font-semibold text-xl text-blue-600">${product.price}</div>

      <h2 className="text-lg font-semibold mt-6 mb-2">Product description</h2>
      <p className="mb-4 text-gray-700">{product.description}</p>

      <div className="text-sm text-gray-500 mb-6">Category: {product.category}</div>

      {/* ===== INTERNAL LINK ===== */}
      <Link href={`/category/${product.category}`} className="text-blue-600 underline text-sm">
        View more {product.category} products
      </Link>
    </main>
  );
}
