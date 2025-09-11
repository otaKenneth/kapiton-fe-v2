import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAppContext } from "@context/AppContext";
import { productDetails, addProductToCart } from "@api";
import { Select, QuantityInput, useMessageDialog } from "@components";
import { formatPeso } from "@lib/utils";
import { PDSkeleton } from "./components";

type CartProductPayload = { product_id: any; product_name: any; quantity: number; guest_token: string, stock: number, variant: object };

const productDetail = () => {
  const { id } = useParams();
  const { state, setState } = useAppContext();
  const { showMessage } = useMessageDialog();
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [attributePrice, setAttributePrice] = useState(0);

  const addtocartMutation = useMutation({
    mutationFn: (product : CartProductPayload) => addProductToCart(state.token, product),
    onSuccess: (resp : any) => {
      setState(prev => ({
        ...prev,
        cart: resp.data
      }))
      showMessage({
        open: true,
        message: resp.message,
        title: "Success",
        type: "success"
      })
    }
  });

  const { data, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => productDetails(id),
    refetchOnWindowFocus: false,
    retry: 1,
    select: (data) => data.data
  })

  function getVariantOptions (k:number, attributes: any[]) {
    return attributes.map((attr) => ({
      value: attr,
      label: attr,
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

  function handleVariantSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    var selectedValue = e.target.value;
    var selectedLabel = e.target.options[e.target.selectedIndex].getAttribute("data-label");
    var selectedAttributeCol = e.target.options[e.target.selectedIndex].getAttribute("data-attributeCol");

    setSelectedVariant(prev => ({ ...prev, [selectedLabel]: selectedValue, [selectedAttributeCol]: selectedValue }));
    const selectedOptions = selectedVariant;
    selectedOptions[selectedLabel] = selectedValue;
    
    let opt_keys = Object.keys(selectedOptions);
    let selected_attribute = data.attributes.find(d => d.color == selectedOptions[opt_keys[0]] && d.size == selectedOptions[opt_keys[1]])
    if (selected_attribute) {
      setAttributePrice(selected_attribute.price);
      setMaxQuantity(selected_attribute.stock);
    } else {
      setAttributePrice(0);
      setMaxQuantity(0);
    }

  }

  useEffect(() => {
    if (isSuccess) {
      if (data.variants.length > 0) {
        data.variants.forEach(variant => {
          setSelectedVariant(prev => ({ ...prev, [variant.variant_name]: variant.attributes[0] }));
          let selected_attribute = data.attributes[0]
          setAttributePrice(selected_attribute.price);
          setMaxQuantity(selected_attribute.stock);
        })
      } else {
        setAttributePrice(data.product_price);
      }
    }
  }, [isSuccess, data]);

  const handleAddToCartClick = () => {
    const product: CartProductPayload = {
      product_id: data.id,
      product_name: data.product_name,
      quantity,
      stock: maxQuantity,
      guest_token: state.guest_token,
      variant: selectedVariant
    };
    addtocartMutation.mutate(product);
  }

  if (isFetching) {
    return <PDSkeleton />;
  }

  if (isError) {
    return <div className="p-4 sm:p-6 md:p-8 text-green-900 text-6xl w-full text-center">Product not Found</div>;
  }

  return (
    <div className="elementor w-full flex flex-col gap-y-6 px-2 sm:px-4 md:px-8 pt-8 md:mt-0">
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
                <span className="shop_name">{data.vendor?.vendorbusinessdetails.shop_name}</span>
              </div>
            </div>
            <div>No Reviews</div>
          </div>
          <div className="flex flex-row justify-start align-center gap-3 elementor-element elementor-element-32fc723">
            <span className="text-xl">{computeDiscountPrice(attributePrice, data.product_discount, data.category.category_discount)}</span>
            <span className="elementor-heading-title text-xl">{formatPeso(attributePrice)}</span>
          </div>
          <div className="description">{data.description}</div>
          <div className="flex flex-col justify-start align-center gap-4">
            <div className="flex flex-row align-center gap-5">
              {data?.variants.map((variant, key) => (
                <Select key={key} label={variant.variant_name} data-attributeCol={key == 0 ? "color" : "size"}
                  options={getVariantOptions(key, variant.attributes)} 
                  value={selectedVariant[variant.variant_name]} 
                  onChange={handleVariantSelect} 
                />
              ))}
            </div>
            <div>
              <QuantityInput 
                label={"Quantity"} 
                value={quantity} 
                onChange={setQuantity} 
                max={maxQuantity} 
              />
            </div>
            {maxQuantity > 0 ? (
              <div className="elementor-kit-6 pdp-min-with-btn elementor-element element-products-detail-page">
                <button type="submit" className="elementor-button px-4 py-3" onClick={handleAddToCartClick}>
                  <span className="text-sm">Add to Cart</span>
                </button>
              </div>
            ) : (
              <div style={{ 
                height: "39px",
                display: "flex",
                alignItems: "center",
                marginRight: "10px"
              }}>
                No Stock
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default productDetail;