'use client';

import { useProductsInfinite } from '@/hooks/useProductsInfinite';
import Link from 'next/link';
import Image from 'next/image';
import { useId } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMemo } from 'react';

export default function ProductSwiperInfiniteClient() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useProductsInfinite();
  const products = data?.pages.flatMap((page) => page.products) || [];
  const schemaId = useId();

  // Skeleton count matches slidesPerView for best UX
  const skeletonCount = 4;

  // Memoize schema for SEO
  const listSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: products.map((product, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: product.title,
        url: `/products/${product.id}`,
        image: product.image,
      })),
    }),
    [products],
  );

  return (
    <>
      <script
        id={schemaId}
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <Swiper
        slidesPerView={4}
        spaceBetween={16}
        onReachEnd={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        style={{ padding: '8px 0' }}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {/* Skeletons when loading */}
        {isLoading &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <SwiperSlide key={`skeleton-${i}`}>
              <div className="border rounded-xl p-4 bg-white shadow animate-pulse flex flex-col items-center h-56">
                <div
                  className="bg-gray-200 rounded-lg w-32 h-32 mb-3"
                  style={{ minWidth: 128, minHeight: 128 }}
                />
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            </SwiperSlide>
          ))}

        {/* Product slides */}
        {!isLoading &&
          products.map((product, idx) => {
            // Xác định sản phẩm thuộc trang đầu tiên
            const isFirstPage = data?.pages?.[0]?.products?.some((p: any) => p.id === product.id);
            return (
              <SwiperSlide key={product.id}>
                <Link href={`/products/${product.id}`} tabIndex={0} aria-label={product.title}>
                  <div className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition-shadow flex flex-col items-center h-56 group">
                    <div className="relative w-32 h-32 flex items-center justify-center mb-3">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={128}
                        height={128}
                        className="object-contain w-full h-full drop-shadow-md group-hover:scale-105 transition-transform duration-200"
                        priority={isFirstPage}
                        loading={isFirstPage ? 'eager' : 'lazy'}
                        fetchPriority={isFirstPage ? 'high' : 'low'}
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 20vw"
                        style={{ width: 128, height: 128, maxWidth: '100%', maxHeight: '100%' }}
                        unoptimized={false}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-1 mb-1 text-center line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </p>
                    <span className="text-xs text-gray-500 line-clamp-1">${product.price}</span>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}

        {/* Loading more skeleton */}
        {isFetchingNextPage &&
          Array.from({ length: 2 }).map((_, i) => (
            <SwiperSlide key={`loading-more-${i}`}>
              <div className="border rounded-xl p-4 bg-white shadow animate-pulse flex flex-col items-center h-56">
                <div
                  className="bg-gray-200 rounded-lg w-32 h-32 mb-3"
                  style={{ minWidth: 128, minHeight: 128 }}
                />
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
