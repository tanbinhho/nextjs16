'use client';

import { useProductsInfinite } from '@/hooks/useProductsInfinite';
import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function ProductSwiperInfiniteClient({
  initialProducts,
}: {
  initialProducts: any[];
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductsInfinite({
    initialProducts,
  });

  const products = data.pages.flatMap((p) => p.products);

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={12}
      onReachEnd={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <Link href={`/products/${product.id}`}>
            <div className="border rounded-lg p-3">
              <img
                src={product.image}
                alt={product.title}
                className="h-32 object-contain mx-auto"
              />
              <p className="text-sm mt-2 line-clamp-2">{product.title}</p>
            </div>
          </Link>
        </SwiperSlide>
      ))}

      {isFetchingNextPage && (
        <SwiperSlide>
          <div className="flex items-center justify-center h-full">Loading…</div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}
