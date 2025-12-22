'use client';
import dynamic from 'next/dynamic';

const ProductListInfinite = dynamic(() => import('@/components/ProductListInfinite'), {
  ssr: false, // This page demonstrates CSR
});

export default function CSRPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Client-side Rendered Product List (CSR)</h1>
      <ProductListInfinite />
    </main>
  );
}
