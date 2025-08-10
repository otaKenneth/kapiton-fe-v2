import { productRelated } from "@api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProductCard from './ProductCard';

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
        <h2 className="text-3xl font-bold">{data?.title}</h2>
      </div>
      <div className="w-full md:w-5/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-y-4 pb-8">
        {data?.products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;