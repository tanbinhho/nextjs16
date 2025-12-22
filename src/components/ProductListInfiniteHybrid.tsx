'use client';
import { useRef } from 'react';
import { useProductsInfinite } from '@/hooks/useProductsInfinite';
import Link from 'next/link';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import Image from 'next/image';

export default function ProductListInfiniteHybrid({ initialProducts }: { initialProducts: any[] }) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductsInfinite({
    initialProducts,
  });
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll(loadMoreRef, {
    enabled: !!hasNextPage && !isLoading,
    onLoadMore: fetchNextPage,
  });

  // Gộp page đầu (SSR) và các page sau (CSR)
  const products = data?.pages.flatMap((page) => page.products) || initialProducts || [];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="block"
            prefetch={true}
            passHref
          >
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col hover:scale-105 hover:shadow-2xl transition-transform duration-200 group cursor-pointer">
              <div className="flex-1 flex items-center justify-center mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={180}
                  height={180}
                  className="h-40 w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-200"
                  priority={false}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="empty"
                  unoptimized={false}
                />
              </div>
              <h2 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">{product.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-extrabold text-blue-600">${product.price}</span>
                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                  In Stock
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div
        ref={loadMoreRef}
        className="h-12 flex items-center justify-center text-gray-500 text-sm"
      >
        {isFetchingNextPage ? (
          <span className="animate-pulse">Loading more...</span>
        ) : hasNextPage ? (
          <span>Scroll to load more</span>
        ) : (
          <span>No more products</span>
        )}
      </div>
    </div>
  );
}
