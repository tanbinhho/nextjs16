'use client';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useProductsInfinite } from '@/hooks/useProductsInfinite';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Fragment } from 'react';

export default function ProductListInfinite() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsInfinite();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll(loadMoreRef, {
    
    enabled: !!hasNextPage && !isLoading,
    onLoadMore: fetchNextPage,
  });

  if (error) return <div>Error loading products.</div>;

  const products = data?.pages.flatMap((page) => page.products) || [];

  // Số lượng skeleton vừa đủ cho viewport (tối ưu LCP/SI)
  const skeletonCount = 3;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(isLoading ? Array.from({ length: skeletonCount }) : products).map(
          (item: any, idx: number) => (
            <Fragment key={isLoading ? `skeleton-${idx}` : item.id}>
              {isLoading ? (
                <div className="bg-gradient-to-br from-white to-gray-200 border border-gray-300 rounded-2xl shadow-md p-6 flex flex-col h-[400px]">
                  <div className="flex-1 flex items-center justify-center mb-4">
                    <div
                      className="bg-gray-300 rounded-xl w-[180px] h-[180px] shimmer"
                      style={{ minWidth: 180, minHeight: 180 }}
                    />
                  </div>
                  <div className="h-5 w-32 bg-gray-400 rounded mb-2 shimmer" />
                  <div className="h-4 w-40 bg-gray-300 rounded mb-4 shimmer" />
                  <div className="mt-auto flex items-center justify-between">
                    <div className="h-6 w-16 bg-gray-400 rounded shimmer" />
                    <div className="h-6 w-12 bg-gray-300 rounded shimmer" />
                  </div>
                </div>
              ) : (
                <Link href={`/products/${item.id}`} className="block" prefetch={true} passHref>
                  <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 flex flex-col hover:scale-105 hover:shadow-2xl transition-transform duration-200 group cursor-pointer h-[400px] justify-between">
                    <div className="flex-1 flex flex-col items-center justify-center mb-3">
                      {(() => {
                        // Kiểm tra sản phẩm thuộc trang đầu tiên
                        const isFirstPage = data?.pages?.[0]?.products?.some(
                          (p: any) => p.id === item.id,
                        );
                        return (
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={180}
                            height={180}
                            className="h-40 w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-200"
                            priority={isFirstPage}
                            loading={isFirstPage ? 'eager' : 'lazy'}
                            fetchPriority={isFirstPage ? 'high' : 'low'}
                            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 33vw, 20vw"
                            style={{ width: 180, height: 180, maxWidth: '100%', maxHeight: '100%' }}
                            placeholder="empty"
                          />
                        );
                      })()}
                      <h2 className="font-bold text-base mt-2 mb-1 text-center line-clamp-3 text-gray-900 group-hover:text-blue-800 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-xs text-gray-700 mb-2 text-center line-clamp-4">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-extrabold text-blue-800">${item.price}</span>
                      <span className="bg-blue-200 text-blue-900 text-xs font-semibold px-2 py-1 rounded-full">
                        In Stock
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </Fragment>
          ),
        )}
      </div>
      <div
        ref={loadMoreRef}
        className="h-14 flex items-center justify-center text-gray-500 text-sm mt-4"
      >
        {isFetchingNextPage ? (
          <div className="flex gap-2 w-full max-w-md">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1 h-8 bg-gray-200 rounded shimmer animate-pulse" />
            ))}
            <span className="ml-2">Loading more...</span>
          </div>
        ) : hasNextPage ? (
          <span>Scroll to load more</span>
        ) : (
          <span>No more products</span>
        )}
      </div>
    </div>
  );
}
