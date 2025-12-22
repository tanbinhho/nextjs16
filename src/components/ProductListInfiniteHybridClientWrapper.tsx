import ProductListInfiniteHybrid from './ProductListInfiniteHybrid';
export default function ProductListInfiniteHybridClientWrapper({
  initialProducts,
}: {
  initialProducts: any[];
}) {
  return <ProductListInfiniteHybrid initialProducts={initialProducts} />;
}
