import Link from 'next/link';

export default function ProductsHome() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Product List Rendering Examples</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/products/csr" className="text-blue-600 underline">
            Client-side Rendering (CSR)
          </Link>
        </li>
        <li>
          <Link href="/products/ssr" className="text-blue-600 underline">
            Server-side Rendering (SSR)
          </Link>
        </li>
        <li>
          <Link href="/products/isr" className="text-blue-600 underline">
            Incremental Static Regeneration (ISR)
          </Link>
        </li>
      </ul>
    </main>
  );
}
