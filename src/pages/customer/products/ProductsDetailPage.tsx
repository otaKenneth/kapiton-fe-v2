import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { productDetails } from "@api";
import Select from "@components/ui/Select";
import QuantityInput from "@components/ui/Quantity";
import { formatPeso } from "@lib/utils";

const ProductsDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [attributePrice, setAttributePrice] = useState(0);

  const { data, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => productDetails(id),
    refetchOnWindowFocus: false,
    retry: 1,
    select: (data) => data.data
  })
    
  function getVariantOptions (k, attributes) {
    var options = ["color", "size"];
    return attributes.map((attr) => ({
      price: attr.price,
      stock: attr.stock,
      value: attr.id,
      label: attr[options[k]],
    }));
  }

  function computeDiscountPrice(price:number, discount:number, category_discount:number) {
    var new_price = price
    if (discount > 0) {
      new_price = price - (price * discount / 100);
    }
    if (category_discount > 0) {
      new_price = new_price - (new_price * category_discount / 100);
    }
    return formatPeso(new_price);
  }

  function handleVariantSelect(e) {
    var selectedValue = e.target.value;
    var selectedStock = e.target.options[e.target.selectedIndex].getAttribute("data-stock");
    var selectedPrice = e.target.options[e.target.selectedIndex].getAttribute("data-price");
    console.log("Selected Variant:", selectedValue, "Stock:", selectedStock, "Price:", selectedPrice);
    setAttributePrice(selectedPrice);
    setMaxQuantity(selectedStock);
    setSelectedVariant(selectedValue);
  }

  useEffect(() => {
    if (isSuccess) {
      const firstVariant = data.variants[0];
      if (firstVariant && firstVariant.attributes.length > 0) {
        const firstAttribute = firstVariant.attributes[0];
        setSelectedVariant(firstAttribute.id);
        setMaxQuantity(firstAttribute.stock);
        setAttributePrice(firstAttribute.price);
      }
    }
  }, [isSuccess, data]);

  if (isFetching) {
    return <div className="p-4 sm:p-6 md:p-8 text-green-900 text-4xl w-full text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="p-4 sm:p-6 md:p-8 text-green-900 text-6xl w-full text-center">Product not Found</div>;
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
            <span className="text-xl">{computeDiscountPrice(attributePrice, data.product_discount, data.category.category_discount)}</span>
          </div>
          <div className="description"></div>
          <div className="flex flex-col justify-start align-center gap-4">
            <div className="flex flex-row align-center gap-5">
              {data?.variants.map((variant, key) => (
                <Select key={key} label={variant.variant_name} 
                  options={getVariantOptions(key, variant.attributes)} 
                  value={selectedVariant} 
                  onChange={handleVariantSelect} 
                />
              ))}
            </div>
            {data?.variants.length > 0 && (
              <div>
                <QuantityInput 
                  label={"Stock"} 
                  value={quantity} 
                  onChange={setQuantity} 
                  max={maxQuantity} 
                />
              </div>
            )}
            <div><span>Button</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailPage;
