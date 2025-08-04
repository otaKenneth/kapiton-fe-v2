import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { useNavigate, useParams } from "react-router-dom";

import { productsQuery } from "@api";
import ProductFilters from './ProductFilters';
import ProductCard from './ProductCard';

const ProductsCollectionPage = () => {
  const { collectType, collectionId } = useParams();
  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ['products', collectionId],
    queryFn: () => productsQuery(collectType, collectionId),
    initialData: {data: []},
    select: (data) => data.data
  });

  if (!collectionId) {
    navigate("/");
    return;
  }

  return (
    <div className="w-full flex flex-col gap-y-6 px-2 sm:px-4 md:px-8 pt-8 md:mt-0">
      {/* title */}
      <div className="w-full pt-4 sm:pt-8">
        <h1 className="font-primary text-center font-bold text-primary py-8 sm:py-12 md:py-16 text-3xl sm:text-5xl md:text-7xl break-words">
          {collectionId.toUpperCase()}
        </h1>
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-end font-body gap-y-2">
          <p className="text-primaryContrast/50">{data.total} PRODUCTS</p>
          <div>
            <p className="text-sm text-primaryContrast/50">Sort By:</p>
            <select
              name="sort"
              id="sort"
              className="px-4 rounded-md py-1 text-sm "
            >
              <option value="date_new_to_old">Date, new to old</option>
              <option value="date_old_to_new">Date, old to new</option>
              <option value="price_low_to_high">Price, low to high</option>
              <option value="price_high_to_low">Price, high to low</option>
              <option value="alphabetically_a_to_z">
                Alphabetically, A to Z
              </option>
              <option value="alphabetically_z_to_a">
                Alphabetically, Z to A
              </option>
              <option value="best_selling">Best Selling</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-primary"></div>
      <div className="flex flex-col md:flex-row mt-4 gap-y-8 md:gap-y-0">
        <ProductFilters />

        {/* products */}
        <div className="w-full md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-6 pb-8">
          {isFetching ? (
            <div className="w-full text-center py-20">
              <p className="font-body text-xl">Loading...</p>
            </div>
          ) : data.length == 0 ? (
            <div className="w-full text-center py-20">
              <p className="font-body text-xl">No Results Found...</p>
            </div>
          ) : data?.map((tp, i) => (
            <ProductCard key={i} product={tp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCollectionPage;
