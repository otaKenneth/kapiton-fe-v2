import { productRelated } from "@api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProductCard from './ProductCard';

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col px-2 sm:px-4 md:px-6 mb-4 animate-pulse">
      <div className="h-48 sm:h-56 md:h-[14rem] w-full bg-gray-200 rounded-md"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="mt-4 flex items-center gap-x-2">
        <div className="h-5 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-x-2 items-center">
          <div className="h-7 w-7 rounded-md bg-gray-200"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

const RelatedProducts = () => {
  const {id} = useParams();
  const {data, isFetching, isSuccess, error} = useQuery({
    queryKey: ["product_related", id],
    queryFn: () => productRelated(id),
    select: (data) => data.data
  });
  
  return (
    <div className="elementor px-2 sm:px-4 md:px-8 pt-8 md:mt-0">
      <div className="mb-3">
        <h2 className="text-3xl font-bold">
          {isFetching ? (
            <span className="h-6 w-40 bg-gray-200 animate-pulse inline-block rounded"></span>
          ) : (
            data?.title
          )}
        </h2>
      </div>
      <div className="w-full md:w-5/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-y-4 pb-8">
        {isFetching
          ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : data?.products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}

export default RelatedProducts;