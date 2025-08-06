import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { productDetails } from "@api";

const ProductsDetailPage = () => {
  const { id } = useParams();

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => productDetails(id),
    refetchOnWindowFocus: false,
    retry: 1,
    select: (data) => data.data,
  });

  if (isFetching) {
    return <div className="p-4 sm:p-6 md:p-8">Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-y-6 px-2 sm:px-4 md:px-8 pt-8 md:mt-0">
      <div className="flex gap-5">
        <div style={{ height: "700px", width: "700px" }}>
          <img src="" alt="" style={{ height: "100%", width: "100%" }} />
        </div>
        <div className="p-2 flex flex-col justify-center flex-grow flex-shrink self-auto gap-5" 
          style={{ 
            height: "700px", width: "700px",
          }}
        >
          <div>
            <div className="d-flex flex-row flex-wrap mb-2 list-of-tags">
              <span></span>
            </div>
            <h1 className="product-title text-6xl">{data.product_name}</h1>
          </div>
          <div className="flex flex-row justify-start align-center gap-3">
            <div className="flex flex-row justify-start align-center gap-3 vendor">
              <div>
                <img src="" alt="" style={{ width: "30px"}} />
              </div>
              <div>
                <span className="shop_name">{data.vendor.vendorbusinessdetails.shop_name}</span>
              </div>
            </div>
            <div>No Reviews</div>
          </div>
          <div className="flex flex-row justify-start align-center gap-3">
            <span className="text-xl">P 999</span>
          </div>
          <div className="description"></div>
          <div className="flex flex-col justify-start align-center gap-4">
            <div className="flex flex-row align-center gap-5">
              <div>
                <span>Variation1</span>
              </div>
              <div>
                <span>Variation2</span>
              </div>
            </div>
            <div><span>Quantity</span><span>Stock</span></div>
            <div><span>Button</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailPage;
