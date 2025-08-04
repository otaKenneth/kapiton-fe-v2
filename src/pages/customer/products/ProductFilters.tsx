import { useState } from "react";
import DoubleSlider from "@components/customer/DoubleSlider";
import { formatPeso } from "@lib/utils";
import { availableFilters } from "@api";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const ProductFilters = () => {
  const { collectionId } = useParams();
  const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([0, 1000])

  const { data } = useQuery({
    queryKey: ["product_filters", collectionId],
    queryFn: () => availableFilters(collectionId),
    select: (data) => data.data,
    onSuccess: function (response) {
      if (response?.data?.max_price) {
        setFilterPriceRange(([min]) => [min, response.data.max_price]);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!collectionId,
  })  

  return (
      <div className="w-full md:w-1/5 mb-8 md:mb-0 px-2 md:px-0">
        <div className="font-body">
          <h1 className="font-bold">Categories</h1>
          {/* should be dynamic with the highest price in collection */}
          <ol>
            {data?.category_details?.map((section) => (
              <li key={section.id}>
                <span className="font-bold">{section.name}</span>
                <ul className="ml-4">
                  {section.categories.map((cat) => (
                    <li key={cat.id}>
                      <Link to={`/products/category/${cat.url}`}><span>{cat.category_name}</span></Link>
                      <ul className="ml-4 text-sm text-gray-600">
                        {cat.sub_categories.map((sub) => (
                          <li key={sub.id}>
                            <Link to={`/products/category/${sub.url}`}>{sub.category_name}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        
        <div className="font-body">
          {data?.other_filters?.map((filter) => (
            <div key={filter.id}>
              <h1 className="font-bold">{filter.filter_name}</h1>
              <ol>
                {filter.filter_values?.map((filter_value) => (
                  <li key={filter_value.id}>
                    <span className="ml-4 text-sm text-gray-600">{filter_value.filter_value}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        
        {/* price filter */}
        <div className="font-body">
            <h1 className="font-bold">PRICE</h1>
            {/* should be dynamic with the highest price in collection */}
            <p className="text-sm">{formatPeso(filterPriceRange[0])} - {formatPeso(filterPriceRange[1])}</p>
        </div>
        <DoubleSlider
          min={0}
          max={data ? parseInt(data?.max_price):1000}
          value={filterPriceRange}
          onChange={setFilterPriceRange}
        />
        <div className="w-full flex justify-center mt-4 mb-5">
            <button className="bg-primary text-white font-secondary rounded-2xl px-8 py-1 font-bold">
                APPLY FILTERS
            </button>
        </div>
    </div>
  );
}

export default ProductFilters;